import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { EstimationFormData } from "@/validation/estimationvalidtionschema";

interface SectionFieldProps {
  sectionIndex: number;
  sectionCount: number;
  control: Control<EstimationFormData>;
  register: UseFormRegister<EstimationFormData>;
  errors: FieldErrors<EstimationFormData>;
  removeSection: (index: number) => void;
}

const SectionField = ({
  sectionIndex,
  sectionCount,
  control,
  register,
  errors,
  removeSection,
}: SectionFieldProps) => {
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.items`,
  });

  return (
    <div className="border p-4 rounded space-y-4">
      <div className="flex justify-between items-center">
        <div className="w-full">
          <input
            {...register(`sections.${sectionIndex}.sectionName`)}
            placeholder="Section Name"
            className="w-full border p-2 rounded"
          />
          {errors.sections?.[sectionIndex]?.sectionName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.sections[sectionIndex].sectionName?.message}
            </p>
          )}
        </div>
        {sectionCount > 1 && (
          <button
            type="button"
            onClick={() => removeSection(sectionIndex)}
            className="ml-4 text-red-500 cursor-pointer"
          >
            ❌ Remove Section
          </button>
        )}
      </div>

      {itemFields.map((item, itemIndex) => (
        <div key={item.id} className="grid grid-cols-6 gap-2 items-end">
          <div>
            <input
              {...register(
                `sections.${sectionIndex}.items.${itemIndex}.title`
              )}
              placeholder="Title"
              className="border p-1 rounded w-full"
            />
            {errors.sections?.[sectionIndex]?.items?.[itemIndex]?.title && (
              <p className="text-red-500 text-xs">
                {errors.sections[sectionIndex].items[itemIndex].title?.message}
              </p>
            )}
          </div>

          <input
            {...register(
              `sections.${sectionIndex}.items.${itemIndex}.description`
            )}
            placeholder="Description"
            className="border p-1 rounded"
          />

          <div>
            <input
              {...register(
                `sections.${sectionIndex}.items.${itemIndex}.unit`
              )}
              placeholder="Unit"
              className="border p-1 rounded w-full"
            />
            {errors.sections?.[sectionIndex]?.items?.[itemIndex]?.unit && (
              <p className="text-red-500 text-xs">
                {errors.sections[sectionIndex].items[itemIndex].unit?.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              {...register(
                `sections.${sectionIndex}.items.${itemIndex}.quantity`,
                { valueAsNumber: true }
              )}
              placeholder="Qty"
              className="border p-1 rounded w-full"
            />
            {errors.sections?.[sectionIndex]?.items?.[itemIndex]?.quantity && (
              <p className="text-red-500 text-xs">
                {errors.sections[sectionIndex].items[itemIndex].quantity?.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              {...register(
                `sections.${sectionIndex}.items.${itemIndex}.price`,
                { valueAsNumber: true }
              )}
              placeholder="Price"
              className="border p-1 rounded w-full"
            />
            {errors.sections?.[sectionIndex]?.items?.[itemIndex]?.price && (
              <p className="text-red-500 text-xs">
                {errors.sections[sectionIndex].items[itemIndex].price?.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <input
              type="number"
              {...register(
                `sections.${sectionIndex}.items.${itemIndex}.margin`,
                { valueAsNumber: true }
              )}
              placeholder="Margin %"
              className="border p-1 rounded w-20"
            />
            {itemFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(itemIndex)}
                className="text-red-500 cursor-pointer"
              >
                ✖
              </button>
            )}
          </div>
          {errors.sections?.[sectionIndex]?.items?.[itemIndex]?.margin && (
            <p className="text-red-500 text-xs col-span-6">
              {errors.sections[sectionIndex].items[itemIndex].margin?.message}
            </p>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          appendItem({
            title: "",
            description: "",
            unit: "",
            quantity: 0,
            price: 0,
            margin: 0,
          })
        }
        className="text-sm bg-gray-200 px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
      >
        ➕ Add Item
      </button>
    </div>
  );
};

export default SectionField;
