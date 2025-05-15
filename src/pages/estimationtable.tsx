import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Pencil, Trash2 } from "lucide-react";
import { EstimationActions } from "@/features/estimation/estimationslice";
import { useNavigate } from "react-router-dom";

const EstimationTable = () => {
  const dispatch = useAppDispatch();
  const { fetchEstimations, deleteEstimation } = EstimationActions();

  const { items: estimations, status } = useAppSelector(
    (state) => state.estimation
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEstimations());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this estimation?")) {
      dispatch(deleteEstimation(id));
    }
  };
  const handleEdit = (id: number) => {
    navigate(`/estimation/edit/${id}`);
  };

  return (
    <div className="overflow-x-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/estimation/add")}
          className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-blue-700"
        >
          ➕ Add Estimation
        </button>
      </div>

      <table className="min-w-full bg-white shadow border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Section Name</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {estimations.map((estimation, index) => (
            <tr key={estimation.id} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 font-medium">
                {estimation.sections?.[0]?.sectionName || "-"}
              </td>
              <td className="px-4 py-2 space-x-2">
                <div className="flex items-center gap-3">
                  <Pencil
                    onClick={() => handleEdit(estimation.id)}
                    className="w-4 h-4 mr-1 cursor-pointer"
                  />

                  <Trash2
                    onClick={() => handleDelete(estimation.id)}
                    className="w-4 h-4 mr-1 cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
          {estimations.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                No estimations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EstimationTable;
