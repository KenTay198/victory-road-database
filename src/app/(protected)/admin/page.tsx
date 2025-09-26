"use client";
import { IStatistics, Position } from "@/types/models/character.types";
import Button from "@atoms/Button";
import { useAuthState } from "@context/AuthContext";
import { areStatsValid, getAdvancedStatLabel, getAdvancedStats } from "@utils/characters.functions";
import { capitalize } from "@utils/functions";
import { advancedStatisticsLabels, statisticsLabels } from "@utils/variables";
import React, { useEffect, useMemo, useState } from "react";

interface IFandomPlayer {
  pageId: string;
  name: string;
  positions: Position[];
  stats?: IStatistics;
}

function AdminPage() {
  const user = useAuthState().user!;
  const [fandomPlayers, setFandomPlayers] = useState<IFandomPlayer[]>([]);
  const [fetched, setFetched] = useState(false);
  const [playerDone, setPlayerDone] = useState(0);
  const [stats, setStats] = useState<IStatistics>();

  useEffect(() => {
    fetchPlayerStats("2031").then((s) => setStats(s));
    return;
    if (fetched && playerDone !== fandomPlayers.length) {
      Promise.all(
        fandomPlayers.map((player) =>
          fetchPlayerStats(player.pageId).then((stats) => {
            setPlayerDone((old) => old + 1);
            if (areStatsValid(stats)) return player;
            return { ...player, stats };
          })
        )
      );

      return;
    }

    const categories = ["Forwards", "Midfielders", "Defenders", "Goalkeepers"];

    const fetchMembersByCategory = async (category: string) => {
      let continueToken: string | undefined = undefined;
      const position = category.slice(0, -1) as Position; // Assuming Position is a union of "Forward" | "Midfielder" | etc.
      const allMembers: IFandomPlayer[] = [];

      do {
        const url = new URL("https://inazuma-eleven.fandom.com/api.php");
        url.searchParams.set("action", "query");
        url.searchParams.set("list", "categorymembers");
        url.searchParams.set("cmtitle", `Category:${category}`);
        url.searchParams.set("cmlimit", "500");
        url.searchParams.set("format", "json");
        url.searchParams.set("origin", "*");
        if (continueToken) {
          url.searchParams.set("cmcontinue", continueToken);
        }

        const res = await fetch(url.toString());
        const data = await res.json();

        const members: IFandomPlayer[] = data.query.categorymembers.map(({ pageid, title }: any) => ({
          pageId: pageid.toString(), // Cast to string
          name: title,
          positions: [position],
        }));

        allMembers.push(...members);
        continueToken = data.continue?.cmcontinue;
      } while (continueToken);

      return allMembers;
    };

    // Promise.all(
    //   categories.map((category) =>
    //     fetchMembersByCategory(category).then((members) => {
    //       setFandomPlayers((old) => {
    //         const updated = [...old];

    //         for (const member of members) {
    //           const existing = updated.find((p) => p.pageId === member.pageId);

    //           if (existing) {
    //             // Ajoute uniquement les nouvelles positions non déjà présentes
    //             member.positions.forEach((pos) => {
    //               if (!existing.positions.includes(pos)) {
    //                 existing.positions.push(pos);
    //               }
    //             });
    //           } else {
    //             updated.push(member);
    //           }
    //         }

    //         return updated;
    //       });
    //     })
    //   )
    // ).then(() => {
    //   setFetched(true);
    // });
  }, [fetched]);

  const fetchPlayerStats = async (pageid: string): Promise<IStatistics> => {
    const res = await fetch(`https://inazuma-eleven.fandom.com/api.php?action=query&prop=revisions&rvprop=content&format=json&pageids=${pageid}&origin=*`);
    const data = await res.json();
    const raw = data.query.pages[pageid].revisions[0]["*"];
    const gameName = "Inazuma Eleven Eiyuutachi no Victory Road";
    const tabRegex = new RegExp(`\\{\\{Tab\\s*\\|\\s*${gameName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\|([\\s\\S]*?)\\}\\}`, "i");
    const match = raw.match(tabRegex);

    const stats: IStatistics = {
      kick: 0,
      control: 0,
      pressure: 0,
      physical: 0,
      agility: 0,
      intelligence: 0,
      technique: 0,
    };

    if (!match) return stats;

    const block = match[1];

    // Extraire chaque stat en ligne du bloc
    const statRegex = /\*\s*'''([^']+)'''\s*:\s*(\d+)/g;

    let statMatch;
    while ((statMatch = statRegex.exec(block)) !== null) {
      const statName = statMatch[1].trim();
      const statValue = parseInt(statMatch[2]);
      stats[statName.toLowerCase() as keyof IStatistics] = statValue;
    }

    return stats;
  };

  const fullStats = useMemo(() => stats && getAdvancedStats(stats), [stats]);

  return (
    <div>
      <h1>AdminPage</h1>
      <h2>Welcome {user.username}</h2>
      <p>{fandomPlayers.length} joueurs trouvés</p>
      <p>{playerDone} joueurs fetch</p>
      {fullStats && (
        <div className="flex flex-wrap gap-5 text-base">
          <div>
            <p className="font-semibold mb-1">Base statistics</p>
            <ul className="pl-8 border-l list-disc flex-1">
              {statisticsLabels.map((stat) => (
                <li key={"statistic-" + stat}>
                  {capitalize(stat)} : {fullStats[stat as keyof IStatistics]}
                </li>
              ))}
              <li>Total statistics : {fullStats.total}</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">Advanced statistics</p>
            <ul className="pl-8 border-l list-disc flex-1">
              {advancedStatisticsLabels.map((stat) => (
                <li key={"statistic-" + stat}>
                  {getAdvancedStatLabel(stat)} : {fullStats[stat as keyof IStatistics]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {fetched ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Stats</th>
              <th>Bouton</th>
            </tr>
          </thead>
          <tbody>
            {fandomPlayers.map(({ pageId, name, positions, stats }) => (
              <tr key={`fandom-character-${pageId}`}>
                <td className="px-3">{pageId}</td>
                <td className="px-3">{name}</td>
                <td className="px-3">{positions.join(", ")}</td>
                <td>
                  {stats && (
                    <div className="flex flex-wrap gap-5 text-base">
                      <div>
                        <p className="font-semibold mb-1">Base statistics</p>
                        <ul className="pl-8 border-l list-disc flex-1">
                          {statisticsLabels.map((stat) => (
                            <li key={"statistic-" + stat}>
                              {capitalize(stat)} : {stats[stat as keyof IStatistics]}
                            </li>
                          ))}
                          {/* <li>Total statistics : {stats.total}</li> */}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Advanced statistics</p>
                        <ul className="pl-8 border-l list-disc flex-1">
                          {advancedStatisticsLabels.map((stat) => (
                            <li key={"statistic-" + stat}>
                              {getAdvancedStatLabel(stat)} : {stats[stat as keyof IStatistics]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-3">
                  <Button color="default" onClick={() => fetchPlayerStats(pageId)}>
                    Fetch
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AdminPage;
