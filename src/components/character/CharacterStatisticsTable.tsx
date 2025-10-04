import type { IAdvancedStatistics, IStatistics } from "@character/character.types";
import { advancedStatKeys } from "@character/character.variables";
import ColorsHelper from "@utils/helpers/colors.helpers";
import type { AppTemplate } from "@utils/types";
import { useTranslations } from "next-intl";
import type React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  template: AppTemplate;
  statistics: IStatistics;
  advancedStatistics: IAdvancedStatistics;
}

const CharacterStatisticsTable = ({ className, statistics, advancedStatistics, template, ...props }: IProps) => {
  const t = useTranslations("character");

  const { value, accent } = ColorsHelper.getTemplateColor(template);

  return (
    <table {...props} className={["bordered rounded", className].join(" ")}>
      <thead style={{ backgroundColor: value, color: accent }}>
        <tr>
          <th>{t("properties.statistics")}</th>
          <th>{t("properties.advancedStatistics")}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="align-top">
            {Object.entries(statistics).map(([key, value]) => (
              <StatisticItem key={key} label={t(`statistics.${key}`)} value={value} />
            ))}
          </td>
          <td>
            {advancedStatKeys
              .filter((key) => key !== "total")
              .map((key) => (
                <StatisticItem
                  key={key}
                  label={t(`advancedStatistics.${key}`)}
                  value={advancedStatistics[key as keyof IAdvancedStatistics]}
                />
              ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const StatisticItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2">
    <strong>{label}:</strong>
    <span>{value}</span>
  </div>
);

export default CharacterStatisticsTable;
