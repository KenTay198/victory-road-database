import React from "react";
import CharacterForm from "@components/modules/characters/organisms/CharacterForm";
import BackButton from "@atoms/BackButton";

function AddCharacterPage() {
  return (
    <div>
      <BackButton href="/characters" label="Back to characters list" />
      <h1>Add character</h1>
      <CharacterForm />
    </div>
  );
}

export default AddCharacterPage;
