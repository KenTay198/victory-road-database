import { getRosterById } from "@/controllers/rosters.controller";
import BackButton from "@atoms/BackButton";
import Button from "@atoms/Button";
import RosterView from "@components/modules/rosters/organisms/RosterView";
import React from "react";
import { GrUpdate } from "react-icons/gr";

export const metadata = {
  title: "View roster | Victory Road Database",
};

async function ViewRosterPage({ params }: { params: any }) {
  const roster = await getRosterById(params.id, { completeCharacters: true });

  return (
    <div>
      <BackButton href="/dashboard/rosters" label="Back to rosters list" />
      <h1>View roster</h1>
      <div className="flex gap-2">
        <Button
          color="blue"
          href={`/dashboard/rosters/update/${params.id}`}
          icon={GrUpdate}
          className="mb-2"
        >
          Update roster
        </Button>
        <Button
          color="blue"
          href={`/dashboard/rosters/${params.id}/tactic`}
          icon={GrUpdate}
          className="mb-2"
        >
          Change tactic
        </Button>
      </div>
      {roster ? (
        <RosterView roster={roster} />
      ) : (
        <p>This roster doesn&apos;t exist.</p>
      )}
    </div>
  );
}

export default ViewRosterPage;
