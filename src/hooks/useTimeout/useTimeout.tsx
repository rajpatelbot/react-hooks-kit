import React, { useEffect } from "react";

type Options = {
   delay: number;
};

/**
 * A hook that takes a callback and options argument.
 * It runs that callback once after given amount delay.
 *
 * @example
 * const 1_second = 1000;
 * useTimeout(() => {alert("this is timeout alert")}, {delay: 1_second});
 */

export default function useTimeout(
   callback: () => void,
   options: Options = { delay: 0 }
) {
   if (isNaN(options.delay))
      throw Error(
         "value provided for delay parameter is invalid. Only number is valid."
      );

   useEffect(() => {
      let timeout_id: NodeJS.Timeout;
      timeout_id = setTimeout(callback, options.delay);

      return () => {
         clearTimeout(timeout_id);
      };
   }, []);
}
