import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    baseUrl: "https://660160fd87c91a11641ab523.mockapi.io/users",
  }),
  reducerPath: "usersApi",
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query<UsersApiResponse[], number>({
      query: (page = 1) => `?page=${page}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
