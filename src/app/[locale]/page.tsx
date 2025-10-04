import Button from "@components/ui/Buttons/Button";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("pages.home");

  return (
    <>
      <h1>{t("header")}</h1>
      <Button template="blue" link="/characters">
        {t("buttons.seeCharacters")}
      </Button>
    </>
  );
}
