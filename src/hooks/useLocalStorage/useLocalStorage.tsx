import { useEffect, useState } from "react";
import { UseLocalStorageRes, Value } from "./interface";

export function useLocalStorage<TData = Value>(
   key: string
): UseLocalStorageRes<TData> {
   const [value, setValue] = useState<TData>(() => {
      const storedValues = localStorage.getItem(key);
      return storedValues ? JSON.parse(storedValues) : null || [];
   });

   useEffect(() => {
      const storedValues = localStorage.getItem(key);
      if (storedValues) {
         setValue(JSON.parse(storedValues));
      }
   }, [key]);

   useEffect(() => {
      if (value) {
         localStorage.setItem(key, JSON.stringify(value));
      } else {
         localStorage.removeItem(key);
      }
   }, [key, value]);

   return [value, setValue];
}
