import { useState } from "react";
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from "react-query";
import { Project } from "./Project";
import { projectAPI } from "./projectAPI";

declare type ProjectHook = UseQueryResult<Project[], unknown> & {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
};

export function useProjects(): ProjectHook {
	const [page, setPage] = useState(0);
	let queryInfo = useQuery(["projects", page], () => projectAPI.get(page + 1), {
		keepPreviousData: true,
		// staleTime: 5000
	});

	console.log(queryInfo);

	return { ...queryInfo, page, setPage };
}

export function useSaveProject(): UseMutationResult<Project, unknown, Project, unknown> {
	const queryClient = useQueryClient();
	return useMutation((project: Project) => projectAPI.put(project), {
		onSuccess: () => queryClient.invalidateQueries("projects"),
	});
}
