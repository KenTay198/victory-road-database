import Button from "@atoms/Button";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { useLoadingState } from "@context/LoadingContext";
import React from "react";
import { toast } from "sonner";

export interface IBarFunction {
  label: string;
  action: (ids: string[]) => void;
}

interface IProps {
  ids: string[];
  deleteMultiple: (ids: string[]) => Promise<void>;
  otherFunctions?: IBarFunction[];
  itemName?: string;
}

function FunctionBar({
  deleteMultiple,
  otherFunctions,
  ids,
  itemName,
}: IProps) {
  const { showConfirm } = useConfirmModalState();
  const { setIsLoading } = useLoadingState();

  const handleDeleteMultiple = () => {
    const nb = ids.length;
    const name = `${itemName}${nb > 1 ? "s" : ""}`;
    showConfirm(
      "Delete a " + itemName,
      `Do you really want to delete ${nb} ${name} ?`,
      async () => {
        setIsLoading(true);
        try {
          await deleteMultiple(ids);
          toast.success(`${nb} ${name} has been deleted`);
        } catch (error) {
          console.log(error);
          toast.error(`An error has occured while deleting the ${name}`);
        }
        setIsLoading(false);
      },
      { width: 600 }
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-raimon-yellow">
      <div className="flex gap-2 items-center p-2">
        <Button color="blue" onClick={handleDeleteMultiple}>
          Delete multiple
        </Button>
        {otherFunctions &&
          otherFunctions.map(({ label, action }) => (
            <Button
              key={`function-bar-action-${label}`}
              color="blue"
              onClick={() => action(ids)}
            >
              {label}
            </Button>
          ))}
      </div>
    </div>
  );
}

export default FunctionBar;
