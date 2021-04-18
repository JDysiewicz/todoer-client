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
