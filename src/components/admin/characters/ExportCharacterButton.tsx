"use client";
import { findAllCharactersAction } from "@/actions/character.actions";
import Button from "@components/ui/Buttons/Button";
import { useTranslations } from "next-intl";
import type { ICreateLearnedHissatsu, IHissatsu } from "@hissatsu/hissatsu.types";

const ExportCharacterButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  const t = useTranslations();

  const handleClick = () => {
    const confirmed = window.confirm("Are you sure you want to export all characters?");
    if (confirmed) {
      findAllCharactersAction({ withMeta: false, withHissatsus: true }).then((characters) => {
        const exportedCharacters = characters.map((e) => {
          const character: any = { ...e };
          delete character.id;
          delete character.archetypes;
          const learnedHissatsus: ICreateLearnedHissatsu[] = character.learnedHissatsus || [];
          const hissatsus: IHissatsu[] = character.hissatsus || [];
          if (learnedHissatsus.length > 0 && hissatsus.length > 0) {
            for (let i = 0; i < learnedHissatsus.length; i++) {
              const h = learnedHissatsus[i];
              const fullHissatsu = hissatsus.find((hh) => hh.id === h.id);
              if (!fullHissatsu) continue;
              learnedHissatsus[i] = { ...fullHissatsu, learnLevel: h.learnLevel };
              delete learnedHissatsus[i].id;
            }
          }
          delete character.hissatsus;
          return character;
        });

        const dataStr = JSON.stringify(exportedCharacters, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "characters_export.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    }
  };

  return (
    <Button {...props} onClick={handleClick} template="blue">
      {t("common.buttons.export")}
    </Button>
  );
};

export default ExportCharacterButton;
