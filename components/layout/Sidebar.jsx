import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";
import { selectThemeState, setThemeState } from "../../store/themeSlice";
import Dashboard from "../../public/images/dashboard.svg";
import Feed from "../../public/images/feed.svg";
import Profile from "../../public/images/profile.svg";
import Defi from "../../public/images/defi.svg";
import More from "../../public/images/more.svg";
import Support from "../../public/images/support.svg";
import Settings from "../../public/images/settings.svg";
import Dark from "../../public/images/dark.svg";
import { useAccount } from "wagmi";
import Link from "next/link";
import { selectSidebarState } from "../../store/sidebarSlice";
import SupportModal from "../Support";

const Sidebar = () => {
    const themeState = useSelector(selectThemeState);
    const sidebarState = useSelector(selectSidebarState);
    const [showSupport, setShowSupport] = useState(false);
    const dispatch = useDispatch();
    const { address } = useAccount();

    const updateTheme = () => {
        const mode = themeState === 'dark' ? 'light' : 'dark';
        localStorage.theme = mode;
        dispatch(setThemeState(mode))
    }
    return (
        <div className={`sidebar lg:w-64 w-3/4 bg-regal-white dark:bg-black absolute lg:relative overflow-y-auto ${sidebarState ? '' : 'hidden'} lg:flex z-20`}>
            <div>
                <div className="sidebar-header text-center mb-4">
                    <Image src={`/images/logo.svg`} alt="" width="100%" height="100%"/>
                </div>
                <div className="sidebar-body table">
                    <div className="menu-border table-cell"></div>
                    <ul className="menus mb-8 table-cell">
                        <Link href={address ? `/profile/${address}` : `/`}>
                            <li className="cursor-pointer">
                                <Dashboard className="sidebar-icons" width="20px" height="20px" />
                                <span className="menutext">Dashboard</span>
                            </li>
                        </Link>
                        <li>
                            <Feed className="sidebar-icons" width="20px" height="20px" />
                            <span className="menutext">Feed</span>
                        </li>
                        <Link href={`/ranking`}>
                            <li className="cursor-pointer">
                                <Profile className="sidebar-icons" width="20px" height="20px" />
                                <span className="menutext">Social Rankings</span>
                            </li>
                        </Link>
                        <Link href={`/projects`}>
                            <li className="cursor-pointer">
                                <Defi className="sidebar-icons" width="20px" height="20px" />
                                <span className="menutext">Defi List</span>
                            </li>
                        </Link>
                        <li>
                            <More className="sidebar-icons" width="20px" height="20px" />
                            <span className="menutext">More</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-footer">
                <ul className="menus1">
                    <li onClick={()=>setShowSupport(true)} className="cursor-pointer">
                        <Support className="sidebar-icons" width="20px" height="20px" />
                        <span className="menutext">Support</span>
                    </li>
                    <Link href={address ? `/settings` : `/`}>
                        <li className="cursor-pointer">
                            <Settings className="sidebar-icons" width="20px" height="20px" />
                            <span className="menutext">Settings</span>
                        </li>
                    </Link>
                    <li className="mt-2 dark-btn">
                        <button className="flex" onClick={updateTheme}>
                            <Dark className="sidebar-btn-icons" />
                            <span className="menutext">Dark Mode</span>
                        </button>
                    </li>
                </ul>
            </div>
            {showSupport && <SupportModal setShowPopup={setShowSupport} />}
        </div>
    )
}

export default Sidebar;
