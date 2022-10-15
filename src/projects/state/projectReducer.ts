import { Project } from "../Project";
import {
	CLEAN_PROJECT,
	DELETE_PROJECT_FAILURE,
	DELETE_PROJECT_REQUEST,
	DELETE_PROJECT_SUCCESS,
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

export const initialProjectState: ProjectState = {
	projects: [],
	project: undefined,
	loading: false,
	error: undefined,
	page: 1,
};

export function projectReducer(state = initialProjectState, action: ProjectActionTypes): ProjectState {
	switch (action.type) {
		case LOAD_PROJECTS_REQUEST:
			return { ...state, loading: true, error: "" };
		case LOAD_PROJECTS_SUCCESS:
			let projects: Project[];
			const { page } = action.payload;

			if (page === 1) {
				projects = action.payload.projects;
			} else {
				projects = [...state.projects, ...action.payload.projects];
			}

			return {
				...state,
				loading: false,
				page,
				projects,
				error: "",
			};
		case LOAD_PROJECTS_FAILURE:
			return { ...state, loading: false, error: action.payload.message };
		case LOAD_PROJECT_REQUEST:
			return { ...state, loading: true, error: "" };
		case LOAD_PROJECT_SUCCESS:
			return { ...state, loading: false, project: action.payload };
		case LOAD_PROJECT_FAILURE:
			return { ...state, loading: false, error: "" };
		case CLEAN_PROJECT:
			return {
				...state,
				project: undefined,
			};
		case SAVE_PROJECT_REQUEST:
			return { ...state, loading: true };
		case SAVE_PROJECT_SUCCESS:
			if (action.payload.isNew) {
				return {
					...state,
					projects: [...state.projects, action.payload],
				};
			}

			return {
				...state,
				projects: state.projects.map((project: Project) => {
					return project.id === action.payload.id ? Object.assign({}, project, action.payload) : project;
				}),
				loading: false,
			};

		case SAVE_PROJECT_FAILURE:
			return { ...state, loading: false, error: action.payload.message };
		case DELETE_PROJECT_REQUEST:
			return { ...state, loading: true };
		case DELETE_PROJECT_SUCCESS:
			return {
				...state,
				projects: state.projects.filter((project: Project) => project.id !== action.payload.id),
				loading: false,
			};
		case DELETE_PROJECT_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.message,
			};
		default:
			return state;
	}
}
