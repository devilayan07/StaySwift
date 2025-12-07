import { getReviewsForAHotel } from '@/database/queries'
import React from 'react'

async function ReviewPage({params}) {
    const {id}=params
    const reviews=await getReviewsForAHotel(id)
  return (
    <div className='flex justify-center items-center gap-6  h-screen'>
      {
        Array.isArray(reviews) && reviews?.map((item)=> <span key={item?.id}>{item?.review}</span> ) 
      }
    </div>
  )
}

export default ReviewPage

