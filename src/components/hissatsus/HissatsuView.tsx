import type React from "react";
import type { IHissatsu } from "@hissatsu/hissatsu.types";
import HissatsuPropertyFormatter from "./HissatsuPropertyFormatter";
import { useTranslations } from "next-intl";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  hissatsu: IHissatsu;
}

const HissatsuView = ({ className, hissatsu, ...props }: IProps) => {
  const t = useTranslations();
  const pageT = useTranslations("pages.hissatsus.hissatsu");
  const generalProperties: (keyof IHissatsu)[] = ["name", "element", "type", "power", "cost", "characteristic"];

  const getDisplayedValue = (key: keyof IHissatsu) => {
    const value = hissatsu[key];
    if (key === "element") {
      return t(`elements.${value}`);
    }
    if (key === "type") {
      return t(`hissatsu.types.${value}`);
    }
    if (key === "characteristic") {
      return value ? t(`hissatsu.characteristics.${value}`) : "-";
    }
    return value;
  };

  return (
    <div {...props} className={["space-y-4", className].join(" ")}>
      <section>
        <h2>{pageT("sections.general")}</h2>
        <div className="flex flex-wrap gap-8">
          <div className="space-y-2">
            {generalProperties.map((key) => (
              <div key={key} className="flex items-center gap-2">
                <strong>{t(`hissatsu.properties.${key}`)}:</strong>
                <span>
                  <HissatsuPropertyFormatter
                    property={key}
                    value={getDisplayedValue(key)}
                    asValue={key === "element" || key === "type" || key === "characteristic"}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {hissatsu.names && Object.keys(hissatsu.names).length > 0 && (
        <section>
          <h2>{pageT("sections.translations")}</h2>
          <div className="space-y-2">
            {Object.entries(hissatsu.names).map(([locale, name]) => (
              <div key={locale} className="flex items-center gap-2">
                <strong>{t(`common.locales.${locale}`)}:</strong>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HissatsuView;
