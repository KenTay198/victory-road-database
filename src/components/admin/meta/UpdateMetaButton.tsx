"use client";
import Button from "@components/ui/Buttons/Button";
import { useTranslations } from "next-intl";
import { calculateMetaAction } from "@/actions/meta.actions";
import { toast } from "sonner";
import ErrorHelper from "@utils/helpers/error.helpers";

const UpdateMetaButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  const t = useTranslations("");

  const handleClick = () => {
    toast.promise(calculateMetaAction(), {
      loading: t("components.admin.meta.update.toasts.loading"),
      success: t("components.admin.meta.update.toasts.success"),
      error: (e) => {
        const error = ErrorHelper.parse(e);
        return t(error.messageKey);
      },
    });
  };

  return (
    <Button {...props} onClick={handleClick} template="blue">
      {t("components.admin.meta.update.button")}
    </Button>
  );
};

export default UpdateMetaButton;
