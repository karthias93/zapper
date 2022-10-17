import React, { Fragment } from "react";
import Image from "next/image";

const HistoryComp = () => {
    console.log('-----')
    return (
        <Fragment>
            <div className="card-wrapper px-8 py-6 bg-white mb-10">
                <div>
                    <div>
                        <Image src={`/images/coin-1.svg`} alt="" width={27} height={27} />
                        <div>
                            <div>0x3c45…68x0f51e</div>
                            <Image src={`/images/copy.svg`} alt="" width={15} height={17} />
                        </div>
                    </div>
                    <div>
                        <Image src={`/images/note.svg`} alt="" width={24} height={25} />
                        <div>Contract Interation</div>
                    </div>
                    <div>
                        <div>
                            <Image src={`/images/note.svg`} alt="" width={12} height={8} />
                            <div>-1 Majo</div>
                        </div>
                        <div>
                            <Image src={`/images/solidity.svg`} alt="" width={8} height={13} />
                            <div>+0.00658 ETH</div>
                        </div>
                    </div>
                    <div>
                        <div>Gas Fee:</div>
                        <div>0.0000751 ETH</div>
                    </div>
                </div>
                <div>
                    <button type='button'>Load More</button>
                </div>
            </div>
        </Fragment>
    )
}

export default HistoryComp;
