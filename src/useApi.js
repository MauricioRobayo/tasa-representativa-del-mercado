import { useEffect, useState } from "react";
import TrmApi from "trm-api";

function useApi() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const trmapi = new TrmApi();
    trmapi.history({ limit: 30, order: "DESC" }).then((data) => {
      setData(
        data.map((e, i, arr) => {
          const transformedData = {
            value: e.valor,
            date: new Date(e.vigenciadesde).toISOString(),
            endDate: new Date(e.vigenciahasta).toISOString(),
          };
          if (i + 1 < arr.length) {
            transformedData.change = e.valor - arr[i + 1].valor;
            transformedData.percChange = transformedData.change / e.valor;
          }
          return transformedData;
        })
      );
      setIsLoading(false);
    });
  }, []);
  return {
    isLoading,
    data,
  };
}

export default useApi;
