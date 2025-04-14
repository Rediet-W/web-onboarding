
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { JobPostById, JobPosting } from '../app/type';

export const opportunitiesApi = createApi({
  reducerPath: 'opportunitiesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/' }),
  endpoints: (builder) => ({
    getAllOpportunities: builder.query<JobPosting, void>({
      query: () => 'opportunities/search',
    }),
    getOpportunityById: builder.query<JobPostById, string>({
      query: (id:string) => `opportunities/${id}`,
    }),
  }),
});

export const { useGetAllOpportunitiesQuery, useGetOpportunityByIdQuery } = opportunitiesApi;
