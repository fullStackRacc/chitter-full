import React from 'react'
import Image from 'next/image'
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

import Logo from '../images/raccoon.svg'
import SidebarLink from './SidebarLink'


const Sidebar = () => {
  return (
    <div className='hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full'>
        <div className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24'>
            <Image src={Logo} width={35} height={35} />
        </div>
        <div className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
          <SidebarLink text="Home" Icon={HomeIcon} active />
          <SidebarLink text="Explore" Icon={HashtagIcon} />
          <SidebarLink text="Notifications" Icon={BellIcon} />
          <SidebarLink text="Messages" Icon={InboxIcon} />
          <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
          <SidebarLink text="Lists" Icon={ClipboardListIcon} />
          <SidebarLink text="Profile" Icon={UserIcon} />
          <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
        </div>
        <button className='hidden xl:inline ml-auto mt-3 bg-chitter-base rounded-full text-chitter-text w-56 h-[52px] text-lg font-bold shadow-md hover:bg-chitter-dark'>Screm</button>
        <div className='text-chitter-text flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5'>
          <img 
            src='https://pbs.twimg.com/profile_images/1523174916438253568/_NkIdHSd_400x400.jpg' 
            className='h-10 w-10 rounded-full xl:mr-2.5'
            alt='' />
          <div className='hidden xl:inline leading-5'>
            <h4 className='font-bold'>A Literal Raccoon</h4>
            <p className='text-[#6e767d]'>@aliteralraccoon</p>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
        </div>
    </div>
  )
}

export default Sidebar