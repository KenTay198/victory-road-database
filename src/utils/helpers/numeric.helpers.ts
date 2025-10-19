import ObjectHelpers from "./object.helpers";

const NumericHelpers = {
  getStatDescriptionsByProperties: function (
    datas: Record<string, any>[],
    properties: string[],
  ): Record<string, IStatisticDescriptions> {
    const statDescriptions: Record<string, IStatisticDescriptions> = {};

    for (const property of properties) {
      const values = datas.map((data) => ObjectHelpers.getNestedProperty(data, property));
      statDescriptions[property] = this.calculateStatsDescriptions(values);
    }
    return statDescriptions;
  },

  calculateStatsDescriptions: (data: number[]): IStatisticDescriptions => {
    const mean = data.reduce((acc, val) => acc + val, 0) / data.length;
    const overMeanValues = data.filter((val) => val > mean);
    const highMean = overMeanValues.reduce((acc, val) => acc + val, 0) / (overMeanValues.length || 1);
    const underMeanValues = data.filter((val) => val < mean);
    const lowMean = underMeanValues.reduce((acc, val) => acc + val, 0) / (underMeanValues.length || 1);
    return { mean, highMean, lowMean };
  },
};

export default NumericHelpers;

export interface IStatisticDescriptions {
  mean: number;
  highMean: number;
  lowMean: number;
}
