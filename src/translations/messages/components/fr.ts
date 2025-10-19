import type IComponentsTranslations from "./components.translations";
import authFr from "./auth/fr";
import uiFr from "./ui/fr";
import characterComponentsFr from "./character/fr";
import hissatsuComponentsFr from "./hissatsu/fr";
import adminComponentsFr from "./admin/fr";

const componentsFr: IComponentsTranslations = {
  ui: uiFr,
  auth: authFr,
  character: characterComponentsFr,
  hissatsu: hissatsuComponentsFr,
  admin: adminComponentsFr,
};

export default componentsFr;
