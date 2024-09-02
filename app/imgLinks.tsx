import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export function ImgLinks() {
  return (
    <div className="flex flex-row justify-center space-x-56 items-start relative px-0">
        <div className="flex flex-col items-center">
        <h1>My CV</h1>
        <img className="w-28"src="/winrep_mag_glass.png" alt="My Projects"/>
        </div>
        <div className="flex flex-col items-center">
        <h1>My Socials</h1>
        <img className="w-28"src="/user_world-1.png" alt="My Projects"/>
        </div>
        <div className="flex flex-col items-center">
        <h1>My Projects</h1>
        <img className="w-28"src="/accessibility_window_objs.png" alt="My Projects"/>
        </div>
    </div>
  )
}
