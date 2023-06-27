export type Value = string | boolean | number;

export type UseLocalStorageRes<TData> = [
   value: TData,
   setValue: Dispatch<SetStateAction<TData>>
];
