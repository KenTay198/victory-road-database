import React from "react";
import BackButton from "@atoms/BackButton";
import HissatsuForm from "@components/modules/hissatsus/organisms/HissatsuForm";

export const metadata = {
  title: "Add hissatsu | Victory Road Database",
};

function AddHissatsuPage() {
  return (
    <div>
      <BackButton href="/hissatsus" label="Back to hissatsus list" />
      <h1>Add hissatsu</h1>
      <HissatsuForm />
    </div>
  );
}

export default AddHissatsuPage;
