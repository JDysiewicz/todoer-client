import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { client } from "../api/apollo";
import Another from "./Another";

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

const App: React.FC = (): JSX.Element => {
	const [user, setUser] = useState(null);
	const { loading, error, data } = useQuery(GET_USERS, {});
	console.log(data);
	const [logUserIn] = useMutation(LOG_IN, {
		onCompleted(data) {
			localStorage.setItem("token", data.loginUser.token);
			setUser(data.user);
		},
	});

	const login = async () => {
		const email = "admin@admin.com";
		const password = "password";
		try {
			await logUserIn({ variables: { email, password } });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h1>Hello, world!</h1>
			<Another />
			{loading && <h2>Loading...</h2>}
			{user && <h2>LOGGED IN!!!</h2>}
			{!user && <h2>NOT LOGGED IN</h2>}
			{error && <h2>ERROR {JSON.stringify(error)}</h2>}
			{data && <p>{JSON.stringify(data)}</p>}
			<button onClick={() => login()}>Log in</button>
			<button
				onClick={() => {
					try {
						localStorage.removeItem("token");
						setUser(null);
						client.resetStore();
					} catch (err) {
						console.log(err);
					}
				}}
			>
				Log out
			</button>
		</div>
	);
};

export default App;
