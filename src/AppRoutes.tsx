import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./components/App";
import Header from "./components/Header";
import Login from "./components/Login";
import UserContext from "./context/UserContext";

const GET_CURRENT_USER = gql`
	query CurrentUser {
		currentUser {
			email
			id
			name
			role
		}
	}
`;

const AppRoutes = () => {
	const [user, setUser] = useState(null);
	const { loading } = useQuery(GET_CURRENT_USER, {
		onCompleted: (data) => {
			if (data && data.currentUser) setUser(data.currentUser);
		},
	});

	if (loading) return <div>Loading....</div>;

	if (!user) return <Login setUser={setUser} />;
	return (
		<UserContext.Provider value={user}>
			<Router>
				<Header setUser={setUser} />
				<Switch>
					<Route path="/" component={App} />
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default AppRoutes;
