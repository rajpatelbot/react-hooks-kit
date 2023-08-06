import { useCallback, useEffect, useState } from "react";
import { UseLocalStorageRes, Value } from "./interface";

/**
 * A hook that takes only key as an argument.
 * It returns a array of [value, setValue] with generic type.
 * The value will use to display data and setValue will use to update data.
 *
 * @example
 * const [counter, setCounter] = useLocalStorage("counter");
 * setCounter(counter + 1);
 * <p>{counter}</p>
 * @param key - Key means the name of localstorage data
 */

export function useLocalStorage<TData = Value>(
   key: string,
   defaultValue: TData
): UseLocalStorageRes<TData> {
   const initialCheck = useCallback(() => {
      const storedValues = localStorage.getItem(key);
      if (storedValues) {
         return JSON.parse(storedValues) || defaultValue;
      } else {
         return JSON.stringify(defaultValue);
      }
   }, [key, defaultValue]);

   const [value, setValue] = useState<TData>(initialCheck);

   useEffect(() => {
      const storedValues = localStorage.getItem(key);
      if (storedValues) {
         setValue(JSON.parse(storedValues));
      }
   }, [key]);

   useEffect(() => {
      if (value) {
         localStorage.setItem(key, JSON.stringify(value));
      }
   }, [key, value]);

   const clearLocalStorage = useCallback(() => {
      localStorage.removeItem(key);
   }, [key]);

   return [value, setValue, clearLocalStorage];
}
