"use client";
import {
  ICharacter,
  ICharacterHissatsu,
  IStatistics,
} from "@/types/character.types";
import TextInput from "@atoms/Inputs/TextInput";
import { capitalize } from "@utils/functions";
import React, { useEffect, useState } from "react";
import CharacterHissatsuForm, {
  FormHissatsu,
} from "../molecules/CharacterHissatsusForm";
import Button from "@atoms/Button";
import { defaultErrorMessage } from "@atoms/Inputs/variables";
import { postHissatsu } from "@/controllers/hissatsus.controller";
import { toast } from "sonner";
import {
  postCharacter,
  putCharacter,
} from "@/controllers/characters.controller";
import { useLoadingState } from "@context/LoadingContext";
import { useRouter } from "next/navigation";
import { elements, positions, statisticsLabels } from "@utils/variables";
import SelectInput from "@atoms/Inputs/SelectInput";
import NumberInput from "@atoms/Inputs/NumberInput";

interface IFormData {
  firstName: string;
  lastName?: string;
  statistics: Partial<IStatistics>;
  hissatsus: FormHissatsu[];
  element: string;
  defaultPosition: string;
}

function CharacterForm({ character }: { character?: ICharacter }) {
  const [formData, setFormData] = useState<Partial<IFormData>>({});
  const [totalStats, setTotalStats] = useState<number>();
  const [errors, setErrors] = useState<string[]>([]);
  const { setIsLoading } = useLoadingState();
  const router = useRouter();
  const isUpdating = !!character;

  useEffect(() => {
    setTotalStats(() => {
      if (!formData.statistics) return 0;
      return Object.values(formData.statistics).reduce(
        (acc: number, curr: number) => acc + parseInt(curr.toString()) || 0,
        0
      );
    });
  }, [formData.statistics]);

  useEffect(() => {
    if (character) {
      const {
        firstName,
        hissatsus,
        lastName,
        statistics,
        element,
        defaultPosition,
      } = character;
      setFormData({
        firstName,
        hissatsus: hissatsus.sort((a, b) => a.learnLevel - b.learnLevel),
        lastName,
        statistics,
        element,
        defaultPosition,
      });
    }
  }, [character]);

  const checkErrors = () => {
    const { firstName, statistics, hissatsus } = formData;
    const errors: string[] = [];
    if (!firstName) errors.push("firstName");
    if (statistics) {
      for (const value of Object.values(statistics)) {
        if (value === undefined || value === null) {
          errors.push("statistics");
          break;
        }
      }
    }

    if (hissatsus) {
      for (const { name, learnLevel, type, element, hissatsuId } of hissatsus) {
        if (!learnLevel) {
          errors.push("hissatsus");
          break;
        }
        if (!hissatsuId && (!name || !type || !element)) {
          errors.push("hissatsus");
          break;
        }
      }
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = checkErrors();
    if (errors.length > 0) return setErrors(errors);
    setErrors([]);
    const { hissatsus } = formData;
    const hissatsuDatas: Partial<ICharacterHissatsu>[] = [];
    setIsLoading(true);
    if (hissatsus) {
      for (const hissatsu of hissatsus) {
        const { hissatsuId, name, type, element, learnLevel } = hissatsu;
        if (hissatsuId) hissatsuDatas.push({ hissatsuId, learnLevel });
        else {
          const newHissatsu = { name, type, element };
          try {
            const { _id } = await postHissatsu(newHissatsu);
            hissatsuDatas.push({ hissatsuId: _id, learnLevel });
          } catch (error) {
            console.log(error);
            toast.error("An error has occured while adding hissatsu");
          }
        }
      }
    }

    const data = { ...formData, hissatsus: hissatsuDatas };
    const promise = character
      ? putCharacter(character._id, data)
      : postCharacter(data);
    promise
      .then(() => {
        toast.success(
          `The character has been ${isUpdating ? "updated" : "added"}`
        );
        router.push("/characters");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `An error has occured while ${
            isUpdating ? "updating" : "adding"
          } the character`
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="max-w-[1000px] flex flex-col gap-5">
      <TextInput
        id="firstName"
        label="First name"
        value={formData.firstName || ""}
        labelClassName="text-lg"
        handleChange={(firstName) => setFormData({ ...formData, firstName })}
        error={errors.includes("firstName")}
        required
      />
      <TextInput
        id="lastName"
        label="Last name"
        value={formData.lastName || ""}
        labelClassName="text-lg"
        handleChange={(lastName) => setFormData({ ...formData, lastName })}
        error={errors.includes("lastName")}
      />
      <SelectInput
        label="Element"
        id={"element"}
        options={elements
          .filter((e) => e !== "void")
          .map((e) => ({
            value: e,
            label: capitalize(e),
          }))}
        value={formData.element || ""}
        handleChange={(element) => setFormData({ ...formData, element })}
        required
        withEmptyOption
      />
      <SelectInput
        label="DefaultPosition"
        id={"defaultPosition"}
        options={positions.map((e) => ({
          value: e,
          label: capitalize(e),
        }))}
        value={formData.defaultPosition || ""}
        handleChange={(defaultPosition) =>
          setFormData({ ...formData, defaultPosition })
        }
        required
        withEmptyOption
      />
      <div>
        <p className="font-semibold text-lg">Statistics</p>
        {errors.includes("statistics") && (
          <p className="text-red-500">{defaultErrorMessage}</p>
        )}
        <div className="pl-5 border-l">
          <div className=" flex flex-wrap gap-3">
            {statisticsLabels.map((stat) => {
              const dataStats = formData.statistics || {};
              const key = "statistic-" + stat;
              return (
                <NumberInput
                  key={key}
                  id={key}
                  label={capitalize(stat)}
                  value={dataStats[stat as keyof object] || ""}
                  divClassName="basis-[30%]"
                  min={0}
                  handleChange={(val) =>
                    setFormData({
                      ...formData,
                      statistics: { ...dataStats, [stat]: val },
                    })
                  }
                />
              );
            })}
          </div>
          {!!totalStats && (
            <p>
              <b>Total statistics : </b>
              {totalStats}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">Hissatsus</p>
        {errors.includes("hissatsus") && (
          <p className="text-red-500">{defaultErrorMessage}</p>
        )}
        <CharacterHissatsuForm
          hissatsus={formData.hissatsus || []}
          handleChange={(hissatsus) =>
            setFormData({ ...formData, hissatsus: hissatsus })
          }
        />
      </div>
      <Button className="text-xl" color="yellow" onClick={handleSubmit}>
        Submit character
      </Button>
    </div>
  );
}

export default CharacterForm;
