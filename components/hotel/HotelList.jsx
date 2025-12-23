import HotelCard from "./HotelCard";
import { getAllHotels, getAminities } from "@/database/queries";
import NoHotels from "./NoHotels";

const HotelList = async({destination,checkin,checkout,category,aminities}) => {
  console.log(aminities,"aminities")
  const aminitiesForHotel=await getAminities(aminities)
  console.log(aminitiesForHotel,"aminitiesForHotel")
  const amenitiesId=aminitiesForHotel?.map((item)=>item.id)
  console.log(amenitiesId,"amenitiesId")
  const allHotels=await getAllHotels(destination,checkin,checkout,category,amenitiesId)
  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {
          allHotels?.length>0 ? (
                      Array.isArray(allHotels) && allHotels?.map((hotel)=><HotelCard key={hotel?.id} hotelInfo={hotel} checkin={checkin} checkout={checkout}/>)


          ):(
            <NoHotels/>
          )
        }
      </div>
    </div>
  );
};

export default HotelList;
