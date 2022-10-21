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
import { useDispatch } from "react-redux";
import { setUserState } from "../../store/userSlice";

const Header = ({page = 'Welcome'}) => {
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);
    const { address, connector, isConnected } = useAccount();
    const { disconnect } = useDisconnect(); 
    const [ balance, setBalance ] = useState(0);
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ menuDropdown, setMenuDropdown ] = useState(false);
    useOutsideAlerter(dropdownRef, showDropdown, setShowDropdown);
    useOutsideAlerter(menuRef, menuDropdown, setMenuDropdown);
    const { data: balanceObj } = useBalance({
        addressOrName: address,
    });
    useEffect(()=>{
        setBalance(balanceObj?.formatted)
    },[balanceObj?.formatted])
    const dispatch = useDispatch();

    useEffect(()=>{
        axios.get(`/api/users/${address}`)
            .then(res=>{
                dispatch(setUserState(res.data))
            })
    }, [])
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

    const logout = () => {
        disconnect();
        setMenuDropdown(false);
    }

    const debouncedResults = useMemo(() => {
        return debounce(handleChange, 300);
      }, []);

    const [showPopup, setShowPopup] = useState(false);
    return (
        <div className="page-header mt-5 mb-4 flex justify-between">
            <div>
                <h1 className="text-4xl font-medium text-black dark:text-white">{page} {page==='Welcome' ? '👋' : ''}</h1>
            </div>
            <div className="flex">
                <div ref={dropdownRef}>
                    <input onFocus={handleFocus} type="text" className="search-input font-normal dark:bg-black" placeholder="Search address / Web3 ID / ENS / Protocol" onChange={debouncedResults}/>
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
                    (<div ref={menuRef}>
                        <button className="text-regal-white login-btn font-medium" onClick={()=> address ? setMenuDropdown(true) : setShowPopup(true)}>
                            {balance ? `${address?.substr(0,5)}...${(address?.substr(-10))}($${parseFloat(balanceObj?.formatted).toFixed(2)})` : 'Log in via web3 wallet.'}
                        </button>
                        {menuDropdown && <div className="absolute z-10 mt-1 min-w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black">
                            <div className="py-1" role="none">
                                <div className="text-gray-700 block px-4 py-2 text-sm cursor-pointer" onClick={logout}>Logout</div>
                            </div>
                        </div>}
                    </div>) :
                    (
                        <div>
                            <button className="text-regal-white login-btn font-medium" onClick={() => setShowPopup(true)}>
                                Log in via web3 wallet.
                            </button>
                        </div>
                    )}
                <div>
                    <Image height={45} width={45} src={`/images/hexa.svg`} alt=""/>
                </div>
            </div>
            <Toaster />
            {showPopup && <WalletModal setShowPopup={setShowPopup} />}
        </div>
    )
}

export default Header;
