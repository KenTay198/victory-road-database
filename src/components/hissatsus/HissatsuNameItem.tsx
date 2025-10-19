import type React from "react";
import ElementIcon from "@components/ui/ElementIcon";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import ColorsHelper from "@utils/helpers/colors.helpers";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  hissatsu: IHissatsu;
}

const HissatsuNameItem = ({ className, hissatsu, ...props }: IProps) => {
  const { value } = ColorsHelper.getTemplateColor(hissatsu.element);
  return (
    <div {...props} style={{ color: value }} className={["flex gap-4 items-center", className].join(" ")}>
      <ElementIcon element={hissatsu.element} />
      <span>
        {hissatsu.name} (Lv.{hissatsu.learnLevel ?? "?"})
      </span>
    </div>
  );
};

export default HissatsuNameItem;
