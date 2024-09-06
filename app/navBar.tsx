import Link from 'next/link';
import { ImgLinksProps } from './imgLinks';
import { useState } from 'react';

export interface NavBarProps {
  setOther: React.Dispatch<React.SetStateAction<boolean>>;
  setSocial: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ setOther, setSocial }: NavBarProps) {
  const [navlog, setNavLog] = useState<boolean>(false);

  const handleOtherClick = () => {
    if (navlog) {
      setOther(false);
      setSocial(false);
      setNavLog(false);
    } else {
      setOther(true);
      setSocial(false);
      setNavLog(true);
    }
  };

  return (
    <>
      <nav
        className="justify-center flex flex-row items-start relative px-0 py-8 pb-20 fade md:overflow-auto scroll-pr-6 md:relative"
        id="nav"
      >
        <div className="flex flex-row space-x-20 pr-10">
          <Link
            href='/'
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
          >  home
          </Link>
          <Link
            href='/blog'
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
          >  blog
          </Link>
          <div
            onClick={handleOtherClick}
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
          >  other
          </div>
        </div>
      </nav>
    </>
  );
}
