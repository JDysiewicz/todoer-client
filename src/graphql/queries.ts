import gql from "graphql-tag";

export const GET_PROJECT = gql`
	query GetProject($projectId: ID!) {
		project(projectId: $projectId) {
			name
			color
			id
			order
			todos {
				due
				id
				title
			}
		}
	}
`;
