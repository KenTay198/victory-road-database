import { getRosterById } from "@/controllers/rosters.controller";
import BackButton from "@atoms/BackButton";
import Button from "@atoms/Button";
import RosterTactic from "@components/modules/rosters/molecules/RosterTactic";
import React from "react";
import { GrUpdate } from "react-icons/gr";

export const metadata = {
  title: "View roster | Victory Road Database",
};

async function RosterTacticPage({ params }: { params: any }) {
  const roster = await getRosterById(params.id, { completeCharacters: true });

  return (
    <div>
      <BackButton href="/dashboard/rosters" label="Back to rosters list" />
      <h1>Roster tactic</h1>
      <Button
        color="blue"
        href={`/dashboard/rosters/update/${params.id}`}
        icon={GrUpdate}
        className="mb-2"
      >
        Update roster
      </Button>
      {roster ? (
        <RosterTactic roster={roster} />
      ) : (
        <p>This roster doesn&apos;t exist.</p>
      )}
    </div>
  );
}

export default RosterTacticPage;
