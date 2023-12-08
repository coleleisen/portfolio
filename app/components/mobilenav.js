"use client"
import React, { useRef, useState, useEffect, useContext } from 'react';

export default function MobileNav({SharedStateContext}) {

    const { sharedState, setSharedState } = useContext(SharedStateContext);

    const clicked = (pos) =>{
          
        setSharedState(pos)
    }
   
    return (
        <nav className="flex text-center items-center justify-between " style={{minHeight : '5vh'}}>
            <div onClick={()=>clicked(-1.8)} className="text-white grid grid-cols-4 gap-3 text-center">
                About
            </div>

            <div onClick={()=>clicked(-0.4)} className="text-white grid grid-cols-4 gap-3 text-center" >
                Experience
            </div>

            <div onClick={()=>clicked(1)}  className="text-white grid grid-cols-4 gap-3 text-center">
                Projects
            </div>

            <div onClick={()=>clicked(2.4)}  className="text-white grid grid-cols-4 gap-3 text-center">
                Skills
            </div>
        </nav>
    );
  }

