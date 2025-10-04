import type ICharacterTranslations from "./character/character.translations";
import type ICommonTranslations from "./common/common.translations";
import type IElementsTranslations from "./elements/elements.translations";
import type IErrorsTranslations from "./errors/errors.translations";
import type IHissatsuTranslations from "./hissatsu/hissatsu.translations";
import type ILayoutTranslations from "./layout/layout.translations";
import type IPagesTranslations from "./pages/pages.translations";

interface IMessagesTranslations {
  pages: IPagesTranslations;
  layout: ILayoutTranslations;
  character: ICharacterTranslations;
  elements: IElementsTranslations;
  errors: IErrorsTranslations;
  common: ICommonTranslations;
  hissatsu: IHissatsuTranslations;
}

export default IMessagesTranslations;
