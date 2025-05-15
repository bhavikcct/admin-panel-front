import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProjectSlice } from "@/features/project/projectslice";
import { projectSchema, } from "@/validation/projectvalidationschema";
import { Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { debounce } from "lodash";
const ProjectPage = () => {
    const dispatch = useAppDispatch();
    const { items: projects } = useAppSelector((state) => state.project);
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const { fetchProjects, updateProject, createProject, deleteProject, getSingleProject, } = ProjectSlice();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm({ resolver: zodResolver(projectSchema) });
    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);
    const debouncedFetch = useCallback(debounce((searchValue) => {
        dispatch(fetchProjects(searchValue));
    }, 800), [dispatch]);
    useEffect(() => {
        if (search.trim() !== "") {
            debouncedFetch(search);
        }
        else {
            dispatch(fetchProjects());
        }
    }, [search, debouncedFetch, dispatch]);
    const onSubmit = async (data) => {
        if (editingProject) {
            await dispatch(updateProject(editingProject.id, data));
            toast.success("Project updated successfully");
        }
        else {
            await dispatch(createProject(data));
            toast.success("Project created successfully");
        }
        closeModal();
    };
    const handleDelete = async (id) => {
        await dispatch(deleteProject(id));
        toast.success("Project deleted successfully");
    };
    const openEditModal = async (project) => {
        const res = await dispatch(getSingleProject(project.id));
        if ("payload" in res && res.payload) {
            setEditingProject(res.payload);
            reset(res.payload);
            setModalOpen(true);
        }
    };
    const closeModal = () => {
        setModalOpen(false);
        setEditingProject(null);
        reset({ name: "", description: "" });
    };
    const Modal = () => createPortal(_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/30", children: _jsxs("div", { className: "bg-white p-6 rounded shadow w-full max-w-md", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: editingProject ? "Edit Project" : "Add Project" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { children: [_jsx("input", { placeholder: "Name", ...register("name"), className: "w-full border px-3 py-2 rounded" }), errors.name && (_jsx("p", { className: "text-red-500 text-sm", children: errors.name.message }))] }), _jsx("div", { children: _jsx("textarea", { placeholder: "Description", ...register("description"), className: "w-full border px-3 py-2 rounded" }) }), _jsxs("div", { className: "flex justify-end space-x-2", children: [_jsx("button", { type: "button", onClick: closeModal, className: "px-4 py-2 border rounded cursor-pointer", children: "Cancel" }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "px-4 py-2 bg-blue-600 text-white rounded cursor-pointer", children: isSubmitting
                                        ? "saving.."
                                        : editingProject
                                            ? "Update"
                                            : "Create" })] })] })] }) }), document.body);
    return (_jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("input", { placeholder: "Search projects...", className: "border px-4 py-2 rounded w-full max-w-sm", value: search, onChange: (e) => setSearch(e.target.value) }), _jsx("button", { onClick: () => {
                            setEditingProject(null);
                            reset({ name: "", description: "" });
                            setModalOpen(true);
                        }, className: "ml-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer", children: "Add Project" })] }), _jsxs("table", { className: "min-w-full border mt-4", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100 text-left", children: [_jsx("th", { className: "p-3 border", children: "Name" }), _jsx("th", { className: "p-3 border", children: "Description" }), _jsx("th", { className: "p-3 border", children: "Actions" })] }) }), _jsx("tbody", { children: projects.map((project) => (_jsxs("tr", { className: "border-t", children: [_jsx("td", { className: "p-3 border", children: project.name }), _jsx("td", { className: "p-3 border", children: project.description }), _jsx("td", { className: "p-3 border space-x-2", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Edit, { onClick: () => openEditModal(project), className: "text-blue-600 cursor-pointer" }), _jsx(Trash, { onClick: () => handleDelete(project.id), className: "text-red-600 cursor-pointer" })] }) })] }, project.id))) })] }), modalOpen && _jsx(Modal, {})] }));
};
export default ProjectPage;
