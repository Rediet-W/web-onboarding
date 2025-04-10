import jobs from "../jobs.json";
import JobCard from "../components/jobcard";

export default async function JobList() {
  return (
    <>
      <div className="flex justify-between bg-white p-6 pb-0">
        <div className="">
          <h1 className="font-poppins font-black text-2xl text-[rgba(37,50,75,1)]">
            {" "}
            Opportunities
          </h1>
          <p className="font-Epilogue font-normal text-[rgba(124,132,147,1)]">
            {" "}
            showing 73 results
          </p>
        </div>
        <div className="flex space-x-2 mt-5">
          <p className="font-normal font-Epilogue text-[rgba(124,132,147,1)]">
            {" "}
            Sort by:
          </p>
          <p className="font-semibold font-Epilogue text-[rgba(37,50,75,1)]">
            {" "}
            Most relevant{" "}
          </p>
          <svg
            className="w-4 h-4 ml-2 mt-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
          <div className="h-7 w-[1px] mb-4 bg-gray-300"></div>
        </div>
      </div>
      <JobCard />
    </>
  );
}
