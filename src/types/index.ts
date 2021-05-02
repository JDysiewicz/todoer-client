type ID = string;

export interface User {
	email: string;
	id: ID;
	name: string;
	role: string;
	projects: Project[];
	todos: Todo[];
}

export interface Project {
	name: string;
	order: number;
	id: ID;
	user: User;
	todos: Todo[];
}

export interface Todo {
	title: string;
	id: ID;
	due?: Date;
	project: Project;
	user: User;
}
