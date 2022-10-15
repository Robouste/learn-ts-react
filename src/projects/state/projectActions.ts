import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Project } from "../Project";
import { projectAPI } from "../projectAPI";
import {
	CLEAN_PROJECT,
	LOAD_PROJECTS_FAILURE,
	LOAD_PROJECTS_REQUEST,
	LOAD_PROJECTS_SUCCESS,
	LOAD_PROJECT_FAILURE,
	LOAD_PROJECT_REQUEST,
	LOAD_PROJECT_SUCCESS,
	ProjectActionTypes,
	ProjectState,
	SAVE_PROJECT_FAILURE,
	SAVE_PROJECT_REQUEST,
	SAVE_PROJECT_SUCCESS,
} from "./projectTypes";

export function loadProjects(page: number): ThunkAction<void, ProjectState, null, Action<string>> {
	return (dispatch: (type: ProjectActionTypes) => void) => {
		dispatch({ type: LOAD_PROJECTS_REQUEST });
		return projectAPI
			.get(page)
			.then((data) =>
				dispatch({
					type: LOAD_PROJECTS_SUCCESS,
					payload: { projects: data, page },
				})
			)
			.catch((error) => dispatch({ type: LOAD_PROJECTS_FAILURE, payload: error }));
	};
}

export function findProject(id: number): ThunkAction<void, ProjectState, null, Action<string>> {
	return (dispatch: (type: ProjectActionTypes) => void) => {
		dispatch({ type: LOAD_PROJECT_REQUEST });
		return projectAPI
			.find(id)
			.then((data) => dispatch({ type: LOAD_PROJECT_SUCCESS, payload: data }))
			.catch((error) => dispatch({ type: LOAD_PROJECT_FAILURE, payload: error }));
	};
}

export function saveProject(project: Project): ThunkAction<void, ProjectState, null, Action<string>> {
	return (dispatch: (type: ProjectActionTypes) => void) => {
		dispatch({ type: SAVE_PROJECT_REQUEST });
		return projectAPI
			.put(project)
			.then((data) => dispatch({ type: SAVE_PROJECT_SUCCESS, payload: data }))
			.catch((error) => dispatch({ type: SAVE_PROJECT_FAILURE, payload: error }));
	};
}

export function cleanProject(): ThunkAction<void, ProjectState, null, Action<string>> {
	return (dispatch: (type: ProjectActionTypes) => void) => {
		dispatch({ type: CLEAN_PROJECT });
	};
}
