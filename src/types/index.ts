export interface User {
	email: string;
	id: number;
	name: string;
	role: string;
	projects: Project[];
	todos: Todo[];
}

export interface Project {
	name: string;
	order: number;
	id: number;
	user: User;
	todos: Todo[];
}

export interface Todo {
	title: string;
	id: number;
	due?: Date;
	project: Project;
	user: User;
}
