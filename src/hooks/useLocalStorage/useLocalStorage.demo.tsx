import { useLocalStorage } from "./useLocalStorage";

interface Employee {
   name: string;
   pass: string;
}

export const UseLocalStorageDemo = () => {
   const [employee, setEmployee] = useLocalStorage<Employee[]>("employees");

   const handleIncr = () => {
      const newEmp = { name: "Raj", pass: "123" };
      setEmployee((prevEmployee: Employee[]) => [...prevEmployee, newEmp]);
   };

   const handleDecr = () => {
      // setEmployee(counter - 1);
   };

   return (
      <div>
         <h2>LocalStorage custom hook</h2>
         <p>{JSON.stringify(employee)}</p>
         <button onClick={handleIncr}>Increment</button>
         <button onClick={handleDecr}>Decrement</button>
      </div>
   );
};
