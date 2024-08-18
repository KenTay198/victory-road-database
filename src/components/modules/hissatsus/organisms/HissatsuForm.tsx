"use client";
import IHissatsu, {
  HissatsuCharacteristic,
  hissatsuCharacteristics,
  HissatsuType,
  hissatsuTypes,
} from "@/types/hissatsu.types";
import TextInput from "@atoms/Inputs/TextInput";
import { capitalize } from "@utils/functions";
import React, { useEffect, useState } from "react";
import Button from "@atoms/Button";
import { toast } from "sonner";
import { useLoadingState } from "@context/LoadingContext";
import { useRouter } from "next/navigation";
import { elements } from "@utils/variables";
import SelectInput from "@atoms/Inputs/SelectInput";
import { putHissatsu, postHissatsu } from "@/controllers/hissatsus.controller";
import { Element } from "@/types/types";

type IFormData = Partial<IHissatsu>;

function HissatsuForm({ hissatsu }: { hissatsu?: IHissatsu }) {
  const [formData, setFormData] = useState<Partial<IFormData>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const { setIsLoading } = useLoadingState();
  const router = useRouter();
  const isUpdating = !!hissatsu;

  useEffect(() => {
    if (hissatsu) {
      const { name, element, type, characteristic } = hissatsu;
      setFormData({
        name,
        element,
        type,
        characteristic,
      });
    }
  }, [hissatsu]);

  const checkErrors = () => {
    const { name, element, type } = formData;
    const errors: string[] = [];
    if (!name) errors.push("firstName");
    if (!element) errors.push("firstName");
    if (!type) errors.push("firstName");
    return errors;
  };

  const handleSubmit = async () => {
    const errors = checkErrors();
    if (errors.length > 0) return setErrors(errors);
    setErrors([]);
    setIsLoading(true);

    const promise = hissatsu
      ? putHissatsu(hissatsu._id, formData)
      : postHissatsu(formData);

    promise
      .then(() => {
        toast.success(
          `The hissatsu has been ${isUpdating ? "updated" : "added"}`
        );
        router.push("/hissatsus");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          `An error has occured while ${
            isUpdating ? "updating" : "adding"
          } the hissatsu`
        );
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="max-w-[1000px] flex flex-col gap-5">
      <TextInput
        label="Name"
        id="name"
        value={formData.name || ""}
        labelClassName="text-lg"
        handleChange={(name) => setFormData({ ...formData, name })}
        error={errors.includes("name")}
        required
      />
      <SelectInput
        label="Element"
        id={"element"}
        options={elements.map((e) => ({
          value: e,
          label: capitalize(e),
        }))}
        value={formData.element || ""}
        handleChange={(element) =>
          setFormData({ ...formData, element: element as Element })
        }
        required
        withEmptyOption
      />
      <SelectInput
        label="Characteristic"
        id="characteristic"
        options={hissatsuCharacteristics.map((e) => ({
          value: e,
          label: capitalize(e),
        }))}
        value={formData.characteristic || ""}
        handleChange={(characteristic) =>
          setFormData({
            ...formData,
            characteristic: characteristic as HissatsuCharacteristic,
          })
        }
        withEmptyOption
      />
      <SelectInput
        label="Type"
        id={"type"}
        options={hissatsuTypes.map((e) => ({
          value: e,
          label: capitalize(e),
        }))}
        value={formData.type || ""}
        handleChange={(type) =>
          setFormData({ ...formData, type: type as HissatsuType })
        }
        required
        withEmptyOption
      />

      <Button className="text-xl" color="yellow" onClick={handleSubmit}>
        Submit hissatsu
      </Button>
    </div>
  );
}

export default HissatsuForm;
