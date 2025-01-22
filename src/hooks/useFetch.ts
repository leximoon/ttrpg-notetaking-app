"use client";
import { FetchOptions } from "@/types/fetch";
import { useCallback, useState } from "react";

//hook to use the fetching library for api calls
export function useFetch() {
    //data retrieved from the calls
    const [data, setData] = useState(null);
    //if the api call fails, the error will be save here
    const [error, setError] = useState<Error | null>(null);
    //bool to check if the api is still happening
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const proxyUrl = "/api/proxy";

    //function to fetch data from api call
    const fetchData = useCallback(
        async (url: string, options: FetchOptions = {}) => {
            setIsLoading(true);
            setError(null);

            try {
                //deconstruct custom options from args
                const { baseUrl, ...fetchOptions } = options;
                const fullUrl = baseUrl
                    ? `${baseUrl}${url}`
                    : `${proxyUrl}${url}`;
                // call to the proxy url

                const response = await fetch(fullUrl, {
                    headers: { "Content-Type": "application/json" },
                    method: fetchOptions.method,
                    body: fetchOptions.body
                        ? JSON.stringify(fetchOptions.body)
                        : undefined,
                });
                console.log(response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                //if the call is done correctly, wee fill the data and chante loading state
                const result = await response.json();

                setData(result);
                setIsLoading(false);

                //return for the callback when using .then
                return { data: result, error: null, status: response.status };
            } catch (err) {
                //If error is catched we set the error and change loading state.
                //If err is not given or is not an error, we instance a new unknown error
                setError(
                    err instanceof Error
                        ? err
                        : new Error("An unkown error ocurred")
                );
                setIsLoading(false);

                //return for the callback when using .then
                //TODO: define status error codes??
                return {
                    data: null,
                    error:
                        err instanceof Error
                            ? err
                            : new Error("An unknown error occurred"),
                    status: 0,
                };
            }
        },
        []
    );

    return { data, error, isLoading, fetch: fetchData };
}
