import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useConnect, useAccount } from 'wagmi'
import WalletModal from "./WalletModal";
import ProfilePic from "../public/images/profile-pic.svg";
import twitter from "../public/images/twitter.svg";
import linkedin from "../public/images/linkedin.svg";
import telegram from "../public/images/telegram.svg";
import github from "../public/images/github.svg";
import Router from "next/router";
import Portfolio from "./Portfolio";
import NftComp from "./NftComp";
import HistoryComp from "./historyComp";
import Link from "next/link";

const Profile = ({ page = 'portfolio' }) => {
    console.log(page)
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const [showPopup, setShowPopup] = useState(false);
    const { address, connector, isConnected } = useAccount();
    useEffect(()=>{
        if (!isConnected) Router.push(`/`);
      }, [isConnected])
    return (
        <div className="profile-container">
            <div className="profile-header flex items-center">
                <div className="hexa">
                    <div className="hex1">
                        <div className="hex2">
                            <Image src={ProfilePic} alt='' className="flex-1"/>
                        </div>
                    </div>
                </div>
                <div className="profile-info flex-1">
                    <div className="account-info flex">
                        <div className="account-name font-medium text-4xl mb-5 flex-1">Binance 8</div>
                        <div className="contact-options flex flex-1 justify-center items-center mb-5 gap-4">
                            <div className="twitter-icon border p-2 flex border-[#434343] rounded-full	">
                                <Image src={`/images/twitter-black.svg`} alt="" width={20} height={17}/>
                            </div>
                            <div className="mail-icon border p-2 flex border-[#434343] rounded-full	">
                                <Image src={`/images/email.svg`} alt="" width={20} height={16}/>
                            </div>
                        </div>
                    </div>
                    <div className="wallet-info mb-7 flex gap-4 justify-start">
                        <div className="wallet-address font-normal text-base">0xb57377e633cf19022ead8d1f34d78e1b473538d2</div>
                        <div className="action flex gap-4 justify-center">
                            <div className="copy-icon">
                                <Image src={`/images/copy.svg`} alt="" width={19} height={22}/>
                            </div>
                            <div className="scan-icon">
                            <Image src={`/images/scan.svg`} alt="" width={18} height={18}/>
                            </div>
                        </div>
                    </div>
                    <div className="activity-info flex font-normal text-sm items-center">
                        <div className="followers flex-1">Followers<span className="text-black font-semibold ml-3">0</span></div>
                        <div className="following flex-1">Following<span className="text-black font-semibold ml-3">0</span></div>
                        <div className="achivements text-white flex p-3 justify-around gap-6">
                            <Image src={`/images/award.svg`} alt='' width={18} height={18} className="flex-1"/>
                            <div>8659</div>
                        </div>
                    </div>
                </div>
                <div className="balance-info flex-1 font-semibold text-5xl text-right">
                    $108,249
                </div>
            </div>
            <div className="tab-container flex">
                <div className="tab-list flex w-5/6 justify-center text-lg font-medium items-center">
                    <Link href={`/profile/${address}`}><div className={`tab px-3 mx-5 pb-2 cursor-pointer ${page==='porfolio' ? 'active' : ''}`}>Portfolio</div></Link>
                    <div className="tab-divider mx-5"></div>
                    <Link href={`/profile/nft/${address}`}><div className={`tab px-3 mx-5 pb-2 cursor-pointer ${page==='nft' ? 'active' : ''}`}>NFTs</div></Link>
                    <div className="tab-divider mx-5"></div>
                    <Link href={`/profile/history/${address}`}><div className={`tab px-3 mx-5 pb-2 cursor-pointer ${page==='history' ? 'active' : ''}`}>History</div></Link>
                </div>
                <div className="filer-dropdown flex-1 w-1/6 text-right pb-2">
                    <select className="form-select
                        block
                        px-3
                        py-1.5
                        text-[10px]
                        font-semibold
                        text-[#4B4B4B]
                        bg-[#D3D3D3] bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        float-right
                        ease-in-out">
                            <option selected>All chains</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div className="px-10 py-9 bg-[#D3D3D3]">
                {page === 'portfolio' && <Portfolio />}
                {page === 'nft' && <NftComp />}
                {page === 'history' && <HistoryComp />}
            </div>
            <div className="footer flex justify-end my-10 items-center text-[#8F8F8F] font-medium gap-4">
                <div className="">Connect With Us</div>
                <Image src={twitter} alt=""className="" width={20} height={20}/>
                <Image src={linkedin} alt=""className="" width={20} height={20}/>
                <Image src={telegram} alt=""className="" width={20} height={20}/>
                <Image src={github} alt=""className="" width={20} height={20}/>
            </div>
        </div>
    )
}

export default Profile;
