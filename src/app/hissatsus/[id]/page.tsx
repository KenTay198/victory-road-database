import { getHissatsuById } from "@/controllers/hissatsus.controller";
import BackButton from "@atoms/BackButton";
import HissatsuForm from "@components/modules/hissatsus/organisms/HissatsuForm";
import React from "react";

async function UpdateHissatsuPage({ params }: { params: any }) {
  const hissatsu = await getHissatsuById(params.id);

  return (
    <div>
      <BackButton href="/hissatsus" label="Back to hissatsus list" />
      <h1>Update hissatsu</h1>
      {hissatsu ? (
        <HissatsuForm hissatsu={hissatsu} />
      ) : (
        <p>This hissatsu doesn&apos;t exist.</p>
      )}
    </div>
  );
}

export default UpdateHissatsuPage;
