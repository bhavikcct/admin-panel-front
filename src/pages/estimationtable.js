import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Pencil, Trash2 } from "lucide-react";
import { EstimationActions } from "@/features/estimation/estimationslice";
import { useNavigate } from "react-router-dom";
const EstimationTable = () => {
    const dispatch = useAppDispatch();
    const { fetchEstimations, deleteEstimation } = EstimationActions();
    const { items: estimations, status } = useAppSelector((state) => state.estimation);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchEstimations());
    }, [dispatch]);
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this estimation?")) {
            dispatch(deleteEstimation(id));
        }
    };
    const handleEdit = (id) => {
        navigate(`/estimation/edit/${id}`);
    };
    return (_jsxs("div", { className: "overflow-x-auto mt-6", children: [_jsx("div", { className: "flex justify-between items-center mb-4", children: _jsx("button", { onClick: () => navigate("/estimation/add"), className: "bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-700", children: "\u2795 Add Estimation" }) }), _jsxs("table", { className: "min-w-full bg-white shadow border rounded", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 text-left", children: "#" }), _jsx("th", { className: "px-4 py-2 text-left", children: "Section Name" }), _jsx("th", { className: "px-4 py-2 text-left", children: "Actions" })] }) }), _jsxs("tbody", { children: [estimations.map((estimation, index) => (_jsxs("tr", { className: "border-b", children: [_jsx("td", { className: "px-4 py-2", children: index + 1 }), _jsx("td", { className: "px-4 py-2 font-medium", children: estimation.sections?.[0]?.sectionName || "-" }), _jsx("td", { className: "px-4 py-2 space-x-2", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Pencil, { onClick: () => handleEdit(estimation.id), className: "w-4 h-4 mr-1 cursor-pointer" }), _jsx(Trash2, { onClick: () => handleDelete(estimation.id), className: "w-4 h-4 mr-1 cursor-pointer" })] }) })] }, estimation.id))), estimations.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 3, className: "px-4 py-6 text-center text-gray-500", children: "No estimations found." }) }))] })] })] }));
};
export default EstimationTable;
