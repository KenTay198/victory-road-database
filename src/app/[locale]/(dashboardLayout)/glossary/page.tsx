import Banner from "@components/ui/Layout/Banner";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("pages.glossary.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
};

const GlossaryPage = () => {
  const t = useTranslations("pages.glossary");
  return (
    <>
      <Banner title={t("header")} path={[{ value: "glossary" }]} />
      <h2>Advanced statistics</h2>
      <ul>
        <li>
          <strong>Focus Att (Offense): </strong>
          <span>
            This quantifies the player&apos;s ability to beat their opponent in a Focus battle. It&apos;s calculated by
            adding the <strong>Technique</strong> and <strong>Control</strong> stats together.
          </span>
        </li>
        <li>
          <strong>Scramble Att (Offense): </strong>
          <span>
            This quantifies the player&apos;s ability to beat their opponent in a Scramble battle. It&apos;s calculated
            by adding the <strong>Technique</strong> and <strong>Control</strong> stats together.
          </span>
        </li>
        <li>
          <strong>Faceoff Att (Offense): </strong>
          <span>
            This quantifies the player&apos;s ability to beat their opponent. It&apos;s calculated by adding the{" "}
            <strong>Technique</strong> and <strong>Control</strong> stats together.
          </span>
        </li>
      </ul>
    </>
  );
};

export default GlossaryPage;
