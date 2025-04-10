import job from '../../jobs.json';
import {notFound} from 'next/navigation'
export function GetJob(index:number){
  const res = job[index]
  return res
}

export default function JobDetails({params}: {params: any}) {
 const idx = params.id
 const curr_job = GetJob(idx)
 if (parseInt(params.id) > job.length) {notFound()}
  return (
    <div className='bg-white flex h-full py-8 pl-8 pr-7 justify-between'>
      <div className='bg-white w-3/4 space-y-11'>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37, 50, 75, 1)]'> Description</h1>
        <p className='font-normal font-Epilogue text-[rgba(37,50,75,1)]'>{curr_job.description}</p>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37, 50, 75, 1)]'> Responsibilities</h1>
        <ul className='space-y-2'>
          {curr_job.responsibilities.map((resp, index) => (<div className='flex 'key={index}>
            <img src='../tick.png' alt='tick' className='w-5 h-5 mr-1.5'/>
            <li  className='font-normal font-Epilogue text-[rgba(37,50,75,1)]'>{resp}</li></div>
          ))}
        </ul>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)]'> Ideal Candidate we want</h1>
        <ul className='list-disc space-y-1 ml-2'>
  {curr_job.ideal_candidate.traits.map((ideal, index) => {
    const parts = ideal.split(':');
    return (
      <li key={index} className='font-normal font-Epilogue text-[rgba(37,50,75,1)]'>
        <span className='font-bold'>{parts[0]}</span>
        {parts[1] && <span className='font-normal'>:{parts[1]}</span>}
      </li>
    );
  })}
</ul>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)] pt-14'> When & Where</h1>
        <div className='flex pt-5'>
          <img src='../Location.png' alt='location' className='w-11 h-11'/>
        <p className='font-normal font-Epilogue text-[rgba(37,50,75,1)] p-2'>{curr_job.when_where}</p></div>
      </div>
      <div className='space-y-5 w-1/4'>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)] pl-2'> About</h1>
        <div className='flex'>
          <img src='../plus_circle.png' alt='plus-circle' className='w-12 h-12 p-2 '/>
          <div>
            <p className='font-normal font-Epilogue text-[rgba(81,91,111,1)]'> Posted On</p>
            <p className='font-semibold'>{curr_job.about.posted_on}</p>
          </div>
        </div>
        <div className='flex'>
          <img src='../frame.png' alt='deadline' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light'> Deadline</p>
            <p className='font-semibold'>{curr_job.about.deadline}</p>
          </div>
        </div>
        <div className='flex'>
          <img src='../Location.png' alt='location' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light '> Location</p>
            <p className='font-semibold'>{curr_job.about.location}</p>
          </div>
        </div>
        <div className='flex'>
          <img src='../start.png' alt='start date' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light'> Start Date</p>
            <p className='font-semibold'>{curr_job.about.start_date} </p>
          </div>
        </div>
        <div className='flex'>
          <img src='../Endpoint.png' alt='end date' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light'> End Date</p>
            <p className='font-semibold'>{curr_job.about.end_date}</p>
          </div>
        </div>
        <hr/>
        <p className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)]'> Categories</p>
      
        {curr_job.about.categories.map((cat, index) => {
          if (index % 2 == 0){
            return <p className='inline-block bg-[rgba(235,133,51,0.1)] text-[rgba(255,184,54,1)] font-Epilogue font-semibold py-1 px-3 w-fit  rounded-full m-2 bg-center'> {cat}</p>
          }
          else{
            return <p className='inline-block bg-[rgba(86,205,173,0.1)] text-[rgba(86,205,173,1)] font-Epilogue font-semibold py-1 px-3 w-fit  rounded-full m-2 bg-center'> {cat}</p>
          }
        })}
        <hr/>
        <p className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)]'> Required Skills</p>
        {curr_job.about.required_skills.map((skill, index) => {
          return <p className='bg-[rgba(248,248,253,1)] text-[#4540def5] font-normal py-1 px-3 w-fit m-2 inline-block'>{skill}</p>;}
        )}
      </div>
    </div>
  );
}
