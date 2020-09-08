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
        fetch(uri, options)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                setIsLoading(false);
            })
            .catch(() => setHasError(true));
    }, []);
    return { data, isLoading, hasError };
};

export default useFetch;
