import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  estimationSchema,
  EstimationFormData,
} from "@/validation/estimationvalidtionschema";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { EstimationActions } from "@/features/estimation/estimationslice";
import { toast } from "react-toastify";
import SectionField from "./sectionfield";

interface EstimationFormProps {
  editMode?: boolean;
  estimationId?: number;
  defaultValues?: EstimationFormData;
  onSuccess?: () => void;
}

const EstimationForm = ({
  editMode = false,
  estimationId,
  defaultValues,
  onSuccess,
}: EstimationFormProps) => {
  const dispatch = useAppDispatch();
  const { createEstimation, updateEstimation } = EstimationActions();

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EstimationFormData>({
    resolver: zodResolver(estimationSchema),
    defaultValues: defaultValues || {
      sections: [
        {
          sectionName: "",
          items: [
            {
              title: "",
              description: "" , 
              unit: "",
              quantity: 0,
              price: 0,
              margin: 0,
            },
          ],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const values = watch();

  const totalCost = values?.sections?.reduce((sum, section) => {
    return (
      sum +
      section.items.reduce((sectionSum, item) => {
        const base = item.quantity * item.price;
        const margin = (base * item.margin) / 100;
        return sectionSum + base + margin;
      }, 0)
    );
  }, 0);

  const totalMargin = values?.sections?.reduce((sum, section) => {
    return (
      sum +
      section.items.reduce((sectionSum, item) => {
        const base = item.quantity * item.price;
        return sectionSum + (base * item.margin) / 100;
      }, 0)
    );
  }, 0);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const onSubmit = async (data: EstimationFormData) => {
    try {
      if (editMode && estimationId) {
        await dispatch(updateEstimation(estimationId, data));
        toast.success("Estimation updated successfully");
      } else {
        await dispatch(createEstimation(data));
        toast.success("Estimation created successfully");
      }
      onSuccess?.();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => (
        <SectionField
          key={field.id}
          sectionIndex={index}
          control={control}
          register={register}
          errors={errors}
          removeSection={remove}
          sectionCount={fields.length}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            sectionName: "",
            items: [
              {
                title: "",
                description: "",
                unit: "",
                quantity: 0,
                price: 0,
                margin: 0,
              },
            ],
          })
        }
        className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
      >
        ➕ Add Section
      </button>

      <div className="mt-4 font-semibold">
        <p>Total Margin: ₹{totalMargin?.toFixed(2)}</p>
        <p>Total Cost: ₹{totalCost?.toFixed(2)}</p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-700"
      >
        {isSubmitting
          ? "submitting..."
          : editMode
          ? "✏️ Update Estimation"
          : "💾 Submit Estimation"}
      </button>
    </form>
  );
};

export default EstimationForm;
