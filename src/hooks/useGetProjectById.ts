import { ApolloError, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PROJECT } from "../graphql/queries";
import { Project } from "../types";

/* eslint-disable  @typescript-eslint/no-explicit-any*/

export const useGetProjectById = (
	projectId: string
): {
	project: Project | undefined;
	loading: boolean;
	error: ApolloError | undefined;
	refetchTodos: () => Promise<void>;
} => {
	const [project, setProject] = useState<Project>();
	const [getProject, { data, loading, error, refetch }] =
		useLazyQuery(GET_PROJECT);

	const refetchTodos = async () => {
		if (!refetch) return;
		const response = await refetch();
		setProject(response.data.project);
	};

	useEffect(() => {
		if (projectId.match(/^\d+$/)) {
			getProject({ variables: { projectId } });
			if (!loading && data) setProject(data.project);
		}
	}, [projectId, loading, data, getProject]);

	return { project, loading, error, refetchTodos };
};
