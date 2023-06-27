import { useCopyToClipboard } from "./useCopyToClipboard";

function Demo() {
   const { copiedRes, copyToClipboard } = useCopyToClipboard();

   return (
      <>
         <h2>Copy to clipboard custom hook demo</h2>
         <div style={{ display: "flex" }}>
            <button onClick={() => copyToClipboard("B")}>B</button>
            <button onClick={() => copyToClipboard("C")}>C</button>
         </div>
         <p>Copied value: {copiedRes.value ?? "Nothing is copied yet!"}</p>
      </>
   );
}

export default Demo;
