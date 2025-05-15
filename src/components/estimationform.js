import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { estimationSchema, } from "@/validation/estimationvalidtionschema";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { EstimationActions } from "@/features/estimation/estimationslice";
import { toast } from "react-toastify";
import SectionField from "./sectionfield";
const EstimationForm = ({ editMode = false, estimationId, defaultValues, onSuccess, }) => {
    const dispatch = useAppDispatch();
    const { createEstimation, updateEstimation } = EstimationActions();
    const { register, control, handleSubmit, reset, watch, formState: { errors, isSubmitting }, } = useForm({
        resolver: zodResolver(estimationSchema),
        defaultValues: defaultValues || {
            sections: [
                {
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
        return (sum +
            section.items.reduce((sectionSum, item) => {
                const base = item.quantity * item.price;
                const margin = (base * item.margin) / 100;
                return sectionSum + base + margin;
            }, 0));
    }, 0);
    const totalMargin = values?.sections?.reduce((sum, section) => {
        return (sum +
            section.items.reduce((sectionSum, item) => {
                const base = item.quantity * item.price;
                return sectionSum + (base * item.margin) / 100;
            }, 0));
    }, 0);
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);
    const onSubmit = async (data) => {
        try {
            if (editMode && estimationId) {
                await dispatch(updateEstimation(estimationId, data));
                toast.success("Estimation updated successfully");
            }
            else {
                await dispatch(createEstimation(data));
                toast.success("Estimation created successfully");
            }
            onSuccess?.();
        }
        catch (error) {
            toast.error("Something went wrong");
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [fields.map((field, index) => (_jsx(SectionField, { sectionIndex: index, control: control, register: register, errors: errors, removeSection: remove, sectionCount: fields.length }, field.id))), _jsx("button", { type: "button", onClick: () => append({
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
                }), className: "bg-green-600 text-white px-4 py-2 rounded cursor-pointer", children: "\u2795 Add Section" }), _jsxs("div", { className: "mt-4 font-semibold", children: [_jsxs("p", { children: ["Total Margin: \u20B9", totalMargin?.toFixed(2)] }), _jsxs("p", { children: ["Total Cost: \u20B9", totalCost?.toFixed(2)] })] }), _jsx("button", { type: "submit", className: "bg-blue-600 text-white px-4 py-2 rounded mt-2 cursor-pointer hover:bg-blue-700", children: isSubmitting
                    ? "submitting..."
                    : editMode
                        ? "✏️ Update Estimation"
                        : "💾 Submit Estimation" })] }));
};
export default EstimationForm;
