"use client"
import { useSearchParams,usePathname,useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function FilterByAmenities() {
    const searchParams=useSearchParams()
    const pathname=usePathname()
    const {replace}=useRouter()
    const[query,setQuery]=useState([])

    const params=new URLSearchParams(searchParams.toString())
     const handleChange=(event)=>{
        const name=event.target.name;
        const checked=event.target.checked;
        
        if(checked){
            setQuery((prev)=>[...prev,name])
        }else{
            const filtered=query.filter((item)=>item!==name)
            setQuery(filtered)
        }
        console.log(query)

     }

     useEffect(()=>{
       const aminities=params.get("aminities")
       if(aminities){
        const decodedAminities=decodeURI(aminities)
        const queryInAminities=decodedAminities.split("|")
        setQuery(queryInAminities)
       }

     },[])

     useEffect(()=>{
        if(query.length>0){
            params.set("aminities",encodeURI(query.join("|")))
        }else{
            params.delete("aminities")
        }
        replace(`${pathname}?${params.toString()}`)

     },[query])

  return (
        <div>
          <h3 className="font-bold text-lg">Amenities</h3>
          <form action="" className="flex flex-col gap-2 mt-2">
            <label for="wifi">
              <input type="checkbox" name="WiFI" id="wifi" checked={query.includes("WiFI")} onChange={handleChange} />
              Wi-fi
            </label>

            <label for="swimmingPool">
              <input type="checkbox" name="Swimming Pool" id="swimmingPool" checked={query.includes("Swimming Pool")} onChange={handleChange} />
              Swimming Pool
            </label>
          </form>
        </div>
  )
}

export default FilterByAmenities
