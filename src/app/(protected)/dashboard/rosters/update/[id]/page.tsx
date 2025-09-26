import { getCharacters } from "@/controllers/characters.controller";
import { getRosterById } from "@/controllers/rosters.controller";
import BackButton from "@atoms/BackButton";
import RosterForm from "@components/modules/rosters/organisms/RosterForm";
import React from "react";

export const metadata = {
  title: "Update roster | Victory Road Database",
};

async function UpdateRosterPage({ params }: { params: any }) {
  const roster = await getRosterById(params.id);
  const characters = await getCharacters();

  return (
    <div>
      <BackButton href="/dashboard/rosters" label="Back to rosters list" />
      <h1>Update roster</h1>
      {roster ? (
        <RosterForm roster={roster} characters={characters} />
      ) : (
        <p>This roster doesn&apos;t exist.</p>
      )}
    </div>
  );
}

export default UpdateRosterPage;
