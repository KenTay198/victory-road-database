import type IPagesTranslations from "./pages.translations";
import charactersPageFr from "./charactersPage/fr";
import errorPageFr from "./errorPage/fr";
import glossaryPageFr from "./glossaryPage/fr";
import homePageFr from "./homePage/fr";
import settingsPageFr from "./settingsPage/fr";
import hissatsusPageFr from "./hissatsusPage/fr";
import registerPageFr from "./registerPage/fr";
import loginPageFr from "./loginPage/fr";

const pagesFr: IPagesTranslations = {
  home: homePageFr,
  characters: charactersPageFr,
  error: errorPageFr,
  glossary: glossaryPageFr,
  settings: settingsPageFr,
  hissatsus: hissatsusPageFr,
  register: registerPageFr,
  login: loginPageFr,
};

export default pagesFr;
