import Image from "next/image";
import { FaArrowRight, FaUser } from "react-icons/fa";
import {
  AiOutlineFolder,
  AiOutlineSetting,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";

import axios from "axios";
export default async function Home() {
  const payload = await axios.get(
    "https://photogallery-1mof.onrender.com/photos"
  );

  return (
    <>
      <div className="flex flex-col items-center space-y-2 my-8 md:my-24 ">
        <h1 className="font-bold text-2xl">OUR GALLERY</h1>
        <p className="text-mutedText">
          This project is created in order to help businesss
        </p>
      </div>
      <div className="flex justify-center mt-8 items-center  space-x-4 md:space-x-24">
        {[
          { title: "MEN", icon: <AiOutlineUser /> },
          { title: "WOMEN", icon: <AiOutlineShopping /> },
          { title: "GROUP", icon: <AiOutlineFolder /> },
          { title: "LEADERS", icon: <AiOutlineSetting /> },
        ].map((item, index) => {
          return (
            <div
              key={item.title}
              className={`flex space-x-2 cursor-pointer  items-center border-b-4 ${
                0 == index ? "border-primaryColor" : "border-transparent"
              }  pb-2`}
            >
              <div className=" text-sm md:text-lg">{item.icon} </div>
              <div className=" text-sm md:text-lg">{item.title}</div>
            </div>
          );
        })}
      </div>
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
        {payload.data.data.map((item) => {
          return (
            <div key={item.imageUrl} className="">
              <Image width="1000" height="1000" alt="" src={item.imageUrl} />
              <h1></h1>
            </div>
          );
        })}
      </div>
    </>
  );
}
