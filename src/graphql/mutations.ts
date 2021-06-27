import gql from "graphql-tag";

export const LOG_IN = gql`
	mutation LogIn($email: String!, $password: String!) {
		loginUser(input: { email: $email, password: $password }) {
			token
			user {
				email
				id
				name
				role
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser(
		$email: String!
		$name: String!
		$password: String!
		$passwordConfirmation: String!
	) {
		createUser(
			input: {
				email: $email
				name: $name
				password: $password
				passwordConfirmation: $passwordConfirmation
			}
		) {
			email
		}
	}
`;

export const CREATE_TODO = gql`
	mutation CreateTodo($projectId: ID!, $title: String!, $due: NaiveDateTime) {
		createTodo(input: { projectId: $projectId, title: $title, due: $due }) {
			id
			title
			due
		}
	}
`;

export const DELETE_TODO = gql`
	mutation DeleteTodo($id: ID!) {
		deleteTodo(id: $id)
	}
`;

export const CREATE_PROJECT = gql`
	mutation CreateProject($name: String!, $order: Int!, $color: String!) {
		createProject(input: { name: $name, color: $color, order: $order }) {
			name
			id
		}
	}
`;
