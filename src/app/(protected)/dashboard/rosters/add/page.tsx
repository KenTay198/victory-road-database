import { getCharacters } from "@/controllers/characters.controller";
import BackButton from "@atoms/BackButton";
import RosterForm from "@components/modules/rosters/organisms/RosterForm";
import React from "react";

async function RosterAddPage() {
  const characters = await getCharacters();

  return (
    <div>
      <BackButton href="/dashboard/rosters" label="Back to rosters list" />
      <h1>Add roster</h1>
      <RosterForm characters={characters} />
    </div>
  );
}

export default RosterAddPage;
