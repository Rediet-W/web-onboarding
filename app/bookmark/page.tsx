"use client";

import React, { useState, useEffect } from "react";
import { useGetAllOpportunitiesQuery } from "../../services/sliceApi";
import Link from "next/link";
import JobCardList from "../components/bookmark";
import Image from "next/image";
import Bookmarked from "/bookmarked.png";
import Bookmark from "/Bookmark.png";
import { useSession } from "next-auth/react";
import { BookmarkCrud, getBookmarks } from "./bookmarkapi";
import BookmarkCard from "../components/bookmark";
import Nav from "../components/nav";
import OpportunityCard from "../components/OpportunityCard";

const Bookmarks = () => {
  const { data, error, isLoading } = useGetAllOpportunitiesQuery();
  const { data: session } = useSession();
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});
  const token: string | undefined = session?.user?.accessToken;
  const jobData = data?.data;
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (token) {
        try {
          const bookmarks: Array<{ eventID: string }> = await getBookmarks(
            token
          );
          const tempBookmark: { [key: string]: boolean } = {};

          bookmarks.forEach((bookmark) => {
            tempBookmark[bookmark.eventID] = true;
          });

          setBookmarked(tempBookmark);
        } catch (error) {
          console.error("Error fetching bookmarks:", error);
        }
      }
    };

    fetchBookmarks();
  }, [token]);

  const handleBookmarkClick = async (id: string) => {
    const isBookmark = bookmarked[id];

    // Optimistically update UI
    setBookmarked((prevState) => ({
      ...prevState,
      [id]: !isBookmark,
    }));

    if (token) {
      try {
        await BookmarkCrud(id, token, isBookmark);
      } catch (error) {
        console.error("Error updating bookmark:", error);
        // Revert state if API call fails
        setBookmarked((prevState) => ({
          ...prevState,
          [id]: isBookmark,
        }));
      }
    }
  };

  return (
    <>
      <Nav />
      <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)] p-4 ">
        {" "}
        Saved Opportunities
      </h1>
      <div className="h-full w-full ">
        {Object.keys(bookmarked).length > 0 ? (
          jobData?.map((job, index) =>
            bookmarked[job.id] ? (
              <div
                key={job.id}
                className=" border-solid border-2 cursor-pointer bg-white rounded-lg border-inherit m-4 hover:bg-slate-100 p-2"
              >
                <div className="flex justify-end">
                  <Image
                    data-testid="bookmark-button"
                    src={"/Bookmarked.png"}
                    alt="Bookmarked"
                    width={20}
                    height={20}
                    onClick={() => handleBookmarkClick(job.id)}
                    className="cursor-pointer"
                  />
                </div>
                <Link href={`/opportunities/${job.id}`}>
                  <OpportunityCard id={job.id} />
                </Link>
              </div>
            ) : null
          )
        ) : (
          <div className="w-full p-4 text-center">
            <p className="font-Epilogue font-bold text-2xl text-[rgba(124,132,147,1)]">
              No saved opportunities
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Bookmarks;
