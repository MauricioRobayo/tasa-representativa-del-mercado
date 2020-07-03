import { useState, useEffect } from 'react';

function useApi() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setData] = useState([]);

  useEffect(() => {
    const url = 'https://www.datos.gov.co/resource/32sa-8pi3.json?$limit=30';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data
          .reduce((acc, e, i) => {
            const startDate = new Date(e.vigenciadesde);
            const endDate = new Date(e.vigenciahasta);
            while (endDate >= startDate) {
              acc.push({
                value: e.valor,
                date: endDate.toISOString(),
              });

              endDate.setDate(endDate.getDate() - 1);
            }
            return acc;
          }, [])
          .map((e, i, arr) => {
            if (i + 1 < arr.length) {
              e.change = e.value - arr[i + 1].value;
              e.percChange = e.change / e.value;
            }
            return e;
          });
        setData(transformedData);
        setIsLoading(false);
      });
  }, []);
  return {
    isLoading,
    state,
  };
}

export default useApi;
