import { getHissatsuById } from "@/controllers/hissatsus.controller";
import BackButton from "@atoms/BackButton";
import Button from "@atoms/Button";
import HissatsuView from "@components/modules/hissatsus/organisms/HissatsuView";
import React from "react";
import { GrUpdate } from "react-icons/gr";

export const metadata = {
  title: "View hissatsu | Victory Road Database",
};

async function ViewHissatsuPage({ params }: { params: any }) {
  const hissatsu = await getHissatsuById(params.id);

  return (
    <div>
      <BackButton href="/hissatsus" label="Back to hissatsus list" />
      <h1>View hissatsu</h1>
      <Button
        color="blue"
        href={`/hissatsus/update/${params.id}`}
        icon={GrUpdate}
        className="mb-2"
      >
        Update hissatsu
      </Button>
      {hissatsu ? (
        <HissatsuView hissatsu={hissatsu} />
      ) : (
        <p>This hissatsu doesn&apos;t exist.</p>
      )}
    </div>
  );
}

export default ViewHissatsuPage;
