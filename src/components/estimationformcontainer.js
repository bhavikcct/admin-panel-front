import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EstimationActions } from "@/features/estimation/estimationslice";
import { toast } from "react-toastify";
import EstimationForm from "./estimationform";
const EstimationFormContainer = () => {
    const { id } = useParams();
    const [defaultValues, setDefaultValues] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getSingleEstimation } = EstimationActions();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id)
            return;
        const fetchEstimation = async () => {
            if (id) {
                try {
                    setLoading(true);
                    const data = await getSingleEstimation(Number(id))();
                    setDefaultValues({ sections: data?.payload?.sections || [] });
                }
                catch (err) {
                    toast.error("Failed to load estimation");
                    navigate("/estimation");
                }
                finally {
                    setLoading(false);
                }
            }
            else {
                setLoading(false);
            }
        };
        fetchEstimation();
    }, [id]);
    if (loading)
        return _jsx("p", { children: "Loading..." });
    return (_jsx(EstimationForm, { editMode: !!id, estimationId: id ? Number(id) : undefined, defaultValues: defaultValues ?? undefined, onSuccess: () => navigate("/estimation") }));
};
export default EstimationFormContainer;
