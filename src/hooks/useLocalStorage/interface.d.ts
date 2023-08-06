export type Value = string | boolean | number;

export type UseLocalStorageRes<TData> = [
   value: TData,
   setValue: (newVal: TData) => void,
   clearLocalStiorage: () => void
];
