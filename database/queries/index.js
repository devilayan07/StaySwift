import Hotels from "@/models/hotel-model";
import RatingModel from "@/models/rating-model";
import ReviewModel from "@/models/review-model";
import BookingModel from "@/models/booking-model";
import dbConnect from "@/service/mongo";
import { isDateInbetween } from "@/utils/data-util";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";
import User from "@/models/user-model";
import AmenitiesModel from "@/models/amenities-model";

export async function getAllHotels(destination,checkin,checkout,category,amenitiesId){
    await dbConnect()
    const regex=new RegExp(destination,"i")
    const hotelsByDestination=await Hotels.find({city:{$regex:regex}}).select(["thumbNailUrl","name","highRate","lowRate","city","propertyCategory","amenities"]).lean()
    let allHotels=hotelsByDestination;

    if(category){
        const categoriesToMatch=category.split("|");

        allHotels=allHotels.filter((hotel)=>{
            return categoriesToMatch.includes(hotel.propertyCategory.toString())
        })

    }
  if (amenitiesId && amenitiesId.length > 0) {
    allHotels = allHotels.filter(hotel =>
      hotel.amenities?.some(aId =>
        amenitiesId.includes(aId.toString())
      )
    )
  }
    if(checkin && checkout){
       allHotels=await Promise.all(
          allHotels.map((async(hotel)=>{
            const found=await findBooking(hotel._id,checkin,checkout)
            console.log(found)
            if(found){
                hotel["isBooked"]=true
            }else{
                hotel["isBooked"]=false
            }
            return hotel;
          }))
       )
    }
    return replaceMongoIdInArray(allHotels)
}

async function findBooking(hotelId,checkin,checkout){
  const matches=await BookingModel.find({hotelId:hotelId.toString()}).lean()

  const found=matches.find((match)=>{
    return (
        isDateInbetween(checkin,match.checkin,match.checkout) ||
        isDateInbetween(checkout,match.checkin,match.checkout)
    )
  })

  return found


}
export async function getHotelById(hotelId,checkin,checkout){
    await dbConnect()
    const hotel=await Hotels.findById(hotelId).lean()
    if(checkin && checkout){
        const found=await findBooking(hotel._id,checkin,checkout)
        if(found){
            hotel["isBooked"]=true
        }else{
            hotel["isBooked"]=false
        }
    }
    return replaceMongoIdInObject(hotel)
}

export async function getRatingsForAHotel(hotelId){
    await dbConnect()
    const ratings=await RatingModel.find({hotelId:hotelId}).lean()
    return replaceMongoIdInArray(ratings)


}

export async function getReviewsForAHotel(hotelId){
    await dbConnect()
    const reviews=await ReviewModel.find({hotelId:hotelId}).lean()
    return replaceMongoIdInArray(reviews)


}

export async function getUserByEmail(email){
    const users=await User.find({email:email }).lean()
    return replaceMongoIdInObject(users[0])
}

export async function getBookingByUser(userId){
    const bookings=await BookingModel.find({userId:userId}).lean()
    return replaceMongoIdInArray(bookings)
}

export async function getAminities(amenities){
    await dbConnect()
    const amenitiesArray=decodeURI(amenities).split("|")
    const aminitiesSearch=await AmenitiesModel.find({name:{ $in: amenitiesArray }}).lean()

    return replaceMongoIdInArray(aminitiesSearch)


}
