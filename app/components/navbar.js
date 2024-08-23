"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaAirFreshener, FaSearch } from "react-icons/fa";
import { menuItems } from "../utils/constants";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="border-b-2 border-slate-200">
      <div className="flex justify-between w-11/12 mx-auto pt-4">
        <Link className="font-bold text-lg  " href="/">
          LOGO
        </Link>
        <div
          onClick={() => {
            setShowMenu(true);
          }}
          className="text-xl md:hidden"
        >
          <AiOutlineMenu />
        </div>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: 300 }}
              animate={{
                x: 0,
                transition: {
                  ease: "linear",
                  duration: 0.5,
                },
              }}
              exit={{
                x: 300,
                transition: {
                  ease: "linear",
                },
              }}
              className="fixed inset-0 w-6/12 ms-auto bg-gray-100"
            >
              {/*add close icon*/}
              <div
                onClick={() => {
                  setShowMenu(false);
                }}
                className="flex justify-end p-5 text-2xl"
              >
                <AiOutlineClose />
              </div>
              {/* Add nav items */}
              <div className="flex flex-col space-y-2 p-8">
                {menuItems.map((item) => {
                  return (
                    <Link
                      key={item.path}
                      onClick={() => {
                        setShowMenu(false);
                      }}
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden md:block ">
          <div className="flex space-x-6 items-center ">
            <div className="flex space-x-6">
              {menuItems.map((item, index) => {
                return (
                  <Link
                    className={`hover:text-primaryColor border-b-2  ${
                      pathname == item.path
                        ? "border-primaryColor"
                        : "border-transparent"
                    } pb-2`}
                    href={item.path}
                    key={item.path}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
            <FaSearch className="hover:text-primaryColor mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
