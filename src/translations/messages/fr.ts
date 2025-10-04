import type IMessagesTranslations from "./messages.translations";
import characterFr from "./character/fr";
import elementsFr from "./elements/fr";
import layoutFr from "./layout/fr";
import pagesFr from "./pages/fr";
import errorsFr from "./errors/fr";
import commonFr from "./common/fr";
import hissatsuFr from "./hissatsu/fr";

const messagesFr: IMessagesTranslations = {
  pages: pagesFr,
  layout: layoutFr,
  character: characterFr,
  elements: elementsFr,
  errors: errorsFr,
  common: commonFr,
  hissatsu: hissatsuFr,
};

export default messagesFr;
