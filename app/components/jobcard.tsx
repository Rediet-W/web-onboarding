import jobs from "../jobs.json";

interface JobPosting {
  title: string;
  description: string;
  responsibilities: string[];
  ideal_candidate: {
    age: string;
    gender: string;
    traits: string[];
  };
  when_where: string;
  about: {
    posted_on: string;
    deadline: string;
    location: string;
    start_date: string;
    end_date: string;
    categories: string[];
    required_skills: string[];
  };
  company: string;
  image: string;
}

export default function JobCard() {
  return (
    <div className="bg-white p-3">
      {jobs.map((job: JobPosting, index: number) => (
        <a
          href={`jobs/${index}`}
          key={index}
          className="border bg-white p-4 flex  justify-between rounded-lg border-inherit m-3"
        >
          <div>
            <img
              src={job.image}
              alt="job avatar"
              className="h-8 w-16 rounded-full ring-2 ring-white"
            />
          </div>
          <div className="pl-3">
            <p className="font-Epilogue font-semibold text-xl">{job.title}</p>
            <p className="font-Epilogue font-normal text-[rgba(124,132,147,1)]">
              {job.company} . {job.about.location}
            </p>
            <p className="font-normal font-Epilogue text-[rgba(37,50,75,1)]">
              {job.description}
            </p>
            <div className="flex">
              <p className="inline-block bg-[rgba(86,205,173,0.1)] text-[rgba(86,205,173,1)] font-Epilogue font-semibold py-1 px-3 w-fit  rounded-full m-2 bg-center">
                {" "}
                Inperson
              </p>
              <div className="h-7 w-[1px] m-2 mt-3 bg-gray-300"></div>
              {job?.about.categories.map((category: string, index: number) => (
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
        </a>
      ))}
    </div>
  );
}
