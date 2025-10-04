import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";

interface IErrorPageTranslations extends Omit<IDefaultPageTranslations, "metadata"> {
  // Ajoutez vos types de traduction ici
}

export default IErrorPageTranslations;
