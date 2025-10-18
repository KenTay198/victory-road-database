"use client";
import { useModalDialog } from "@/hooks/useModalDialog";
import type { ICharacter } from "@character/character.types";
import { advancedStatKeys } from "@character/character.variables";
import type AdvancedStatistics from "@character/entities/advancedStatistics.entity";
import Character from "@character/entities/character.entity";
import Meta from "@meta/meta.entity";
import type { IMeta } from "@meta/meta.types";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js";
import { useTranslations } from "next-intl";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface IProps {
  character: ICharacter;
  meta?: IMeta;
  size?: number;
  disableClick?: boolean;
}

const CharacterTendencies = ({ character: characterJSON, meta, size = 400, disableClick }: IProps) => {
  const t = useTranslations();
  const modal = useModalDialog({
    title: t("character.statDistribution"),
    content: <CharacterTendencies character={characterJSON} meta={meta} size={700} disableClick={true} />,
  });
  if (!meta) return null;
  const character = new Character(characterJSON);
  character.setMeta(Meta.fromJSON(meta));
  character.setNormalizedAdvancedStatistics();
  if (!character.normalizedStatistics) return null;
  const advancedStatistics = character.normalizedStatistics?.advanced as AdvancedStatistics;
  const filteredStatKeys = advancedStatKeys.filter((key) => !key.includes("total") && !key.includes("faceoff"));

  const normalizeStatValue = (value: number, min: number, max: number): number => {
    if (max === min) return 0;
    return Math.min(1, Math.max(0, (value - min) / (max - min)));
  };

  const characterNormalizedStats = filteredStatKeys.map((key) => {
    const value = advancedStatistics[key];
    const min = meta.advancedStatRange.min[key];
    const max = meta.advancedStatRange.max[key];
    return normalizeStatValue(value, min, max);
  });

  const meanNormalizedStats = filteredStatKeys.map((key) => {
    const value = meta.advancedStatRange.mean[key];
    const min = meta.advancedStatRange.min[key];
    const max = meta.advancedStatRange.max[key];
    return normalizeStatValue(value, min, max);
  });

  const characterTotal = characterNormalizedStats.reduce((sum, stat) => sum + stat, 0);
  const meanTotal = meanNormalizedStats.reduce((sum, stat) => sum + stat, 0);

  const characterStatsPercentage = characterNormalizedStats.map((stat) =>
    characterTotal > 0 ? (stat / characterTotal) * 100 : 0,
  );
  const meanStatsPercentage = meanNormalizedStats.map((stat) => (meanTotal > 0 ? (stat / meanTotal) * 100 : 0));

  const data: ChartData<"radar", any, string> = {
    labels: filteredStatKeys.map((key) => t(`character.advancedStatistics.${key}`)),
    datasets: [
      {
        label: t("common.character"),
        data: characterStatsPercentage,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: t("common.mean"),
        data: meanStatsPercentage,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        max: Math.max(...characterStatsPercentage, ...meanStatsPercentage) * 1.1, // Échelle dynamique
        ticks: {
          stepSize: 5,
          callback: (value: any) => `${Math.round(value)}%`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${Math.round(context.parsed.r)}%`,
        },
      },
    },
  };

  const handleClick = () => {
    if (!disableClick) modal.open();
  };

  return (
    <button
      style={{ width: size, height: size }}
      onClick={handleClick}
      onKeyUp={handleClick}
      type="button"
      className={`${disableClick ? "" : "cursor-pointer"} max-w-full max-h-full`}
    >
      <Radar data={data} options={options} />
    </button>
  );
};

export default CharacterTendencies;
