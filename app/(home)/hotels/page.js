import Search from "@/components/search/Search"
import Filter from "@/components/filter/Filter"
import HotelList from "@/components/hotel/HotelList"

const refinedCategory=(category)=>{
  const decodedCategory=decodeURI(category)

  if(decodedCategory==="undefined"){
    return ""
  }
  return decodedCategory
}

const refinedAminities=(aminities)=>{
  const decodedAminities=decodeURI(aminities)

  if(decodedAminities==="undefined"){
    return ""
  }
  return decodedAminities
}

function HotelListPage({searchParams}) {
  const{destination,checkin,checkout,category,aminities}=searchParams


  return (
    <>
    <section className="bg-[url('/hero-bg.jpg')] bg-cover bg-no-repeat bg-center pt-[100px] pb-[60px]">
      <div className="container items-center py-12 ">
           <Search fromList={true} checkin={checkin} checkout={checkout} destination={destination}/>
        </div>

        </section>
            <section className="py-12">
      <div className="container grid grid-cols-12">
        <Filter/>
        <HotelList destination={destination} checkin={checkin} checkout={checkout} category={refinedCategory(category)} aminities={refinedAminities(aminities)}/>
        </div>
        </section>
    </>

  )
}

export default HotelListPage
