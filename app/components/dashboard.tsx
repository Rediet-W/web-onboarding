"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useGetAllOpportunitiesQuery } from "@/services/sliceApi";
import { Bookmark, JobPost } from "../type";
import BookmarkCard from "./bookmark";
import { useSession } from "next-auth/react";
import { BookmarkCrud, getBookmarks } from "../bookmark/bookmarkapi";
import Image from "next/image";
import OpportunityCard from "./OpportunityCard";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useGetAllOpportunitiesQuery();
  //   const { data: session } = useSession();
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});

  const JobData = data?.data;
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (token) {
        try {
          const bookmarks = await getBookmarks(token);
          const tempBookmark: { [key: string]: boolean } = {};
          bookmarks.forEach((bookmark: Bookmark) => {
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
    if (!session?.user?.accessToken) {
      console.log("No session token available");
      return;
    }
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
          [id]: !isBookmark,
        }));
      }
    }
  };

  // Filter job data based on search term
  const filteredJobs = JobData?.filter((job: JobPost) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex-col">
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)] text-center">
            Error Loading
          </h1>
          <img src="/error.png" className="bg-center" alt="Error" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex-col">
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)] text-center">
            Loading
          </h1>
          <img src="/loading.png" className="bg-center" alt="Loading" />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src="/error.png" className="bg-center" alt="Error" />
      </div>
    );
  }

  return (
    <div className="h-full w-full ">
      <div className="flex justify-between bg-white p-6 pb-0">
        <div>
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)]">
            Opportunities
          </h1>
          <p className="font-Epilogue font-normal text-[rgba(124,132,147,1)]">
            showing {data?.count} results
          </p>
        </div>
        <div className="flex space-x-2 mt-5">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <p className="font-normal font-Epilogue text-[rgba(124,132,147,1)]">
            Sort by:
          </p>
          <select id="sortby" className="border-transparent mb-4">
            <option className="font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
              Most relevant
            </option>
            <option className="font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
              Most recent
            </option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        {filteredJobs?.map((job) => (
          <div
            key={job.id}
            className=" border-solid border-2 cursor-pointer bg-white rounded-lg border-inherit m-4 hover:bg-slate-100 p-2"
          >
            <div className="flex justify-end">
              <Image
                src={bookmarked[job.id] ? "/Bookmarked.png" : "/Bookmark.png"}
                alt={bookmarked[job.id] ? "Bookmarked" : "Unbookmarked"}
                width={20}
                height={20}
                data-testid="bookmark-button"
                onClick={() => handleBookmarkClick(job.id)}
                className="cursor-pointer"
              />
            </div>
            <Link href={`/opportunities/${job.id}`}>
              <OpportunityCard id={job.id} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
