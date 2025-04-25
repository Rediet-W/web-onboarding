"use client";
import { useState, useEffect } from "react";
import { useGetOpportunityByIdQuery } from "../../services/sliceApi";
import { useSession } from "next-auth/react";
import { BookmarkCrud, getBookmarks } from "../bookmark/bookmarkapi";

const BookmarkCard = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});
  const { data, error, isLoading } = useGetOpportunityByIdQuery(id);
  const job = data?.data;

  // Define token properly
  const token: string | undefined = session?.user?.accessToken;

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
    <div
      key={job?.id}
      className="relative border bg-white p-4 flex rounded-lg border-inherit m-4"
    >
      {job?.logoUrl ? (
        <img
          src={job.logoUrl || "/placeholder.svg"}
          alt="job avatar"
          className="h-1/3 w-1/6 rounded-full ring-2 ring-white"
        />
      ) : (
        <img
          src="/job1.png"
          alt="job avatar"
          className="w-1/6 rounded-full ring-2 ring-white"
        />
      )}
      <div className="">
        <p className="font-Epilogue font-semibold text-xl">{job?.title}</p>

        <p className="flex font-Epilogue font-normal text-[rgba(124,132,147,1)]">
          <span>{job?.orgName}</span>
          <div className="px-1"> . </div>
          {job?.location?.map((loc: string) => (
            <span className="pl-2" key={loc}>
              {loc}
            </span>
          ))}
        </p>
        <p className="font-normal font-Epilogue text-[rgba(37,50,75,1)]">
          {job?.description}
        </p>
        <div className="flex">
          {job?.opType === "inPerson" ? (
            <p className="inline-block bg-[rgba(86,205,173,0.1)] text-[rgba(86,205,173,1)] font-Epilogue font-semibold py-1 px-3 w-fit rounded-full m-2 bg-center">
              {job?.opType}
            </p>
          ) : (
            <p className="inline-block bg-[rgba(255,54,54,0.1)] text-[#ff3636] font-Epilogue font-semibold py-1 px-3 w-fit rounded-full m-2">
              {job?.opType}
            </p>
          )}
          <div className="m-2 mt-3 bg-gray-300"></div>
          {job?.categories?.map((category: string, index: number) => (
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

        {session && (
          <div
            onClick={() => handleBookmarkClick(id)}
            className="cursor-pointer"
            role="button"
            aria-label="bookmark"
          >
            <img
              src={bookmarked[id] ? "/Bookmarked.png" : "/Bookmark.png"}
              alt="Bookmark"
              width={35}
              height={45}
              className="absolute top-2 right-2 w-6 h-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkCard;
