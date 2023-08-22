import React, { useEffect } from "react";

type Options = {
   delay: number;
};

/**
 * A hook that takes a callback and options argument.
 * It runs that callback once every after given amount delay.
 *
 * @example
 * const 1_second = 1000;
 * useInterval(() => {console.log("this is console logging by useInterval.")}, {delay: 1_second});
 */

export default function useInterval(
   callback: () => void,
   options: Options = { delay: 0 }
) {
   if (isNaN(options.delay))
      throw Error(
         "value provided for delay parameter is invalid. Only number is valid."
      );

   useEffect(() => {
      let interval_id: NodeJS.Timer;
      interval_id = setInterval(callback, options.delay);

      return () => {
         clearInterval(interval_id);
      };
   }, []);
}
