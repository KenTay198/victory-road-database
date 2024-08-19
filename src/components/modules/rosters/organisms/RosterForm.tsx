"use client";
import TextInput from "@atoms/Inputs/TextInput";
import React, { useEffect, useMemo, useState } from "react";
import Button from "@atoms/Button";
import { toast } from "sonner";
import { useLoadingState } from "@context/LoadingContext";
import { useRouter } from "next/navigation";
import { IRoster } from "@/types/roster.types";
import { postRoster, putRoster } from "@/controllers/rosters.controller";
import { defaultErrorMessage } from "@atoms/Inputs/variables";
import { ICharacter } from "@/types/character.types";
import SelectInput from "@atoms/Inputs/SelectInput";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useAuthState } from "@context/AuthContext";

interface IFormData {
  name: string;
  characters: string[];
}

type CharacterWithName = ICharacter & { name: string };

function RosterForm({
  roster,
  characters,
}: {
  characters: ICharacter[];
  roster?: IRoster;
}) {
  const { user } = useAuthState();
  const [allCharacters, setAllCharacters] = useState<CharacterWithName[]>([]);
  const [formData, setFormData] = useState<Partial<IFormData>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLoading } = useLoadingState();
  const router = useRouter();
  const isUpdating = !!roster;
  const formCharacters = useMemo(
    () => formData.characters || [],
    [formData.characters]
  );

  useEffect(() => {
    if (roster) {
      const { name, characters } = roster;
      setFormData({
        name,
        characters: characters.map((c) => (typeof c === "string" ? c : c._id)),
      });
    }
  }, [roster]);

  useEffect(() => {
    setAllCharacters(
      characters
        .map((c) => ({
          ...c,
          name: `${c.firstName}${c.lastName ? " " + c.lastName : ""}`,
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [characters]);

  const checkErrors = () => {
    const { name, characters } = formData;
    const errors: string[] = [];
    if (!name) errors.push("name");
    if (!characters || characters.length > 16) errors.push("characters");
    return errors;
  };

  const handleSubmit = async () => {
    const errors = checkErrors();
    if (errors.length > 0) return setErrors(errors);
    setErrors([]);
    setIsLoading(true);

    const promise = roster
      ? putRoster(roster._id, formData)
      : postRoster({ ...formData, owner: user?._id });
    promise
      .then(() => {
        toast.success(
          `The roster has been ${isUpdating ? "updated" : "added"}`
        );
        router.push("/dashboard/rosters");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `An error has occured while ${
            isUpdating ? "updating" : "adding"
          } the roster`
        );
      })
      .finally(() => setIsLoading(false));
  };

  const updateCharacters = (index: number, val: string) => {
    const updatedCharacters = [...formCharacters];
    updatedCharacters[index] = val;
    setFormData({ ...formData, characters: updatedCharacters });
  };

  return (
    <div className="max-w-[1000px] flex flex-col gap-5">
      <TextInput
        id="name"
        label="Name"
        value={formData.name || ""}
        labelClassName="text-lg"
        handleChange={(name) => setFormData({ ...formData, name })}
        error={errors.includes("name")}
        required
      />
      <div>
        <p className="font-semibold text-lg">Characters</p>
        {errors.includes("characters") && (
          <p className="text-red-500">{defaultErrorMessage}</p>
        )}
        <div className="flex flex-col gap-2">
          {formCharacters.map((id, index) => {
            const key = `roster-character-${index}`;
            return (
              <div className="flex gap-1" key={key}>
                <SelectInput
                  id={key}
                  options={allCharacters
                    .filter(
                      ({ _id }) => _id === id || !formCharacters.includes(_id)
                    )
                    .map(({ _id, name }) => ({
                      value: _id,
                      label: name,
                    }))}
                  value={id || ""}
                  handleChange={(val) => updateCharacters(index, val)}
                  placeholder="Select a character"
                  withEmptyOption
                />
                <FaTimes
                  size={30}
                  className="text-red-600 duration-200 hover:scale-110 cursor-pointer"
                  onClick={() => {
                    const updatedCharacters = formCharacters.filter(
                      (_, i) => i !== index
                    );
                    setFormData({
                      ...formData,
                      characters: updatedCharacters,
                    });
                  }}
                />
              </div>
            );
          })}
          <Button
            color="blue"
            className="w-fit"
            icon={FaPlus}
            onClick={() => {
              if (formCharacters.length >= 16)
                return setErrorMessage(
                  "You have reached the maximum number of characters in the roster (16)"
                );
              setFormData({ ...formData, characters: [...formCharacters, ""] });
            }}
          >
            Add character
          </Button>
        </div>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Button className="text-xl" color="yellow" onClick={handleSubmit}>
        Submit roster
      </Button>
    </div>
  );
}

export default RosterForm;
