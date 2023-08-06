import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { UseFetchResponse } from "./interface";

/**
 * A hook is used to fetch data from server without writing custom fetch logic.
 * If the component is unmounted and the request is still in pending then this will cancel automatically.
 *
 * @example
 * const { data, isLoading, error, fetchData } = useFetch();
 * fetchData(URL, Headers);
 *
 * @returns
 * Data: The response fetched from server.
 * isLoading: True/False to show loading state in UI while fetching data.
 * error: If data fetching will failed then this will tells the reason.
 * fetchData: This is the function to fetch data with 1 or 2 arg. One argument is URL and 2nd argument is Headers.
 */

export function useFetch<TData = unknown>(): UseFetchResponse<TData> {
   const [data, setData] = useState<TData | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<Error | null>(null);
   const [abortReq, setAbortReq] = useState<AbortController | null>(null);

   useEffect(() => {
      return () => {
         if (abortReq) abortReq.abort();
      };
   }, [abortReq]);

   const fetchData = async (url: string, headers?: Record<string, string>) => {
      setIsLoading(true);

      try {
         const abortController = new AbortController();
         setAbortReq(abortController);

         const signal = abortController.signal;
         const response: AxiosResponse<TData> = await axios.get(url, {
            headers,
            signal,
         });

         const data = response.data;
         setData(data);
      } catch (error) {
         setError(error as Error);
      } finally {
         setIsLoading(false);
      }
   };

   return { data, isLoading, error, fetchData };
}
