"use client";

import React, { useState, useEffect } from "react";
import Nav from "./nav";
import {
  useGetAllOpportunitiesQuery,
  useGetOpportunityByIdQuery,
} from "../../services/sliceApi";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { BookmarkCrud, getBookmarks } from "../bookmark/bookmarkapi";
import { Bookmark, JobPost } from "../type";
import BookmarkCard from "./bookmark";

const OpportunityCard = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetAllOpportunitiesQuery();

  const job = useGetOpportunityByIdQuery(id).data?.data as JobPost;

  return (
    <>
      <div
        key={job?.id}
        className=" bg-white p-4 flex rounded-lg hover:bg-slate-100"
      >
        <div className="w-1/4">
          <img
            src={job?.logoUrl || "/job1.png"}
            alt="job avatar"
            className="h-1/3 w-1/2 rounded-full ring-2 ring-white object-contain"
          />
        </div>
        <div className="w-3/4">
          <p className="font-Epilogue font-semibold text-xl">{job?.title}</p>
          <p className="flex font-Epilogue font-normal text-[rgba(124,132,147,1)]">
            <p>{job?.orgName}</p>
            <div className="px-1"> . </div>
            {job?.location?.map((loc: string) => (
              <span className="pl-2">{loc}</span>
            ))}
          </p>
          <p className="font-normal font-Epilogue text-[rgba(37,50,75,1)]">
            {job?.description}
          </p>
          <div className="flex">
            {job?.opType == "inPerson" ? (
              <p className="inline-block bg-[rgba(86,205,173,0.1)] text-[rgba(86,205,173,1)] font-Epilogue font-semibold py-1 px-3 w-fit  rounded-full m-2 bg-center">
                {" "}
                {job?.opType}
              </p>
            ) : (
              <p className="inline-block bg-[rgba(255,54,54,0.1)] text-[#ff3636] font-Epilogue font-semibold py-1 px-3 w-fit  rounded-full m-2">
                {" "}
                {job?.opType}
              </p>
            )}
            <div className="h-7 w-[1px] m-2 mt-3 bg-gray-300"></div>
            {job?.categories.map((category: string, index: number) => (
              <p
                key={index}
                className={`inline-block ${
                  index % 2 === 0
                    ? "text-[rgba(255,184,54,1)] border border-[rgba(255,184,54,1)]"
                    : "text-indigo-500 border border-indigo-500"
                } font-Epilogue font-semibold py-1 px-3 w-fit rounded-full m-2 bg-transparent inline-block`}
              >
                {category}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OpportunityCard;
