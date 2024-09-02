import { Navbar } from "./navBar";
import { NasaPicture } from "./nasaPicture";
import { ImgLinks } from "./imgLinks";


export default function Page() {
  return (
      <div className="flex flex-row">
      <div id="left" className="min-w-min flex-col px-10 w-[70%] min-h-screen bg-black text-3xl text-gray-500 flex">
          <Navbar />
          <h1 className="justify-center text-justify pb-16 text-white">
               Hi, I'm Christian, <br/><br/>

              I'm a front-end programmer looking for a web development role. Previously I was a location designer in animation for 3 years. I currently reside in Dublin
          </h1>
          <ImgLinks/>
      </div>
      <div id="right" className="overflow-x-hidden overflow-y-scroll w-[30%]">
          <NasaPicture />
      </div>
      </div>

  )
}
