import "./globals.css";
import { NavBarProps } from "./navBar";
import { useState } from 'react';

export interface ImgLinksProps {
  setOther: React.Dispatch<React.SetStateAction<boolean>>;
  setSocial: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ImgLinks({ setOther, setSocial }: ImgLinksProps) {
   const [log, setLog] = useState<boolean>(false);

   const handleSocialClick = () => {
     if (log) {
       setOther(false);
       setSocial(false);
       setLog(false);
     } else {
       setOther(false);
       setSocial(true);
       setLog(true);
     }
   };
 
  return (
    <div className="flex flex-row justify-center space-x-56 items-start relative px-0">
      <a
        href="/Curriculum_Vitae_2024.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-neutral-800 dark:hover:text-neutral-200 flex flex-col items-center space-y-12"
      >
        <h1>My CV</h1>
        <img className="w-24" src="/winrep_mag_glass.png" alt="My CV" />
      </a>
      <a
        onClick={handleSocialClick}
        style={{ cursor: 'pointer' }} 
        className="hover:text-neutral-800 dark:hover:text-neutral-200 flex flex-col items-center space-y-12"
      >
        <h1>My Socials</h1>
        <img className="w-24" src="/user_world-1.png" alt="My Socials" />
      </a>
      <a
        href="https://github.com/ChristianKeogh"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-neutral-800 dark:hover:text-neutral-200 flex flex-col items-center space-y-12"
      >
        <h1>My GitHub</h1>
        <img className="w-24" src="/accessibility_window_objs.png" alt="My GitHub" />
      </a>
    </div>
  );
}
