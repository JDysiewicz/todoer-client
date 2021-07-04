import { createContext } from "react";

export const RefetchTodosContext = createContext<() => Promise<void>>(
	() => new Promise((resolve, reject) => resolve())
);
