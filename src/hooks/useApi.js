import { useState } from "react";
import { toast } from "react-toastify";

// Corrected export statement
const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);
  const [errorStatus, setErronStatus] = useState(null);
  const [responseProblem, setResponseProblem] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setData(null);
    setIsError(false);
    setError(null);
    setErronStatus(null);
    setResponseProblem(null);

    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      // console.log(response);
      toast.error(response.data.erro);
      setIsError(true);
      setErronStatus(response.status);
      setResponseProblem(response.problem);
      setError(response.data.error);
      setData(null);
      return;
    }

    // console.log(response);
    toast.success(response.data.message);
    setIsError(false);
    setError(null);
    setData(response.data);
  };

  const reset = () => {
    setData(null);
    setIsError(false);
    setError(null);
    setErronStatus(null);
    setResponseProblem(null);
    setLoading(false);
  };

  return {
    isError,
    data,
    error,
    errorStatus,
    responseProblem,
    loading,
    request,
    reset,
  };
};

// Ensure that useApi is exported correctly
export default useApi;
