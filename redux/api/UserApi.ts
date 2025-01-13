import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.1.5:4000/api",
    credentials: "include", // Ensures cookies are sent with the request
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Categories","Cart", "User", "Address"],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),

    signin: builder.mutation({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
    }),

    signout: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),

    getUserProfile: builder.query({
      query: () => '/profile',
      providesTags: ['User'],
    }),

    getProducts: builder.query({
      query: () => "/all-products",
      providesTags: ["Products"],
    }),

    getCategories: builder.query({
      query: () => "/all-categories",
      providesTags: ["Categories"],
    }),

    getProductById: builder.query({
      query: (id) => `/product/${id}`,
    }),

    addToCart: builder.mutation({
      query: (cartItem) => ({
        url: "/add-to-cart",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ['Cart']
    }),

    getCart: builder.query({
      query: () => "/cart",
      providesTags: ['Cart']
    }),

    removeCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: "DELETE",
      }),
    }),
    confirmOrder: builder.mutation({
      query: () => ({
        url: '/confirm-order',
        method: 'POST',
        invalidatesTags: ['Cart']
      }),
    }),
    addAddress: builder.mutation({
      query: (address) => ({
        url: '/add-address',
        method: 'POST',
        body: address,
      }),
      invalidatesTags: ['Address'], 
    }),

    deleteAddress: builder.mutation({
      query: (id) => ({
          url: `/delete-address/${id}`,
          method: 'POST',
      }),
      invalidatesTags: ['Address'], 
  }),
    
    
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetUserProfileQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useConfirmOrderMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,

} = UserApi;
