import React from "react";
import { client } from "../api/apollo";

const Header = ({ setUser }: any) => {
	const logout = async () => {
		setUser(null);
		localStorage.removeItem("token");
		await client.clearStore();
	};

	return (
		<div>
			<h1>Header</h1>
			<button onClick={() => logout()}>Logout!</button>
		</div>
	);
};

export default Header;
