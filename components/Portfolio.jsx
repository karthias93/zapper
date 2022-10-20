import React, { Fragment } from "react";
import Image from "next/image";
import { chains } from "../constants";

const Portfolio = ({looksRare, coinBalance, tokens}) => {
    return (
        <Fragment>
            <div className="flex mb-10">
                <div className="w-4/6 bg-white min-h-[100px] mr-6 flex flex-wrap p-8 card-wrapper gap-5">
                    {chains.map((chain)=>{
                        return (
                            <div className="flex coin-list" key={chain.name}>
                                <Image src={chain.img} alt="" width={40} height={40}/>
                                <div className="ml-2">
                                    <div className="text-xs font-medium">Assets on {chain.name.charAt(0).toUpperCase()}{chain.name.slice(1)}</div>
                                    <div className="flex items-center">
                                        <div className="font-semibold flex-1">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(coinBalance[chain.key] ? coinBalance[chain.key].balance?.toFixed() : 0)}</div>
                                        <div className="flex-1 text-xs text-center leading-normal">{coinBalance[chain.key] ? coinBalance[chain.key].percentage?.toFixed() : 0}%</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="w-2/6 bg-white card-wrapper h-fit flex justify-around gap-8 p-8">
                    <div className="flex-1 bg-[#D3D3D3] rounded flex justify-center items-center dark:bg-black">
                        <div className="mr-2">
                            <Image height={15} width={14} src={`/images/wallet.svg`} alt=""/>
                        </div>
                        <div className="font-semibold">
                            <div className="text-[10px]">Wallet</div>
                            <div className="text-black text-xs dark:text-white">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tokens.total?.toFixed())}</div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#D3D3D3] rounded flex justify-center items-center dark:bg-black">
                        <div className="mr-2">
                            <Image height={18} width={18} src={`/images/looksrare.png`} alt=""/>
                        </div>
                        <div className="p-3 font-semibold">
                            <div className="text-[10px] ">LooksRare</div>
                            <div className="text-black text-xs dark:text-white">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(looksRare.total?.toFixed())}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <Image src={`/images/wallet.svg`} alt="" width={24} height={22} />
                    <div className="ml-4 font-semibold text-lg">Wallet</div>
                </div>
                <div className="text-black font-semibold text-lg">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tokens.total?.toFixed())}</div>
            </div>
            <div className="card-wrapper px-8 py-6 bg-white mb-10">
                <div className="table w-full">
                    <div className="table-header-group bg-[#D3D3D3] dark:bg-black">
                        <div className="table-row text-xs font-medium">
                            <div className="table-cell text-center py-2"></div>
                            <div className="table-cell text-left py-2">Assets</div>
                            <div className="table-cell text-left py-2">Price</div>
                            <div className="table-cell text-left py-2">Balance</div>
                            <div className="table-cell text-left py-2">Value</div>
                        </div>
                    </div>
                    <div className="table-row-group font-medium text-sm items-center">
                        {tokens.wallet?.map((w,i)=>{
                            return (
                                <div className="table-row" key={i}>
                                    <div className="table-cell text-center py-2">
                                        <Image src={w.logo} alt="" width={22} height={22} />
                                    </div>
                                    <div className="table-cell py-2">{w.label}</div>
                                    <div className="table-cell py-2">{w.price.toFixed(2)}</div>
                                    <div className="table-cell py-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(w.balance?.toFixed(2))}</div>
                                    <div className="table-cell py-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(w.value?.toFixed())}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <Image src={looksRare.logo} alt="" width={24} height={22} />
                    <div className="ml-4 font-semibold text-lg">{looksRare.appName}</div>
                </div>
                <div className="text-black font-semibold text-lg">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(looksRare.total?.toFixed())}</div>
            </div>
            <div className="card-wrapper px-8 py-6 bg-white mb-10">
                <div className="table w-full">
                    <div className="table-header-group bg-[#D3D3D3] dark:bg-black">
                        <div className="table-row text-xs font-medium">
                            <div className="table-cell text-center py-2"></div>
                            <div className="table-cell text-left py-2">Assets</div>
                            <div className="table-cell text-left py-2">Price</div>
                            <div className="table-cell text-left py-2">Balance</div>
                            <div className="table-cell text-left py-2">Value</div>
                        </div>
                    </div>
                    <div className="table-row-group font-medium text-sm items-center">
                        {looksRare.wallet?.map((w,i)=>{
                            return (
                                <div className="table-row" key={i}>
                                    <div className="table-cell text-center py-2">
                                        <Image src={w.logo} alt="" width={22} height={22} />
                                    </div>
                                    <div className="table-cell py-2">{w.label}</div>
                                    <div className="table-cell py-2">{w.price.toFixed(2)}</div>
                                    <div className="table-cell py-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(w.balance?.toFixed(2))}</div>
                                    <div className="table-cell py-2">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(w.value?.toFixed())}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Portfolio;
