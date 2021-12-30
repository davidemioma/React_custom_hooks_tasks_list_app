import { useState, useCallback } from "react";

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requesctConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requesctConfig.url, {
        method: requesctConfig.method ? requesctConfig.method : "GET",
        headers: requesctConfig.headers ? requesctConfig.headers : {},
        body: requesctConfig.body ? JSON.stringify(requesctConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      console.log(data);

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
}

export default useHttp;
