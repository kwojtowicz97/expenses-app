import { useState, useEffect } from "react";

function useFetchData(initialUrl: string) {
  const [response, setResponse] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [isLoaded, setisLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("refechted useFetchData")
    const fetchData = async () => {
      setisLoaded(false);
      setIsError(false);
      try {
        const fetchedResponse = await fetch(initialUrl);
        const items = await fetchedResponse.json();
        setResponse(items);
      } catch (err) {
        console.log(err);
      }
      setisLoaded(true);
    };

    fetchData();
  }, [refresh]);

  return [response, isLoaded, isError, setRefresh,]
}

export default useFetchData;
