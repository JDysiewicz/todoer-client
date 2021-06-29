import { createContext } from "react";

export const RefetchProjectContext = createContext<() => Promise<void>>(
	() => new Promise((resolve, reject) => resolve())
);
