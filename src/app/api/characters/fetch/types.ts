export interface ICategoryQueryMember {
  pageid: string;
  ns: number;
  title: string;
}

export interface ICategoryQueryResult {
  batchcomplete: "";
  continue?: {
    cmcontinue: string;
    contine: string;
  };
  warnings?: {
    categorymembers?: {
      "*": string;
    };
  };
  query: {
    categorymembers: ICategoryQueryMember[];
  };
}

export interface IMemberQueryResult {
  batchcomplete: "";
  query: {
    pages: {
      [pageid: string]: {
        pageid: string;
        ns: number;
        title: string;
        revisions: {
          slots: {
            main: {
              contentmodel: string;
              contentformat: string;
              "*": string;
            };
          };
        }[];
      };
    };
  };
}

export type QueryCharacterElement = "moutain" | "wind" | "forest" | "fire";
