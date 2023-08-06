import { useLocalStorage } from "./useLocalStorage";

interface Employee {
   name: string;
   pass: string;
}

export const UseLocalStorageDemo = () => {
   const [employee, setEmployee, clearLocalStorage] = useLocalStorage<
      Employee[]
   >("employees", null);

   const handleIncr = () => {
      const newEmp: Employee = { name: "Shiv", pass: "123" };
      setEmployee([...employee, newEmp]);
      // setEmployee(newEmp);
   };

   const handleDecr = () => {
      clearLocalStorage();
      // setEmployee([]);

      // setEmployee(counter - 1);
      // setEmployee(employee.slice(0, employee.length - 1));
      // const newEmp = employee.filter((emp) => emp.name !== "Patel");
      // setEmployee(newEmp);
   };

   return (
      <div>
         <h2>LocalStorage custom hook</h2>
         <p>{JSON.stringify(employee) ?? null}</p>
         <button onClick={handleIncr}>Increment</button>
         <button onClick={handleDecr}>Decrement</button>
      </div>
   );
};
