import React from "react";
import Button from "@atoms/Button";
import { getHissatsus } from "@/controllers/hissatsus.controller";
import { FaPlus } from "react-icons/fa";
import HissatsuTable from "@components/modules/hissatsus/organisms/HissatsuTable";

export const metadata = {
  title: "Hissatsu list | Victory Road Database",
};

async function HissatsuListPage() {
  const hissatsus = await getHissatsus();

  return (
    <div>
      <h1>Hissatsu list</h1>
      <Button
        color="blue"
        href="/characters/add"
        icon={FaPlus}
        className="mb-2"
      >
        Add hissatsu
      </Button>
      <HissatsuTable hissatsus={hissatsus} />
    </div>
  );
}

export default HissatsuListPage;
