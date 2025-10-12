import type React from "react";
import type { AppTemplate } from "@utils/types";
import ColorsHelper from "@utils/helpers/colors.helpers";
import type { ILearnedHissatsu } from "@character/character.types";
import type Hissatsu from "@hissatsu/hissatsu.entity";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import HissatsuPropertyFormatter from "@components/hissatsus/HissatsuPropertyFormatter";
import { getTranslations } from "next-intl/server";
import { getPageContext } from "@/actions/page.actions";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  template: AppTemplate;
  learnedHissatsus: ILearnedHissatsu[];
  hissatsus: Hissatsu[];
}

const CharacterHissatsusTable = async ({ className, learnedHissatsus, hissatsus, template, ...props }: IProps) => {
  const { settings } = await getPageContext();
  const t = await getTranslations("hissatsu");
  const { value, accent } = ColorsHelper.getTemplateColor(template);
  const keys = ["element", "name", "type", "characteristic", "power", "cost"];

  return (
    <table {...props} className={["bordered rounded", className].join(" ")}>
      <thead style={{ backgroundColor: value, color: accent }}>
        <tr>
          {keys.map((key) => (
            <th key={key}>{t(`properties.${key}`)}</th>
          ))}
          <th>{t("properties.learnLevel")}</th>
        </tr>
      </thead>
      <tbody>
        {learnedHissatsus.map(({ id, learnLevel }) => {
          const hissatsu = hissatsus.find((h) => h.id === id);
          if (!hissatsu) return null;
          hissatsu.setLocalizedName(settings.hissatsuLocale);
          return (
            <tr key={id}>
              {keys.map((key) => (
                <td key={key}>
                  <div className="text-center flex justify-center py-1">
                    <HissatsuPropertyFormatter property={key} value={hissatsu[key as keyof IHissatsu]} />
                  </div>
                </td>
              ))}
              <td className="text-center">{learnLevel}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CharacterHissatsusTable;
