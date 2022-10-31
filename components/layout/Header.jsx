import React, { useEffect, useState, useMemo, Fragment, useRef } from "react";
import Image from 'next/image';
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useBalance
} from 'wagmi';
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import Link from "next/link";
import WalletModal from "../WalletModal";
import useOutsideAlerter from "../../utils/useOusideAlerter";
import { GlobalSearch } from "../../graphql/query";
import axios from "axios";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { selectUserState, setUserState } from "../../store/userSlice";
import { BiMenu } from 'react-icons/bi';
import { CiDark } from 'react-icons/ci';
import { selectSidebarState, setSidebarState } from "../../store/sidebarSlice";
import { selectThemeState, setThemeState } from "../../store/themeSlice";
import { IKImage } from "imagekitio-react";
import { useRouter } from "next/router";

const Header = ({page = 'Welcome'}) => {
    const dropdownRef = useRef(null);
    const dropdownRef1 = useRef(null);
    const menuRef = useRef(null);
    const { address, connector, isConnected } = useAccount();
    const { disconnect } = useDisconnect(); 
    const [ balance, setBalance ] = useState(0);
    const [ add, setAdd ] = useState('');
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ showDropdown1, setShowDropdown1 ] = useState(false);
    const [ menuDropdown, setMenuDropdown ] = useState(false);
    useOutsideAlerter(dropdownRef, showDropdown, setShowDropdown);
    useOutsideAlerter(dropdownRef1, showDropdown1, setShowDropdown1);
    useOutsideAlerter(menuRef, menuDropdown, setMenuDropdown);
    const sidebarState = useSelector(selectSidebarState);
    const themeState = useSelector(selectThemeState);
    const userState = useSelector(selectUserState);
    const { data: balanceObj } = useBalance({
        addressOrName: address,
    });
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{
        setBalance(balanceObj?.formatted)
    },[balanceObj?.formatted])
    useEffect(()=>{
        setAdd(address)
    }, [address])
    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get(`/api/users/${address}`)
            .then(res=>{
                dispatch(setUserState(res.data))
            })
    }, [])
    const updateTheme = () => {
        const mode = themeState === 'dark' ? 'light' : 'dark';
        localStorage.theme = mode;
        dispatch(setThemeState(mode))
    }
    const [searchQuery, { data, loading }] = useLazyQuery(GlobalSearch);

    const handleChange = (e) => {
        searchQuery({
            variables: { 
                searchInput: { 
                    search: e.target.value,
                    categories: ["BASE_TOKEN","USER","NFT_COLLECTION","APP","DAO"]
                }
            }
        })
    }
    const handleFocus = () => {
        setShowDropdown(true);
    }
    const handleFocus1 = () => {
        setShowDropdown1(true);
    }

    const logout = () => {
        disconnect();
        setMenuDropdown(false);
        router.push('/')
    }

    const updateSidebar = () => {
        dispatch(setSidebarState(!sidebarState))
    }

    const debouncedResults = useMemo(() => {
        return debounce(handleChange, 300);
      }, []);

    const [showPopup, setShowPopup] = useState(false);
    return (
        <Fragment>
        <div className="page-header m-0 lg:mt-5 lg:mb-4 flex justify-between items-center max-lg:bg-[#E15310]">
            <div className="hidden lg:block">
                <h1 className="text-4xl font-medium text-black dark:text-white">{page} {page==='Welcome' ? '👋' : ''}</h1>
            </div>
            <div className={`sidebar-header text-center lg:hidden z-10`}>
                <Image src={`/images/logo.svg`} alt="" width={50} height={50}/>
            </div>
            <div className="flex">
                <div ref={dropdownRef} className="hidden lg:block">
                    <input onFocus={handleFocus} type="text" className="search-input font-normal dark:bg-black w-[300px]" placeholder="Search address / Web3 ID / ENS / Protocol" onChange={debouncedResults}/>
                    <span className="search-icon">
                        <Image src={`/images/search.svg`} alt="" width="100%" height="100%"/>
                    </span>
                    {showDropdown && <div className="absolute z-10 mt-2 min-w-[300px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black">
                        {data?.search?.results?.length ?
                            (
                            <Fragment>
                                <div className="py-1" role="none">
                                    {data.search.results.map((res)=>{
                                        return (
                                            <Link href={{pathname: `/profile/${res.id}`}} key={res.id}>
                                                <a className="text-gray-700 block px-4 py-2 text-sm dark:text-[#D1D1D1] dark:hover:bg-[#2b303f]">{res.id}</a>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </Fragment>
                            ) :
                            (
                                <div className="py-1" role="none">
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm">No Match</a>
                                </div>
                            )
                        }
                    </div>}
                </div>
                {page !== 'Welcome' ? 
                    (<div ref={menuRef} className="mr-5">
                        <button className="text-regal-white login-btn font-medium py-1.5 px-2 lg:py-2.5 lg:px-3.5 max-lg:bg-[#E15310] max-lg:border-white lg:bg-gradient-to-r from-[#FEAA02] to-[#E15310] bg-[#E15310] max-lg:border-white max-lg:border" onClick={()=> address ? setMenuDropdown(true) : setShowPopup(true)}>
                            {add ? `${address?.substr(0,5)}...${(address?.substr(-10))}($${parseFloat(balanceObj?.formatted).toFixed(2)})` : 'Log in via web3 wallet.'}
                        </button>
                        {/* {menuDropdown && <div className="absolute z-10 mt-1 min-w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black">
                            <div className="py-1" role="none">
                                <div className="text-gray-700 block px-4 py-2 text-sm cursor-pointer dark:text-white">Logout</div>
                            </div>
                        </div>} */}
                    </div>) :
                    (
                        <div className="mr-5">
                            <button className="text-regal-white login-btn font-medium py-1.5 px-2 lg:py-2.5 lg:px-3.5 max-lg:bg-[#E15310] max-lg:border-white lg:bg-gradient-to-r from-[#FEAA02] to-[#E15310] bg-[#E15310] max-lg:border-white max-lg:border" onClick={() => setShowPopup(true)}>
                                Log in via web3 wallet.
                            </button>
                        </div>
                    )}
                    <div>
                    {add && <button className="hidden lg:block mr-5 px-3 py-2.5 font-medium text-sm rounded-lg bg-gradient-to-r from-[#FEAA02] to-[#E15310] text-white" onClick={logout}>
                        Logout
                    </button>}
                    </div>
                    <div className="hidden lg:block">
                        {!(userState?.profilePic?.filePath && (!id || userState.wallet === id)) && <Image height={45} width={45} src={`/images/hexa.svg`} alt=""/>}
                        {userState?.profilePic?.filePath && (!id || userState.wallet === id) &&<div className="w-[45px] h-[45px] absolute profile">
                            <IKImage path={userState.profilePic.filePath} alt="" loading="lazy" lqip={{ active: true }} className="relative w-100 mb-3"/>
                        </div>}
                    </div>
                    <CiDark className="lg:hidden" size={30} fill="#FFFFFF" onClick={updateTheme}/>
                    <BiMenu className="lg:hidden" size={30} fill="#FFFFFF" onClick={updateSidebar}/>
            </div>
            <Toaster />
            {showPopup && <WalletModal setShowPopup={setShowPopup} />}
        </div>
        <div ref={dropdownRef1} className="flex justify-center items-center py-3 lg:hidden bg-[#E15310]">
            <div>
                <input onFocus={handleFocus1} type="text" className="search-input font-normal dark:bg-black w-[80vw]" placeholder="Search address / Web3 ID / ENS / Protocol" onChange={debouncedResults}/>
                <span className="search-icon">
                    <Image src={`/images/search.svg`} alt="" width="100%" height="100%"/>
                </span>
                {showDropdown1 && <div className="absolute z-10 mt-2 w-[80vw] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black">
                    {data?.search?.results?.length ?
                        (
                        <Fragment>
                            <div className="py-1" role="none">
                                {data.search.results.map((res)=>{
                                    return (
                                        <Link href={{pathname: `/profile/${res.id}`}} key={res.id}>
                                            <a className="text-gray-700 block px-4 py-2 text-sm dark:text-[#D1D1D1] dark:hover:bg-[#2b303f] break-all">{res.id}</a>
                                        </Link>
                                    )
                                })}
                            </div>
                        </Fragment>
                        ) :
                        (
                            <div className="py-1" role="none">
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm">No Match</a>
                            </div>
                        )
                    }
                </div>}
            </div>
        </div>
    </Fragment>
    )
}

export default Header;
