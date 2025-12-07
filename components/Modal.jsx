import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

function Modal({hotelId,userId,onClose}) {
  const[error,setError]=useState("")
  const router=useRouter()

  const onSubmit=async(e)=>{
    e.preventDefault()
    try {
          const formData=new FormData(e.currentTarget)
    const review=formData.get("review")
    
    const response=await fetch("/api/review",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        review,
        hotelId,
        userId
      })
    })
     
    response?.status===201 && router.push(`hotels/${hotelId}/reviews`)

      
    } catch (error) {
      setError(error?.message)
      
    }




  }


  return (
    <>
             { error && (<div className="text-xl text-red-500 text-center">{error}</div>)    }

        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
     <div className='rounded-md p-6 w-[800px] relative bg-white'>
        <div className='flex justify-between items-center'>
            <span className='text-md font-bold'>
               Write an review for this hotel
            </span>
             <button onClick={onClose} className=" text-lightmodalCrosscolor hover:text-lightmodalbtnText text-[22px]"
>
            X
          </button>

        </div>
        <div className='flex justify-between items-center '>
                 

            <form className=' w-full flex gap-2' onSubmit={onSubmit}>
            <input type="text" name="review" id="review"  className='w-full px-4 py-2 rounded-md border border-black/20'/>
            <button type='submit' className='px-4 py-1 rounded-md bg-cyan-500'>Send</button>

            </form>

        </div>
        </div>      
    </div>
    </>

  )
}

export default Modal
