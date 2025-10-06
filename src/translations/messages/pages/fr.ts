import type IPagesTranslations from "./pages.translations";
import charactersPageFr from "./charactersPage/fr";
import errorPageFr from "./errorPage/fr";
import glossaryPageFr from "./glossaryPage/fr";
import homePageFr from "./homePage/fr";
import settingsPageFr from "./settingsPage/fr";
import hissatsusPageFr from "./hissatsusPage/fr";

const pagesFr: IPagesTranslations = {
  home: homePageFr,
  characters: charactersPageFr,
  error: errorPageFr,
  glossary: glossaryPageFr,
  settings: settingsPageFr,
  hissatsus: hissatsusPageFr,
};

export default pagesFr;
