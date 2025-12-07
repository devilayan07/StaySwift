import { getReviewsForAHotel } from "@/database/queries"
import Link from "next/link"
import Button from "../Button"
import { auth } from "@/auth"
async function HotelReviewNumber({id}) {
    const reviews=await getReviewsForAHotel(id)
    const session=await auth()
  return (
    <>
    {
        reviews?.length===0 ? (
            <Button hotelId={id} userId={session?.user?.id} >Be the firt one to review</Button>
        ):(
          <Link href={`/hotels/${id}/reviews`} className="underline" >{reviews?.length} Reviews</Link>
        )
    }
    
    </>
  )
}

export default HotelReviewNumber
