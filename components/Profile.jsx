import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { useConnect, useAccount } from 'wagmi'
import WalletModal from "./WalletModal";
import ProfilePic from "../public/images/profile-pic.svg";
import Twitter from "../public/images/twitter.svg";
import Linkedin from "../public/images/linkedin.svg";
import Telegram from "../public/images/telegram.svg";
import Github from "../public/images/github.svg";
import Router, { useRouter } from "next/router";
import Portfolio from "./Portfolio";
import NftComp from "./NftComp";
import HistoryComp from "./HistoryComp";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { UserAvatar, UserSocialStats, NftNetWorth } from "../graphql/query";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';

const Profile = ({ page = 'portfolio' }) => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const [showPopup, setShowPopup] = useState(false);
    const { address, connector, isConnected } = useAccount();
    const router = useRouter();
    const {id} = router.query;
    const { data, loading } = useQuery(UserAvatar, { variables: { userInput: { address: id } } });
    const { data: socialStats} = useQuery(UserSocialStats, {variables: { address: id }});
    const { data: nftNet } = useQuery(NftNetWorth, {variables: { addresses:[id] }});
    return (
        <div className="profile-container">
            <div className="profile-header flex items-center">
                <div className="hexagon">
                    <Image src={data?.user?.avatarURI ? data.user.avatarURI : '/images/default-avatar.jpeg'} className="flex-1" width={185} height={209} alt=''/>
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
                        <div className="wallet-address font-normal text-base">{id}</div>
                        <div className="action flex gap-4 justify-center">
                            <div className="copy-icon cursor-pointer">
                                <CopyToClipboard text={id} onCopy={() => toast('Copied')}>
                                    <Image src={`/images/copy.svg`} alt="" width={19} height={22}/>
                                </CopyToClipboard>
                            </div>
                            <div className="scan-icon">
                            <Image src={`/images/scan.svg`} alt="" width={18} height={18}/>
                            </div>
                        </div>
                    </div>
                    <div className="activity-info flex font-normal text-sm items-center">
                        <div className="followers flex-1">Followers<span className="text-black font-semibold ml-3">{socialStats?.user?.socialStats?.followedCount ? socialStats.user.socialStats.followedCount : 0}</span></div>
                        <div className="following flex-1">Following<span className="text-black font-semibold ml-3">{socialStats?.user?.socialStats?.followersCount ? socialStats.user.socialStats.followersCount : 0}</span></div>
                        <div className="achivements text-white flex p-3 justify-around gap-6">
                            <Image src={`/images/award.svg`} alt='' width={18} height={18} className="flex-1"/>
                            <div>8659</div>
                        </div>
                    </div>
                </div>
                <div className="balance-info flex-1 font-semibold text-5xl text-right">
                    ${nftNet?.nftNetWorth ? parseFloat(nftNet.nftNetWorth).toFixed(2) : 0}
                </div>
            </div>
            <div className="tab-container flex">
                <div className="tab-list flex w-5/6 justify-center text-lg font-medium items-center">
                    <Link href={`/profile/${id}`}><div className={`tab px-3 mx-5 pb-2 cursor-pointer ${page==='portfolio' ? 'active' : ''}`}>Portfolio</div></Link>
                    <div className="tab-divider mx-5"></div>
                    <Link href={`/profile/nft/${id}`}><div className={`tab px-3 mx-5 pb-2 cursor-pointer ${page==='nft' ? 'active' : ''}`}>NFTs</div></Link>
                    <div className="tab-divider mx-5"></div>
                    <Link href={`/profile/history/${id}`}><div className={`tab px-3 mx-5 pb-2 cursor-pointer ${page==='history' ? 'active' : ''}`}>History</div></Link>
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
                <Twitter />
                <Linkedin />
                <Telegram />
                <Github />
            </div>
            <Toaster />
        </div>
    )
}

export default Profile;
