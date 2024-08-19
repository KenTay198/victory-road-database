import { getRostersByUser } from "@/controllers/rosters.controller";
import Button from "@atoms/Button";
import RosterTable from "@components/modules/rosters/organisms/RosterTable";
import { cookies } from "next/headers";
import React from "react";
import { FaPlus } from "react-icons/fa";

async function RostersPage() {
  const userId = cookies().get("victory-road-user-id")?.value;
  let rosters;
  if (userId) rosters = await getRostersByUser(userId);   

  return (
    <div>
      <h1>My rosters</h1>

      <Button
        color="blue"
        href="/dashboard/rosters/add"
        icon={FaPlus}
        className="mb-2"
      >
        Add roster
      </Button>
      {rosters ? (
        <RosterTable rosters={rosters} />
      ) : (
        <p>
          Impossible to get your rosters. Please verify your authentication.
        </p>
      )}
    </div>
  );
}

export default RostersPage;
