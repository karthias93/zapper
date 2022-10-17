import React, { Fragment } from "react";
import Image from "next/image";

const Portfolio = () => {
    return (
        <Fragment>
            <div className="flex mb-10">
                <div className="w-4/6 bg-white min-h-[100px] mr-6 flex justify-between flex-wrap p-8 card-wrapper gap-5">
                    <div className="flex coin-list">
                        <Image src={'/images/coin-1.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-2.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-3.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-4.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-5.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-6.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-7.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-8.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex coin-list">
                        <Image src={'/images/coin-9.svg'} alt="" width={40} height={40}/>
                        <div className="ml-2">
                            <div className="text-sm font-medium">Assets on ETH</div>
                            <div className="flex items-center">
                                <div className="font-semibold flex-1">$24k</div>
                                <div className="flex-1 text-xs text-center leading-normal">12%</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-2/6 bg-white card-wrapper h-fit flex justify-around gap-8 p-8">
                    <div className="flex-1 bg-[#D3D3D3] rounded flex justify-center items-center">
                        <div className="mr-2">
                            <Image height={15} width={14} src={`/images/wallet.svg`} alt=""/>
                        </div>
                        <div className="font-semibold">
                            <div className="text-[10px]">Wallet</div>
                            <div className="text-black text-xs">$24,265,896</div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#D3D3D3] rounded flex justify-center items-center">
                        <div className="mr-2">
                            <Image height={18} width={18} src={`/images/coin-4.svg`} alt=""/>
                        </div>
                        <div className="p-3 font-semibold">
                            <div className="text-[10px] ">Wallet</div>
                            <div className="text-black text-xs">$24,265,896</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <Image src={`/images/wallet.svg`} alt="" width={24} height={22} />
                    <div className="ml-4 font-semibold text-lg">Wallet</div>
                </div>
                <div className="text-black font-semibold text-lg">$24,265,896</div>
            </div>
            <div className="card-wrapper px-8 py-6 bg-white mb-10">
                <div className="table w-full">
                    <div className="table-header-group bg-[#D3D3D3]">
                        <div className="table-row text-xs font-medium">
                            <div className="table-cell text-center py-2"></div>
                            <div className="table-cell text-left py-2">Assets</div>
                            <div className="table-cell text-left py-2">Price</div>
                            <div className="table-cell text-left py-2">Balance</div>
                            <div className="table-cell text-left py-2">Value</div>
                        </div>
                    </div>
                    <div className="table-row-group font-medium text-sm items-center">
                        <div className="table-row">
                            <div className="table-cell text-center py-2">
                                <Image src={`/images/coin-1.svg`} alt="" width={22} height={22} />
                            </div>
                            <div className="table-cell py-2">ETH</div>
                            <div className="table-cell py-2">$1286.71</div>
                            <div className="table-cell py-2">19.094</div>
                            <div className="table-cell py-2">$24,596</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell text-center py-2">
                                <Image src={`/images/coin-6.svg`} alt="" width={22} height={22} />
                            </div>
                            <div className="table-cell py-2">BTC</div>
                            <div className="table-cell py-2">$19150.40</div>
                            <div className="table-cell py-2">19.094</div>
                            <div className="table-cell py-2">$24,596</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                    <Image src={`/images/wallet.svg`} alt="" width={24} height={22} />
                    <div className="ml-4 font-semibold text-lg">Wallet</div>
                </div>
                <div className="text-black font-semibold text-lg">$24,265,896</div>
            </div>
            <div className="card-wrapper px-8 py-6 bg-white mb-10">
                <div className="table w-full">
                    <div className="table-header-group bg-[#D3D3D3]">
                        <div className="table-row text-xs font-medium">
                            <div className="table-cell text-center py-2"></div>
                            <div className="table-cell text-left py-2">Assets</div>
                            <div className="table-cell text-left py-2">Price</div>
                            <div className="table-cell text-left py-2">Balance</div>
                            <div className="table-cell text-left py-2">Value</div>
                        </div>
                    </div>
                    <div className="table-row-group font-medium text-sm items-center">
                        <div className="table-row">
                            <div className="table-cell text-center py-2">
                                <Image src={`/images/coin-1.svg`} alt="" width={22} height={22} />
                            </div>
                            <div className="table-cell py-2">ETH</div>
                            <div className="table-cell py-2">$1286.71</div>
                            <div className="table-cell py-2">19.094</div>
                            <div className="table-cell py-2">$24,596</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell text-center py-2">
                                <Image src={`/images/coin-6.svg`} alt="" width={22} height={22} />
                            </div>
                            <div className="table-cell py-2">BTC</div>
                            <div className="table-cell py-2">$19150.40</div>
                            <div className="table-cell py-2">19.094</div>
                            <div className="table-cell py-2">$24,596</div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Portfolio;
