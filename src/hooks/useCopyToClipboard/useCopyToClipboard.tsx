import React, { useState } from "react";
import {
   CopyToClipboardInterface,
   copiedValueInterface,
   textType,
} from "./interface";

export default function useCopyToClipboard(): CopyToClipboardInterface {
   const allowedType = ["string", "number"];

   const [copiedRes, setCopiedRes] = useState<copiedValueInterface>({
      value: null,
      error: null,
      message: "",
   });

   const copyToClipboard = async (text: textType) => {
      try {
         if (!text) {
            return setCopiedRes({
               ...copiedRes,
               message: "Cannot copy empty string to clipboard",
            });
         }

         if (!allowedType.includes(typeof text)) {
            return setCopiedRes({
               ...copiedRes,
               message: `Cannot copy typeof ${typeof text} to clipboard, It must be string or number`,
            });
         }

         await navigator.clipboard.writeText(String(text));

         setCopiedRes({
            value: text,
            error: null,
            message: "Copied to clipboard!",
         });
      } catch (error) {
         setCopiedRes({ message: "", value: null, error: error as Error });
      }
   };

   return { copiedRes, copyToClipboard };
}
