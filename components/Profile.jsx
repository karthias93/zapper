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
import toast from 'react-hot-toast';
import TwitterBlack from "../public/images/twitter-black.svg";
import Email from "../public/images/email.svg";
import Copy from "../public/images/copy.svg";
import Scan from "../public/images/scan.svg";
import UploadAvatar from "./UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins, selectCoinState } from "../store/coinSlice";
import { selectUserState } from "../store/userSlice";
import { IKImage } from "imagekitio-react";

const Profile = ({ page = 'portfolio' }) => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const [showPopup, setShowPopup] = useState(false);
    const { address, connector, isConnected } = useAccount();
    const router = useRouter();
    const {id} = router.query;
    const { data, loading } = useQuery(UserAvatar, { variables: { userInput: { address: id } } });
    const { data: socialStats} = useQuery(UserSocialStats, {variables: { address: id }});
    const { data: nftNet } = useQuery(NftNetWorth, {variables: { addresses:[id] }});
    const handleClick = () => {
        if (address && address === id) setShowPopup(true);
    }
    const dispatch = useDispatch();
    const coinState = useSelector(selectCoinState);
    const userState = useSelector(selectUserState);
    const [tokens, setTokens] = useState({});
    const [looksRare, setLooksRare] = useState([]);
    const [coinBalance, setCoinBalance] = useState({});
    const [balance, setBalance] = useState(0);

    useEffect(()=> {
        dispatch(fetchCoins(id));
    }, [dispatch, id])
    useEffect(()=>{
        const token = {
            total: 0,
            wallet: []
        };
        const looks = {
            total: 0,
            appName: '',
            wallet: []
        };
        const coins = {};
        coinState.forEach(wallet=>{
            if (wallet.appId === 'looks-rare') {
                looks.total = wallet.app.meta.total;
                looks.appName = wallet.app.displayProps.appName;
                looks.logo = wallet.app.displayProps.images[0];
                wallet.app.data.forEach((app)=>{
                    app.breakdown.forEach((d)=>{
                        looks.wallet.push({
                            value: app.balanceUSD,
                            label: d.context.symbol,
                            logo: d.displayProps.images[0],
                            balance: d.context.balance,
                            price: d.context.price,
                            address: d.context.address,
                            network: d.context.network,
                        });
                    });
                });
            } else if (wallet.appId === 'tokens') {
                wallet.totals.forEach((trans)=>{
                    if (coins[wallet.network]) {
                        coins[wallet.network] += trans.balanceUSD;
                    } else {
                        coins[wallet.network] = trans.balanceUSD;
                    }
                    token.total += trans.balanceUSD;
                    const c = wallet.balance.wallet[trans.key];
                    token.wallet.push({
                        value: c.context.price,
                        label: c.context.symbol,
                        logo: c.displayProps.images[0],
                        balance: c.context.balance,
                        price: c.context.price,
                        address: c.address,
                        network: c.network,
                    })
                });
            }
        });
        setLooksRare(looks);
        setTokens(token);
        const coinChain = {};
        Object.entries(coins).forEach(([key, val])=>{
            coinChain[key] = {
                balance: val,
                percentage: (val/(token.total+looks.total))*100
            }
        });
        setBalance(parseFloat(token.total+looks.total)?.toFixed())
        setCoinBalance(coinChain);
    }, [coinState])
    return (
        <div className="profile-container rounded-2xl p-0 lg:py-4 lg:px-16">
            <div className="profile-header block items-center lg:flex">
                <div className="hexagon" onClick={handleClick}>
                    <IKImage path={userState?.profilePic?.filePath && userState.wallet === id ? userState.profilePic.filePath : '/profile-picture-default.jpg'} alt="" loading="lazy" lqip={{ active: true }} className="relative w-100 mb-3" />
                </div>
                <div className="profile-info flex-1">
                    <div className="account-info flex max-lg:text-center">
                        <div className="account-name font-medium text-4xl mb-5 flex-1">{userState?.username && userState.wallet === id ? userState.username : 'No ID' }</div>
                        <div className="contact-options flex flex-1 justify-center items-center mb-5 gap-4">
                            <div className="twitter-icon border p-2 flex border-[#434343] rounded-full	">
                                <TwitterBlack width={20} height={17} className="icons"/>
                            </div>
                            <div className="mail-icon border p-2 flex border-[#434343] rounded-full	">
                                <Email width={20} height={16} className="icons"/>
                            </div>
                        </div>
                    </div>
                    <div className="wallet-info mb-7 gap-4 justify-start flex max-lg:justify-around">
                        <div className="wallet-address font-normal text-base max-lg:hidden">{id}</div>
                        <div className="wallet-address font-normal text-base lg:hidden">{id?.substr(0,5)}...{(id?.substr(-5))}</div>
                        <div className="action flex gap-4 justify-center">
                            <div className="copy-icon cursor-pointer">
                                <CopyToClipboard text={id} onCopy={() => toast('Copied')}>
                                    <Copy width={19} height={22} className="icons"/>
                                </CopyToClipboard>
                            </div>
                            <div className="scan-icon">
                            <Scan width={18} height={18} className="icons"/>
                            </div>
                        </div>
                    </div>
                    <div className="activity-info font-normal text-sm items-center flex max-lg:text-center">
                        <div className="followers flex-1 lg:flex">Followers<div className="text-black font-semibold ml-3 dark:text-white">{socialStats?.user?.socialStats?.followersCount ? socialStats.user.socialStats.followersCount : 0}</div></div>
                        <div className="following flex-1 lg:flex">Following<div className="text-black font-semibold ml-3 dark:text-white">{socialStats?.user?.socialStats?.followedCount ? socialStats.user.socialStats.followedCount : 0}</div></div>
                        <div className="achivements text-white flex p-3 justify-around gap-6 max-lg:hidden">
                            <Image src={`/images/award.svg`} alt='' width={18} height={18} className="flex-1"/>
                            <div>8659</div>
                        </div>
                    </div>
                </div>
                <div className="balance-info flex-1 font-semibold text-2xl lg:text-5xl text-right max-lg:text-center max-lg:mt-3">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance)}
                </div>
            </div>
            <div className="tab-container flex max-lg:block max-lg:mt-3">
                <div className="tab-list flex w-full lg:w-5/6 justify-center text-normal lg:text-lg font-medium items-center">
                    <Link href={`/profile/${id}`}><div className={`tab px-3 mx-0 lg:mx-5 pb-2 cursor-pointer ${page==='portfolio' ? 'active' : ''}`}>Portfolio</div></Link>
                    <div className="tab-divider mx-5"></div>
                    <Link href={`/profile/nft/${id}`}><div className={`tab px-3 mx-0 lg:mx-5 pb-2 cursor-pointer ${page==='nft' ? 'active' : ''}`}>NFTs</div></Link>
                    <div className="tab-divider mx-5"></div>
                    <Link href={`/profile/history/${id}`}><div className={`tab px-3 mx-0 lg:mx-5 pb-2 cursor-pointer ${page==='history' ? 'active' : ''}`}>History</div></Link>
                </div>
                <div className="filer-dropdown flex-1 w-1/6 text-right pb-2 max-lg:hidden">
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
            <div className="px-10 py-9 bg-[#D3D3D3] dark:bg-[#999]">
                {page === 'portfolio' && <Portfolio looksRare={looksRare} coinBalance={coinBalance} tokens={tokens}/>}
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
            {showPopup && <UploadAvatar setShowPopup={setShowPopup} />}
        </div>
    )
}

export default Profile;
