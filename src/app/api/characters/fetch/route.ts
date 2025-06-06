import { NextResponse } from "next/server";
import { ICategoryQueryMember, ICategoryQueryResult, IMemberQueryResult } from "./types";
import { gameName, queryMemberElements } from "./variables";
import { ICharacterData } from "@/types/character.types";
import { getPlayerElement, getPlayerNames, getPlayerPosition, getPlayerStats } from "./functions";

const baseUrl = new URL("https://inazuma-eleven.fandom.com/api.php");
baseUrl.searchParams.set("action", "query");
baseUrl.searchParams.set("format", "json");
baseUrl.searchParams.set("origin", "*");

const elementCategories = queryMemberElements.slice(0, 1).map((e) => e + "_characters");

const getAllMembersByCategory = async (controller: ReadableStreamDefaultController<any>, encoder: TextEncoder): Promise<ICategoryQueryMember[]> => {
  const allMembers: ICategoryQueryMember[] = [];
  controller.enqueue(encoder.encode(`TOTAL - ${elementCategories.length}\n\n`));

  for (const category of elementCategories) {
    let continueToken: string | undefined;
    let membersRetrieved = 0;
    const startTime = performance.now();

    try {
      do {
        const url = new URL(baseUrl);
        url.searchParams.set("list", "categorymembers");
        url.searchParams.set("cmtitle", `Category:${category}`);
        url.searchParams.set("cmlimit", "500");
        if (continueToken) {
          url.searchParams.set("cmcontinue", continueToken);
        }

        const data: ICategoryQueryResult = await (await fetch(url.toString())).json();
        const differentMembers = data.query.categorymembers.filter(({ pageid }) => !allMembers.some((m) => m.pageid === pageid));
        allMembers.push(...differentMembers);
        membersRetrieved += data.query.categorymembers.length;
        continueToken = data.continue?.cmcontinue;
      } while (continueToken);
      const endTime = performance.now();
      controller.enqueue(encoder.encode(`CATEGORY : ${category} - ${membersRetrieved} / ${(endTime - startTime).toFixed(2)}  \n\n`));
    } catch (error) {
      controller.error(error);
      console.error(error);
    }
  }

  return allMembers;
};

const getMemberDatas = async (members: ICategoryQueryMember[], controller: ReadableStreamDefaultController, encoder: TextEncoder) => {
  const url = new URL(baseUrl);
  url.searchParams.set("prop", "revisions");
  url.searchParams.set("rvprop", "content");
  url.searchParams.set("rvslots", "main");

  const allCharacters: ICharacterData[] = [];
  for (const member of members) {
    const { pageid } = member;

    url.searchParams.set("pageids", pageid);
    console.log(url.toString());

    const data: IMemberQueryResult = await (await fetch(url.toString())).json();
    const pageContent = data.query.pages[pageid].revisions[0].slots.main["*"];

    if (!pageContent.includes(gameName)) throw new Error("Player not in the game.");

    const statistics = getPlayerStats(pageContent);
    const names = getPlayerNames(pageContent);

    const TraceValue = <T = any>(func: () => T | null, attribute: string): T => {
      const value = func();
      if (!value) {
        controller.enqueue(encoder.encode(`TRACE : ${pageid} - ${names.dub.firstName} ${names.dub.lastName} - ${attribute}`));
        throw new Error(attribute + " not found.");
      }

      return value;
    };

    const element = TraceValue(() => getPlayerElement(pageContent), "element");
    const defaultPosition = TraceValue(() => getPlayerPosition(pageContent), "position");

    const character: ICharacterData = {
      firstName: names.dub.firstName,
      lastName: names.dub.lastName,
      statistics,
      names,
      element,
      defaultPosition,
      hissatsus: [],
    };

    console.log(character.names);
    console.log(character);

    allCharacters.push(character);
  }

  return allCharacters;
};

export async function GET() {
  // const responseStream = new TransformStream();
  // const writer = responseStream.writable.getWriter();
  console.log("BEGIN FUNC");

  const encoder = new TextEncoder();

  try {
    // await connectToDatabase();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // const allMembers = await getAllMembersByCategory(controller, encoder);
          // controller.enqueue(encoder.encode("All categories have been fetched.\n\n"));
          const members = await getMemberDatas([{ pageid: "2031", ns: 0, title: "Endou" }], controller, encoder);
          console.log("ALL M FETCHED", members);
          controller.enqueue(encoder.encode("All members have been fetched.\n\n"));
          setTimeout(() => controller.close(), 10);
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
      },
      status: 200,
    });
  } catch (error: any) {
    console.error("Failed to fetch characters:", error);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
