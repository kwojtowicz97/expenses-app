import { useState, useEffect } from "react";

function usePostData() {
  const [response, setResponse] = useState(null);
  const [URL, setURL] = useState(null)
  const [data, setData] = useState(null);
  const [isLoaded, setisLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!data) return;
    const fetchData = async () => {
      setisLoaded(false);
      setIsError(false);
      try {
        const fetchedResponse = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const items = await fetchedResponse.json();
        setResponse(items);
      } catch (err) {
        console.log(err);
      }
      setisLoaded(true);
    };

    fetchData();
  }, [data]);

  return [response, isLoaded, isError, setData, setURL];
}

export default usePostData;
