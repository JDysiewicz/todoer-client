import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";

const GET_USERS = gql`
	query GetUsers {
		users {
			email
			id
			name
			role
			projects {
				color
				id
				name
				order
				todos {
					due
					id
					title
				}
			}
		}
	}
`;

const LOG_IN = gql`
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

const Login = ({ setUser }: any) => {
	const { loading, error, data, refetch } = useQuery(GET_USERS, {});
	const [logUserIn] = useMutation(LOG_IN, {
		onError: (err) => {
			console.log("ERR", err);
		},
	});

	const login = async () => {
		const email = "admin@admin.com";
		const password = "password";
		try {
			const response = await logUserIn({
				variables: { email, password },
			});
			const token = response.data.loginUser.token;
			const user = response.data.loginUser.user;
			setUser(user);
			localStorage.setItem("token", token);
		} catch (err) {
			console.log("Error!", err);
		}
	};

	return (
		<div>
			<h2>Log In</h2>
			<button onClick={() => login()}>Log in here</button>
		</div>
	);
};

export default Login;
