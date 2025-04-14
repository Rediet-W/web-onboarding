
import React from 'react';
import { useGetOpportunityByIdQuery } from '../../services/sliceApi';

const OpportunityDetails = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetOpportunityByIdQuery(id);
console.log(id)
if (error) 
  return (<div className="flex items-center justify-center h-screen">
    <div className="flex-col">
      <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)] text-center'> Error </h1>
      <img src='/error.png' className='bg-center'/>
    </div>
  </div>);
if (isLoading) 
  return (
  <div className="flex items-center justify-center h-screen">
    <div className="flex-col">
      <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)] text-center'> Loading </h1>
      <img src='../loading.png' className='bg-center'/>
    </div>
  </div>
);
if (!data) return <div className="flex items-center justify-center h-screen"><img src='../error.png' className='bg-center'/></div>;

const curr_job = data?.data;

const Date_format = (dateString: string): string =>{ 
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ""; 
  }
  return date.toISOString().split('T')[0];
}

return (
  <div>
    <div className='bg-white flex h-full py-8 pl-8 pr-7 justify-between'>
      <div className='bg-white w-3/4 space-y-11'>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37, 50, 75, 1)]'> Description</h1>
        <p className='font-normal font-Epilogue text-[rgba(37,50,75,1)]'>{curr_job?.description}</p>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37, 50, 75, 1)]'> Responsibilities</h1>
        <ul className='space-y-2'>
          {curr_job?.responsibilities?.split('.').map((part: string, index: number) => (
            part !== '' ? (
              <li key={index} className='font-normal font-Epilogue text-[rgba(37,50,75,1)] flex'>
                <img src='../tick.png' alt='tick' className='w-5 h-5 mr-1.5'/>
                {part}
              </li>
            ) : null
          ))}
        </ul>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)]'> Ideal Candidate we want</h1>
        <p  className='font-normal font-Epilogue text-[rgba(37,50,75,1)]'> {curr_job?.idealCandidate}</p>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)] pt-14'> When & Where</h1>
        <div className='flex pt-5'>
          <img src='../Location.png' alt='location' className='w-11 h-11'/>
        <p className='font-normal font-Epilogue text-[rgba(37,50,75,1)] p-2'>{curr_job?.whenAndWhere}</p></div>
      </div>
      <div className='space-y-5 w-1/4'>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)] pl-2'> About</h1>
        <div className='flex'>
          <img src='../plus_circle.png' alt='plus-circle' className='w-12 h-12 p-2 '/>
          <div>
            <p className='font-normal font-Epilogue text-[rgba(81,91,111,1)]'> Posted On</p>
            <p className='font-semibold'>{Date_format(curr_job?.datePosted ?? '')}</p>
          </div>
        </div>
        <div className='flex'>
          <img src='../frame.png' alt='deadline' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light'> Deadline</p>
            <p className='font-semibold'>{Date_format(curr_job?.deadline ?? '')}</p>
          </div>
        </div>
        <div className='flex'>
          <img src='../Location.png' alt='location' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light '> Location</p>
            <p className='font-semibold'>{curr_job?.location}</p>
          </div>
        </div>
        <div className='flex'>
          <img src='../start.png' alt='start date' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light'> Start Date</p>
            <p className='font-semibold'>{Date_format(curr_job?.startDate ?? '')} </p>
          </div>
        </div>
        <div className='flex'>
          <img src='../Endpoint.png' alt='end date' className='w-12 h-12 p-2'/>
          <div>
            <p className='font-light'> End Date</p>
            <p className='font-semibold'>{Date_format(curr_job?.endDate ?? '')}</p>
          </div>
        </div>
        <hr/>
        <p className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)]'> Categories</p>
      
        {curr_job?.categories?.map((cat: string, index:number) => {
          if (index % 2 == 0){
            return <p className='inline-block bg-[rgba(235,133,51,0.1)] text-[rgba(255,184,54,1)] font-Epilogue font-semibold py-1 px-3 w-fit  rounded-full m-2 bg-center'> {cat}</p>
          }
          else{
            return <p className='inline-block bg-[rgba(86,205,173,0.1)] text-[rgba(86,205,173,1)] font-Epilogue font-semibold py-1 px-3 w-fit  rounded-full m-2 bg-center'> {cat}</p>
          }
        })}
        <hr/>
        <p className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)]'> Required Skills</p>
        {curr_job?.requiredSkills?.map((skill:string, index:number) => {
          return <p className='bg-[rgba(248,248,253,1)] text-[#4540def5] font-normal py-1 px-3 w-fit m-2 inline-block'>{skill}</p>;}
        )}
      </div>
    </div>
    </div>
  );
};

export default OpportunityDetails;
