import Image from "next/image";
import React, { Fragment } from "react";
import { useConnect } from 'wagmi';

const WalletModal = ({setShowPopup}) => {
    const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
    const supportedWallet = ['metaMask', 'coinbaseWallet'];
    return (
        <div onClick={()=>setShowPopup(false)} tabIndex="-1" aria-hidden="true" className="h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center bg-gray-600 bg-opacity-50">
            <div className="relative p-4 w-full max-w-[90%] lg:max-w-[40%] h-full md:h-auto">
                <div className="relative bg-white rounded-3xl shadow dark:bg-gray-700 py-1 px-2 lg:py-6 lg:px-8 dialog-box modal-content">
                    <div className="grid gap-2 lg:gap-4 wallet-modal-row my-2 lg:my-6">
                        <div className=""><Image src="/images/rabby.svg" alt="" width={60} height={60} /></div>
                        <div className="font-medium text-sm lg:text-2xl text-left flex-10 text-black dark:text-white">Rabby Wallet</div>
                        <button className="rounded-xl max-lg:text-sm connect-btn py-2 px-6 shrink-0">connect</button>
                    </div>
                    <div className="bg-[#c2c2c2] h-[2px] rounded-2xl"></div>
                    {connectors.map((connector)=>{
                        if (supportedWallet.includes(connector.id)) {
                            return (
                                <Fragment key={connector.id}>
                                    <div className="grid gap-2 lg:gap-4 wallet-modal-row my-2 lg:my-6">
                                        <div className=""><Image src={`/images/${connector.id}.svg`} alt="" width={60} height={60} /></div>
                                        <div className="font-medium text-sm lg:text-2xl text-left flex-10 text-black dark:text-white">
                                            {connector.name}
                                            {!connector.ready && ' (unsupported)'}
                                            {isLoading &&
                                                connector.id === pendingConnector?.id &&
                                                ' (connecting)'}
                                        </div>
                                        <button className="rounded-xl connect-btn py-2 px-6 shrink-0 max-lg:text-sm " disabled={!connector.ready} onClick={() => connect({ connector })}>connect</button>
                                    </div>
                                    <div className="bg-[#c2c2c2] h-[2px] rounded-2xl dark:bf-[#606060]"></div>
                                </Fragment>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default WalletModal;
