"use client"
import React, { useState } from 'react'
import Modal from './Modal'

function Button({children,hotelId,userId}) {
  const[showModal,setShowModal]=useState(false)
  return (
    <>
     <button onClick={()=>setShowModal(true)}>{children}</button>
     {showModal && <Modal onClose={()=>setShowModal(false)} hotelId={hotelId} userId={userId} />   }
    </>
  )
}

export default Button
