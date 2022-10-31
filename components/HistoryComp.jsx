import React, { Fragment, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, selectTransactionState } from "../store/transactionSlice";
import { useRouter } from "next/router";
import { timeDifference } from "../utils/common";
import CopyToClipboard from "react-copy-to-clipboard";
import Copy from "../public/images/copy.svg";
import toast from "react-hot-toast";
import { tokenImg } from "../constants";

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
            {transactionState.history_list.map(trans=>{
                return (
                    <div className="card-wrapper px-8 py-6 bg-white mb-10" key={trans.id}>
                        <div className="flex justify-around max-lg:flex-col gap-5">
                            <div className="flex-1">
                                <div className="flex items-center">
                                    <Image src={tokenImg[trans.chain] ? tokenImg[trans.chain] : `/images/coin-1.svg`} alt="" width={27} height={27} />
                                    <div className="text-xs font-small ml-2">{`${new Date(trans.time_at * 1000).toLocaleDateString('zh-Hans-CN')} ${new Date(trans.time_at * 1000).toLocaleTimeString("it-IT")}`}</div>
                                </div>
                                <div className="flex">
                                   {trans?.other_addr && <Fragment><div className="mr-3 text-lg font-small">{trans?.other_addr?.substr(0,5)}...{(trans?.other_addr?.substr(-10))}</div>
                                    <CopyToClipboard text={trans?.other_addr} onCopy={() => toast('Copied')}>
                                        <Copy width={19} height={22} className="icons"/>
                                    </CopyToClipboard></Fragment>}
                                </div>
                            </div>
                            <div className="flex-1 flex items-center">
                                <Image src={`/images/note.svg`} alt="" width={24} height={25} />
                                <div className="ml-3 font-small">{trans?.cate_id ? trans.cate_id : trans?.tx?.name ? trans.tx.name : 'Contract Interaction'}</div>
                            </div>
                            <div className="flex-1">
                                {trans?.sends[0]?.amount && <div className="flex mb-3">
                                    <Image src={transactionState.token_dict[trans?.sends[0]?.token_id]?.logo_url ? transactionState.token_dict[trans?.sends[0]?.token_id]?.logo_url : `/images/default-history.svg`} alt="" width={16} height={16} />
                                    <div className="ml-3 font-small text-xs text-red">{`-${(trans.sends[0].amount * (trans.sends[0].price ? trans.sends[0].price : 1)).toFixed(2)}`} {transactionState.token_dict[trans?.sends[0]?.token_id]?.optimized_symbol}</div>
                                </div>}
                                {trans?.receives[0]?.amount && <div className="flex">
                                    <Image src={transactionState.token_dict[trans?.receives[0]?.token_id]?.logo_url ? transactionState.token_dict[trans?.receives[0]?.token_id]?.logo_url : `/images/default-history.svg`} alt="" width={16} height={16} />
                                    <div className="ml-3 font-small text-xs text-[#00B01C]">+{(trans?.receives[0]?.amount * (trans.receives[0].price ? trans.receives[0].price : 1)).toFixed(2)} {transactionState.token_dict[trans?.receives[0]?.token_id]?.optimized_symbol}</div>
                                </div>}
                            </div>
                            <div className="flex-1">
                                {trans.tx?.eth_gas_fee.toFixed(4) && <Fragment>
                                    <div className="text-xs font-small mb-3">Gas Fee:</div>
                                    <div className="font-small">{trans.tx?.eth_gas_fee.toFixed(4)} {trans.chain.toUpperCase()} ({new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(trans.tx?.usd_gas_fee)})</div>
                                </Fragment>}
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
