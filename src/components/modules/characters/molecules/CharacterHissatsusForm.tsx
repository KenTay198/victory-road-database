import { getHissatsus } from "@/controllers/hissatsus.controller";
import { ICharacterHissatsu } from "@/types/character.types";
import IHissatsu, { HissatsuType, hissatsuTypes } from "@/types/hissatsu.types";
import { Element } from "@/types/types";
import Button from "@atoms/Button";
import NumberInput from "@atoms/Inputs/NumberInput";
import SelectInput from "@atoms/Inputs/SelectInput";
import TextInput from "@atoms/Inputs/TextInput";
import { capitalize } from "@utils/functions";
import { elements } from "@utils/variables";
import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

export interface FormHissatsu extends Partial<ICharacterHissatsu> {
  add?: boolean;
  name?: string;
  type?: HissatsuType;
  element?: Element | "void";
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  hissatsus: FormHissatsu[];
  handleChange: (val: FormHissatsu[]) => void;
}

function CharacterHissatsuForm({
  hissatsus,
  className,
  handleChange,
  ...props
}: IProps) {
  const formHissatsus = hissatsus || [];
  const [allHissatsus, setAllHissatsus] = useState<IHissatsu[]>([]);

  const toggleUpdateHissatsu = (index: number, value: FormHissatsu) => {
    const updatedHissatsus = hissatsus.map((item, i) =>
      i === index ? value : item
    );
    handleChange(updatedHissatsus);
  };

  const updateHissatsu = (
    index: number,
    key: keyof FormHissatsu,
    val: string | number
  ) => {
    const updatedHissatsus = [...formHissatsus];
    updatedHissatsus[index] = {
      ...updatedHissatsus[index],
      [key]: val,
    };
    handleChange(updatedHissatsus);
  };

  useEffect(() => {
    getHissatsus().then((datas) =>
      setAllHissatsus(datas.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }, []);

  return (
    <div {...props} className={["", className].join(" ")}>
      {hissatsus.map((hissatsu, index) => {
        const data = formHissatsus[index];

        return (
          <div
            key={`hisstatsu-${index}`}
            className="flex flex-col flex-wrap py-2"
          >
            <div className="flex flex-wrap gap-2 items-center">
              <p className="font-semibold">Hissatsu {index + 1}</p>
              <Button
                color="blue"
                isActive={hissatsu.add}
                onClick={() =>
                  toggleUpdateHissatsu(index, {
                    ...hissatsu,
                    name: undefined,
                    hissatsuId: undefined,
                    type: undefined,
                    add: !hissatsu.add,
                  })
                }
              >
                {hissatsu.add ? "Select hissatsu" : "Create hissatsu"}
              </Button>
            </div>
            <div className="flex flex-wrap pl-3 border-l items-center gap-3">
              {hissatsu.add ? (
                <>
                  <TextInput
                    label="Name"
                    id={"hissatsu-" + index + "-name"}
                    divClassName="flex-1"
                    value={data?.name || ""}
                    handleChange={(val) => updateHissatsu(index, "name", val)}
                  />
                  <SelectInput
                    label="Type"
                    id={"hissatsu-" + index + "-type"}
                    options={hissatsuTypes.map((t) => ({
                      value: t,
                      label: capitalize(t),
                    }))}
                    divClassName="flex-1"
                    value={data?.type || ""}
                    handleChange={(val) => updateHissatsu(index, "type", val)}
                    withEmptyOption
                  />
                  <SelectInput
                    label="Element"
                    id={"hissatsu-" + index + "-element"}
                    options={elements.map((t) => ({
                      value: t,
                      label: capitalize(t),
                    }))}
                    divClassName="flex-1"
                    value={data?.element || ""}
                    handleChange={(val) =>
                      updateHissatsu(index, "element", val)
                    }
                    withEmptyOption
                  />
                </>
              ) : (
                <SelectInput
                  label="Name"
                  id={"hissatsu-" + index + "-id"}
                  options={allHissatsus.map(({ _id, name }) => ({
                    value: _id,
                    label: name,
                  }))}
                  divClassName="flex-1"
                  value={
                    typeof data?.hissatsuId === "string"
                      ? data?.hissatsuId
                      : data?.hissatsuId?._id || ""
                  }
                  handleChange={(val) =>
                    updateHissatsu(index, "hissatsuId", val)
                  }
                  withEmptyOption
                />
              )}
              <NumberInput
                id={"hissatsu-" + index + "-learnLevel"}
                label="Learn level"
                divClassName="flex-1"
                value={data?.learnLevel || ""}
                min={0}
                handleChange={(val) => updateHissatsu(index, "learnLevel", val)}
              />
              <FaTimes
                size={30}
                className="text-red-600 duration-200 hover:scale-110 cursor-pointer"
                onClick={() => {
                  const updatedHissatsus = formHissatsus.filter(
                    (_, i) => i !== index
                  );
                  handleChange(updatedHissatsus);
                }}
              />
            </div>
          </div>
        );
      })}
      <Button
        icon={FaPlus}
        color="yellow"
        onClick={() => handleChange([...(hissatsus || []), {}])}
      >
        Add hissatsu
      </Button>
    </div>
  );
}

export default CharacterHissatsuForm;
