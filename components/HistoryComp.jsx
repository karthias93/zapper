import React, { Fragment, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, selectTransactionState } from "../store/transactionSlice";
import { useRouter } from "next/router";
import { timeDifference } from "../utils/common";

const HistoryComp = () => {
    const dispatch = useDispatch();
    const transactionState = useSelector(selectTransactionState);
    const router = useRouter();
    const {id} = router.query;
    useEffect(()=>{
       if(id) dispatch(fetchTransactions(id))
    }, [dispatch, id]);
    return (
        <Fragment>
            {transactionState.map(trans=>{
                return (
                    <div className="card-wrapper px-8 py-6 bg-white mb-10" key={trans.id}>
                        <div className="flex justify-around max-lg:flex-col gap-5">
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <Image src={`/images/coin-1.svg`} alt="" width={27} height={27} />
                                    <div className="text-xs font-small ml-2">{timeDifference(Date.now(), trans.time_at)}</div>
                                </div>
                                <div className="flex">
                                    <div className="mr-3 text-lg font-small">{trans?.other_addr.substr(0,5)}...${(trans?.other_addr.substr(-10))}</div>
                                    <Image src={`/images/copy.svg`} alt="" width={15} height={17} />
                                </div>
                            </div>
                            <div className="flex-1 flex items-center">
                                <Image src={`/images/note.svg`} alt="" width={24} height={25} />
                                <div className="ml-3 font-small">{trans?.cate_id ? trans.cate_id : trans?.tx?.name}</div>
                            </div>
                            <div className="flex-1">
                                {trans?.sends[0]?.amount && <div className="flex mb-3">
                                    <Image src={`/images/media.svg`} alt="" width={12} height={8} />
                                    <div className="ml-3 font-small text-xs text-red">{`-${trans.sends[0].amount.toFixed(2)}`}</div>
                                </div>}
                                {trans?.receives[0]?.amount && <div className="flex">
                                    <Image src={`/images/solidity.svg`} alt="" width={8} height={13} />
                                    <div className="ml-3 font-small text-xs text-[#00B01C]">+{trans?.receives[0]?.amount.toFixed(2)} ETH</div>
                                </div>}
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-small mb-3">Gas Fee:</div>
                                <div className="font-small">{trans.tx?.eth_gas_fee.toFixed(4)} ETH</div>
                            </div>
                        </div>
                            
                        {/*<div>
                            <button type='button'>Load More</button>
            </div>*/}
                    </div>
                )
            })}
        </Fragment>
    )
}

export default HistoryComp;
