import { RadioGroup } from "@headlessui/react";
import { FC, useEffect, useState } from "react";
import { classNames } from "../../utils/tw";
import ButtonOutOfStock from "./ButtonOutOfStock";
import { AvailableType, CurrentVariant, Material } from "./types";

interface PrintOptionProps extends CurrentVariant {
  materials: Array<Material>;
}

const PrintOptions: FC<PrintOptionProps> = ({
  materials,
  currentVariant,
  setCurrentVariant,
}) => {
  const [availableTypes, setAvailableTypes] = useState<AvailableType[]>([]);
  const [selectedType, setSelectedType] = useState(materials[0]?.name);

  useEffect(() => {
    // const printType = materials.map((material) => {
    //   return { inStock: true, name: material.name };
    // });
    setAvailableTypes(materials);
  }, [materials, currentVariant.material]);

  const handleSelectedTypeUpdate = (e: string) => {
    setSelectedType(e);
    setCurrentVariant({ ...currentVariant, material: e });
  };

  // useEffect(() => {
  //   setCurrentVariant({ ...currentVariant, material: materials[0]?.name });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900">Print Type</h4>
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          What do they mean?
        </a>
      </div>

      <RadioGroup
        value={selectedType}
        onChange={handleSelectedTypeUpdate}
        className="mt-4"
      >
        <RadioGroup.Label className="sr-only"> Choose a type </RadioGroup.Label>
        <div className="grid grid-cols-4 gap-4">
          {availableTypes &&
            availableTypes.map((size) => (
              <RadioGroup.Option
                key={size.name}
                value={size.name}
                disabled={!size.inStock}
                className={({ active }) =>
                  classNames(
                    size.inStock
                      ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                      : "cursor-not-allowed bg-gray-50 text-gray-200",
                    active ? "ring-2 ring-indigo-500" : "",
                    "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                    {size.inStock ? (
                      <span
                        className={classNames(
                          active ? "border" : "border-2",
                          checked ? "border-indigo-500" : "border-transparent",
                          "pointer-events-none absolute -inset-px rounded-md"
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      <ButtonOutOfStock />
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default PrintOptions;
