import { getCurrentUserAction } from "./auth.actions";
import { getSettingsAction } from "./settings.actions";

export async function getPageContext() {
  const user = await getCurrentUserAction();
  const settings = await getSettingsAction(user?.id);
  return { user, settings };
}
