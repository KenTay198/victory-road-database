import type IMessagesTranslations from "./messages.translations";
import characterEn from "./character/en";
import elementsEn from "./elements/en";
import errorsEn from "./errors/en";
import layoutEn from "./layout/en";
import pagesEn from "./pages/en";
import commonEn from "./common/en";
import hissatsuEn from "./hissatsu/en";
import componentsEn from "./components/en";
import userEn from "./user/en";

const messagesEn: IMessagesTranslations = {
  pages: pagesEn,
  layout: layoutEn,
  character: characterEn,
  elements: elementsEn,
  errors: errorsEn,
  common: commonEn,
  hissatsu: hissatsuEn,
  components: componentsEn,
  user: userEn,
};

export default messagesEn;
