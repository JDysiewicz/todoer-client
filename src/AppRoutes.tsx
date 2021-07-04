import { useQuery } from "@apollo/client";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";

import App from "./App";

import LoadingSpinner from "./components/atoms/LoadingSpinner";
import UserContext from "./context/UserContext";
import { User } from "./types";
import RegisterPage from "./pages/RegisterPage";
import { GET_CURRENT_USER } from "./graphql/queries";

const AppRoutes = (): JSX.Element => {
	const [user, setUser] = useState<User | null>(null);
	const { loading } = useQuery(GET_CURRENT_USER, {
		onCompleted: (data) => {
			if (data && data.currentUser) setUser(data.currentUser);
		},
	});

	if (loading) return <LoadingSpinner />;

	return (
		<UserContext.Provider value={user}>
			<Router>
				<Switch>
					<Route path="/register" component={RegisterPage} />
					{!user && (
						<Route
							path="/"
							render={(props) => (
								<LoginPage {...props} setUser={setUser} />
							)}
						/>
					)}
					{user && <App setUser={setUser} />}
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default AppRoutes;
