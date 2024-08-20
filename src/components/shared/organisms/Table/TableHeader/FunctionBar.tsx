import Button from "@atoms/Button";
import React from "react";

export interface IBarFunction {
  label: string;
  action: (ids: string[]) => void;
}

interface IProps {
  ids: string[];
  deleteMultiple: () => void;
  otherFunctions?: IBarFunction[];
}

function FunctionBar({ deleteMultiple, otherFunctions, ids }: IProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-raimon-yellow">
      <div className="flex gap-2 items-center p-2">
        <Button color="blue" onClick={deleteMultiple}>
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
