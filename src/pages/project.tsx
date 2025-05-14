import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { Project, ProjectSlice } from "@/features/project/projectslice";
import {
  ProjectFormData,
  projectSchema,
} from "@/validation/projectvalidationschema";
import { Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { debounce } from "lodash";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const { items: projects } = useAppSelector(
    (state: RootState) => state.project
  );
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const {
    fetchProjects,
    updateProject,
    createProject,
    deleteProject,
    getSingleProject,
  } = ProjectSlice();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({ resolver: zodResolver(projectSchema) });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const debouncedFetch = useCallback(
    debounce((searchValue: string) => {
      dispatch(fetchProjects(searchValue));
    }, 800),
    [dispatch]
  );

  useEffect(() => {
    if (search.trim() !== "") {
      debouncedFetch(search);
    } else {
      dispatch(fetchProjects());
    }
  }, [search, debouncedFetch, dispatch]);

  const onSubmit = async (data: ProjectFormData) => {
    if (editingProject) {
      await dispatch(updateProject(editingProject.id, data));
      toast.success("Project updated successfully");
    } else {
      await dispatch(createProject(data));
      toast.success("Project created successfully");
    }
    closeModal();
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteProject(id));
    toast.success("Project deleted successfully");
  };

  const openEditModal = async (project: Project) => {
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

  const Modal = () =>
    createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white p-6 rounded shadow w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">
            {editingProject ? "Edit Project" : "Add Project"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                placeholder="Name"
                {...register("name")}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Description"
                {...register("description")}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                {isSubmitting
                  ? "saving.."
                  : editingProject
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <input
          placeholder="Search projects..."
          className="border px-4 py-2 rounded w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => {
            setEditingProject(null);
            reset({ name: "", description: "" });
            setModalOpen(true);
          }}
          className="ml-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Add Project
        </button>
      </div>

      <table className="min-w-full border mt-4">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t">
              <td className="p-3 border">{project.name}</td>
              <td className="p-3 border">{project.description}</td>
              <td className="p-3 border space-x-2">
                <div className="flex items-center space-x-2">
                  <Edit
                    onClick={() => openEditModal(project)}
                    className="text-blue-600 cursor-pointer"
                  />
                  <Trash
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && <Modal />}
    </div>
  );
};

export default ProjectPage;
