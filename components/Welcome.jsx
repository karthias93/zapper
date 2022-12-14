import React, { useState } from "react";
import Image from 'next/image';
import { useConnect } from 'wagmi'
import WalletModal from "./WalletModal";

const Welcome = () => {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="page-content px-4 lg:px-0">
            <div className="main-card w-full lg:w-4/5">
            <div className="flex">
                <div className="w-full lg:w-3/5">
                <h1 className="text-2xl md:text-5xl heading1 mb-6 leading-10 md:leading-[72px]">
                    Keep up with the<br /> amazing world of<br /> Web3
                </h1>
                <div>
                    <button className="text-regal-white login-btn flex py-1.5 px-2 md:py-2.5 md:px-3.5 bg-gradient-to-r from-[#FEAA02] to-[#E15310]" onClick={() => setShowPopup(true)}>
                        <span className="mr-3 font-medium">Log in via web3 wallet. </span>
                        <Image height={20} width={20} src={`/images/wallet-white.svg`} alt=""/>
                    </button>
                </div>
                </div>
                <div className="w-2/5 hidden lg:block">
                <div className="slek-card slek-card1">
                    <div className="flex">
                    <div className="mr-3">
                        <Image height={100} width={100} src={`/images/poly1.svg`} alt=""/>
                    </div>
                    <div>
                        <div className="mb-3">
                        0xbd........5c50
                        </div>
                        <div className="ske11">
                        <Image src={`/images/skel-1.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="slek-card">
                    <div className="flex">
                    <div className="mr-3">
                        <Image height={100} width={100} src={`/images/poly2.svg`} alt=""/>
                    </div>
                    <div>
                        <div className="mb-3">
                        0xbd........5c50
                        </div>
                        <div className="ske11">
                        <Image src={`/images/skel-1.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="slek-card slek-card1">
                    <div className="flex">
                    <div className="mr-3">
                        <Image height={100} width={100} src={`/images/poly3.svg`} alt=""/>
                    </div>
                    <div>
                        <div className="mb-3">
                        0xbd........5c50
                        </div>
                        <div className="ske11">
                        <Image src={`/images/skel-1.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="slek-card">
                    <div className="flex">
                    <div className="mr-3">
                        <Image height={100} width={100} src={`/images/poly4.svg`} alt=""/>
                    </div>
                    <div>
                        <div className="mb-3">
                        0xbd........5c50
                        </div>
                        <div className="ske11">
                        <Image src={`/images/skel-1.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                        <div className="ske12">
                        <Image src={`/images/skel-2.svg`} alt="" width="100%" height="100%"/>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="mt-14 w-full lg:w-1/3 text-sm font-light px-[30px]">
            <p>
                Log in now to view all your holdings and past transactions or use the search bar to view transaction details of any web3 wallet address.
            </p>
            </div>
            {showPopup && <WalletModal setShowPopup={setShowPopup} />}
        </div>
    )
}

export default Welcome;
