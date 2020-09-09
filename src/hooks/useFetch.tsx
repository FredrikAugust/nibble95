import { useState, useEffect } from 'react';

type FetchType = {
  data: any
  isLoading: boolean
  hasError: boolean
}

const useFetch = (uri: string, options = {}): FetchType => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const doFetch = async () => {
            const response = await fetch(uri, options);
            if (response.ok) {
                const json = await response.json();
                setData(json);
                setIsLoading(false);
            } else {
                setHasError(true);
            }
        };
        doFetch();
    }, []);
    return { data, isLoading, hasError };
};

export default useFetch;
