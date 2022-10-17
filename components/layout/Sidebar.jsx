import React from "react";
import Image from 'next/image';

const Sidebar = () => {
    return (
        <div className="sidebar bg-regal-white ">
            <div>
                <div className="sidebar-header text-center mb-4">
                    <Image src={`/images/logo.svg`} alt="" width="100%" height="100%"/>
                </div>
                <div className="sidebar-body table">
                    <div className="menu-border table-cell"></div>
                    <ul className="menus mb-8 table-cell">
                        <li><Image src={`/images/dashboard.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/><span className="menutext">Dashboard</span></li>
                        <li><Image src={`/images/feed.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/><span className="menutext">Feed</span></li>
                        <li><Image src={`/images/profile.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/><span className="menutext">Social Rankings</span></li>
                        <li><Image src={`/images/defi.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/><span className="menutext">Defi List</span></li>
                        <li><Image src={`/images/more.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/><span className="menutext">More</span></li>

                    </ul>
                </div>
            </div>
            <div className="sidebar-footer">
                <ul className="menus1">
                    <li><Image src={`/images/support.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/><span className="menutext">Support</span></li>
                    <li><Image src={`/images/settings.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/><span className="menutext">Settings</span></li>
                    <li className="mt-2 dark-btn">
                        <button className="flex">
                            <Image src={`/images/dark.svg`} className="sidebar-icons" alt="" width="20px" height="20px"/> 
                            <span className="menutext">Dark Mode</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;
