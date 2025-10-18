import type IAdminComponentsTranslations from "./admin/admin.translations";
import type IAuthTranslations from "./auth/auth.translations";
import type ICharacterComponentsTranslations from "./character/character.translations";
import type IUiTranslations from "./ui/ui.translations";

interface IComponentsTranslations {
  ui: IUiTranslations;
  auth: IAuthTranslations;
  character: ICharacterComponentsTranslations;
  admin: IAdminComponentsTranslations;
}

export default IComponentsTranslations;
