import { RadioGroup } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";

import { classNames } from "../../utils/tw";
import ButtonOutOfStock from "./ButtonOutOfStock";
import { AvailableType, Color, CurrentVariant } from "./types";

interface ColorOptionProps extends CurrentVariant {
  colors: Array<Color>;
}

interface AvailableColor extends AvailableType {
  selectedClass: string;
  class: string;
}

const colorVisual = {
  Black: { class: "bg-black", selectedClass: "ring-gray-400" },
  White: { class: "bg-white", selectedClass: "ring-gray-400" },
  Gray: { class: "bg-gray-400", selectedClass: "ring-gray-400" },
  "Translucent Blue": {
    class: "bg-cyan-500",
    selectedClass: "ring-gray-400",
  },
  "Translucent Green": {
    class: "bg-green-500",
    selectedClass: "ring-gray-400",
  },
  "Burnt Titanium": {
    class: "bg-burnt-titanium bg-cover",
    selectedClass: "ring-gray-400",
  },
  Rainbow: { class: "bg-rainbow bg-cover", selectedClass: "ring-gray-400" },
};

const ColorOptions: FC<ColorOptionProps> = ({
  colors,
  currentVariant,
  setCurrentVariant,
}) => {
  const [availableColors, setAvailableColors] = useState<AvailableColor[]>([]);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.name);

  const handleSelectedColorUpdate = (e: string | undefined) => {
    if (e) {
      setSelectedColor(e);
      setCurrentVariant({ ...currentVariant, color: e });
    }
  };

  useEffect(() => {
    const colorType: Array<AvailableColor> = [];

    if (currentVariant.material && colors) {
      for (const color of colors) {
        const demo = currentVariant.material;
        const showColor = color.materials.reduce(
          (acc, item) =>
            acc || (item.name == demo && item.inStock && color.inStock),
          false
        );
        colorType.push({
          inStock: showColor,
          name: color.name,
          ...colorVisual[color.name as keyof typeof colorVisual],
        });
      }

      setAvailableColors(colorType);
      handleSelectedColorUpdate(colorType[0]?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, currentVariant.material]);

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900">Color</h4>

      <RadioGroup
        value={selectedColor}
        onChange={handleSelectedColorUpdate}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only">
          {" "}
          Choose a color{" "}
        </RadioGroup.Label>
        <span className="flex items-center space-x-3">
          {availableColors &&
            availableColors.map((color) => (
              <Fragment key={color.name}>
                {color.inStock && (
                  <RadioGroup.Option
                    value={color.name}
                    disabled={!color.inStock}
                    className={({ active, checked }) =>
                      classNames(
                        color.selectedClass,
                        active && checked ? "ring ring-offset-1" : "",
                        !active && checked ? "ring-2" : "",
                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                      )
                    }
                  >
                    <RadioGroup.Label as="span" className="sr-only">
                      {" "}
                      {color.name}{" "}
                    </RadioGroup.Label>

                    <span
                      aria-hidden="true"
                      className={classNames(
                        color.class,
                        "h-8 w-8 rounded-full border border-black border-opacity-10"
                      )}
                    />
                  </RadioGroup.Option>
                )}

                {!color.inStock && (
                  <RadioGroup.Option
                    value={color.name}
                    disabled={!color.inStock}
                    className="relative -m-0.5 flex cursor-not-allowed items-center justify-center rounded-full  p-0.5 focus:outline-none"
                  >
                    <RadioGroup.Label as="span" className="sr-only">
                      {" "}
                      {color.name}{" "}
                    </RadioGroup.Label>

                    <span
                      aria-hidden="true"
                      className={classNames(
                        color.class,
                        "h-8 w-8 rounded-full border border-black border-opacity-10 opacity-40"
                      )}
                    />
                    <ButtonOutOfStock />
                  </RadioGroup.Option>
                )}
              </Fragment>
            ))}
        </span>
      </RadioGroup>
    </div>
  );
};

export default ColorOptions;
