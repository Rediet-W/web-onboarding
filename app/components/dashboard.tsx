import Link from "next/link";
import OpportunitiesCard from "./all_opportunites";
import { useGetAllOpportunitiesQuery } from "@/services/sliceApi";

export default function Dashboard(){
    const { data, error, isLoading } = useGetAllOpportunitiesQuery();
  if (error) return 
  (<div className="flex items-center justify-center h-screen">
      <div className="flex-col">
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)] text-center'> Error Loading </h1>
        <img src='/error.png' className='bg-center'/>
      </div>
    </div>)
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
  
    return (<>
        <div className='flex justify-between bg-white p-6 pb-0'>
        <div className=''>
        <h1 className='font-poppins font-black text-2xl text-[rgba(37,50,75,1)]'> Opportunities</h1>
        <p className='font-Epilogue font-normal text-[rgba(124,132,147,1)]'> showing {data.count} results</p>
        </div>
        <div className='flex space-x-2 mt-5'>
        <p className='font-normal font-Epilogue text-[rgba(124,132,147,1)]'> Sort by:</p>
        <select id= 'soryby' className='border-transparent mb-4'> <option className='font-semibold font-Epilogue text-[rgba(37,50,75,1)]'> Most relevant</option>
        <option className='font-semibold font-Epilogue text-[rgba(37,50,75,1)]'> Most recent</option> </select>
                               
     <div className='h-7 w-[1px] mb-4 bg-gray-300'></div>
    </div>
    </div>
    {data.data.map((dat, idx) => (
          <Link href={`/opportunities/${dat.id}`} key={dat.id}>
            <OpportunitiesCard id={idx}/>
          </Link>
          
        ))}    </>
    )
}