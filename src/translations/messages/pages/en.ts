import type IPagesTranslations from "./pages.translations";
import charactersPageEn from "./charactersPage/en";
import errorPageEn from "./errorPage/en";
import glossaryPageEn from "./glossaryPage/en";
import homePageEn from "./homePage/en";
import settingsPageEn from "./settingsPage/en";
import hissatsusPageEn from "./hissatsusPage/en";

const pagesEn: IPagesTranslations = {
  home: homePageEn,
  characters: charactersPageEn,
  error: errorPageEn,
  glossary: glossaryPageEn,
  settings: settingsPageEn,
  hissatsus: hissatsusPageEn,
};

export default pagesEn;
