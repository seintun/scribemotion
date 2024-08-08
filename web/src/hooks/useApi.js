import { useState } from "react";
import axiosInstance from "../utils/axiosUtils";
import { useSnackbar } from "../components/SnackbarContext";

/** 
 * @description Custom hook to call an API endpoint.
 * @param {string} endpoint - The API endpoint to call.
 * @param {string} method - The HTTP method to use. `["get", "post", "put", "delete", "patch"]`
 * @returns {object} An object containing the loading state, data, and a function to call the API.
 */
const useApi = (endpoint, method = "get") => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(false);
    const { showSuccess, showError } = useSnackbar();

    // Validate endpoint and method
    if (!endpoint || typeof endpoint !== "string") {
        throw new Error("Invalid or missing endpoint");
    }

    const validMethods = ["get", "post", "put", "delete", "patch"];
    if (!validMethods.includes(method.toLowerCase())) {
        throw new Error("Invalid or missing method");
    }

    const fetchData = async (payload) => {
        setLoading(true);
        setSuccess(false);
        try {
            const response = await axiosInstance[method](endpoint, payload);
            setData(response.data);
            setSuccess(true);
            showSuccess("Successful API call");
        } catch (error) {
            console.error(`API call error: ${error.message}`);
            showError(`API call error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, success, fetchData };
};

export default useApi;