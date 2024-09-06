"use client";
import { Navbar } from "./navBar";
import { NasaPicture } from "./nasaPicture";
import { ImgLinks } from "./imgLinks";
import { useState } from "react";
import SideBar from "./sideBar";


export default function Page() {
  const [social_bool, setSocial] = useState<boolean>(false); 
  const [other_bool, setOther] = useState<boolean>(false); 
  const sidebarType = social_bool ? 'social' : other_bool ? 'other' : null;

  
  return (
    <main>
      <div className="flex flex-row max-h-screen">
      <div id="left" className="min-w-min flex-col px-40 w-[70%] min-h-screen bg-black text-3xl text-gray-500 flex">
          <Navbar setOther={setOther} setSocial={setSocial}/>
          <h1 className="justify-center text-justify pb-16 text-white">
               Hi, I'm Christian, <br/><br/>

              I'm a front-end programmer looking for a web development role. Previously I was a location designer in animation for 3 years. I currently reside in Dublin 
              <br/><br/><br/>
          </h1>
          <ImgLinks setSocial={setSocial} setOther={setOther}/>
      </div>
      <div id="right" className="overflow-x-hidden overflow-y-scroll w-[30%]">
{/* If there's a sidebarType, render SideBar with the corresponding type; otherwise, show NasaPicture */}
{sidebarType ? <SideBar type={sidebarType} /> : <NasaPicture />}      </div>
      </div>
      </main>
  )
}
