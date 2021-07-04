import { createContext } from "react";
import { Project } from "../types";

export const ProjectsContext = createContext<{
	refetchProjects: any;
	projects: Project[];
}>({
	refetchProjects: null,
	projects: [],
});
