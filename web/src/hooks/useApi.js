import { useState } from "react";
import axiosInstance from "../utils/axiosUtils";
import { useSnackbar } from "../components/SnackbarContext";

const useApi = (endpoint, method = "get") => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const { showSuccess, showError } = useSnackbar();

    // Validate endpoint and method
    if (!endpoint || typeof endpoint !== "string") {
        throw new Error("Invalid or missing endpoint");
    }

    const validMethods = ["get", "post", "put", "delete", "patch"];
    if (!validMethods.includes(method.toLowerCase())) {
        throw new Error("Invalid or missing method");
    }

    const callApi = async (payload) => {
        setLoading(true);
        try {
            const response = await axiosInstance[method](endpoint, payload);
            setData(response.data);
            showSuccess("Request successful");
        } catch (error) {
            console.error(`API call error: ${error.message}`);
            showError(`API call error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, callApi };
};

export default useApi;