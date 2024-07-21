import { Api } from "@/interfaces";
import AxiosInstance from "@/utils/axios";
import queryString from 'query-string';

const BASE_URL = (projectId: string) => `/project/${projectId}/todos`

export const getTodos = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  projectId: string,
  query: Api.TodoApi.GetTodosQuery
): Promise<Api.TodoApi.GetTodosResponse> => {
  return await AxiosInstance.get(`${BASE_URL(projectId)}?${queryString.stringify(query)}`);
};

export const createTodo = async (
  data: Api.TodoApi.CreateTodoPayload
): Promise<Api.TodoApi.CreateTodoResponse> => {
  return await AxiosInstance.post(BASE_URL(data.project), data);
};
