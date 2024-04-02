import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants";

export interface UsersApiResponse {
  createdAt: string;
  name: string;
  avatar: string;
  hobby: string;
  location: string;
  id: string;
  "0"?: User;
}

export interface User {
  createdAt: string;
  name: string;
  avatar: string;
  hobby: string;
  location: string;
  id: string;
}

export const usersApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<UsersApiResponse[], number>({
      query: () => ``,
      providesTags: (result = []) => [
        "Users",
        ...result.map(({ id }) => ({ type: "Users", id } as const)),
      ],
    }),
    getUser: build.query<UsersApiResponse, number>({
      query: (userId = 1) => `/${userId}`,
      providesTags: (_result, _error, arg) => [{ type: "Users", id: arg }],
    }),
    addUsers: build.mutation<UsersApiResponse, UsersApiResponse>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUsers: build.mutation<UsersApiResponse, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "Users", id: arg }],
    }),
    updateUsers: build.mutation<UsersApiResponse, UsersApiResponse>({
      query: (data) => ({
        url: `/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Users", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUsersMutation,
  useAddUsersMutation,
  useUpdateUsersMutation,
} = usersApiSlice;
