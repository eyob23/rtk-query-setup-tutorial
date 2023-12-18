import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jsonServerApi = createApi({
  reducerPath: "jsonServerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Albums"],
  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (page = 1) => `albums?_page=${page}&_limit=10`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Albums", id })),
              { type: "Albums", id: "LIST" },
            ]
          : [{ type: "Albums", id: "LIST" }],
    }),

    createAlbum: builder.mutation({
      query: (title) => ({
        url: "albums",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (result, _error, _arg) => [
        { type: "Albums", id: result.id },
        { type: "Albums", id: "LIST" },
      ],
    }),

    updateAlbum: builder.mutation({
      query: ({ id, title }) => ({
        url: `albums/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Albums", id: arg.id }],
    }),

    deleteAlbum: builder.mutation({
      query: (id) => ({
        url: `albums/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Albums"],
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useCreateAlbumMutation,
  useUpdateAlbumMutation,
  useDeleteAlbumMutation,
} = jsonServerApi;
