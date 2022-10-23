import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/layout/Sidebar";
import Header from "../../../components/layout/Header";
import { useEffect, useState } from "react";
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import Background from "../../../components/Background";
import { fetchPriceList, selectPriceState } from "../../../store/priceSlice";
import { useQuery } from "@apollo/client";
import { supportedTokenWithSiblings } from "../../../graphql/query";
import Image from "next/image";
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer, YAxis, ReferenceLine, Label, Legend } from "recharts";

export default function Token() {
    const priceState = useSelector(selectPriceState);
    const [timeFrame, setTimeFrame] = useState('day');
    const [tokenInfo, setTokeninfo] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [opacity, setOpacity] = useState(1);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(0);
    const [startPrice, setStartPrice] = useState(0);
    const [diffPercentage, setDiffPercentage] = useState(0);
    const dispatch = useDispatch();
    const router = useRouter();
    const { id, network} = router.query;
    const { data, loading } = useQuery(supportedTokenWithSiblings, { variables: { network: `${network?.toUpperCase()}_MAINNET`, address: id}});

    useEffect(()=>{
       if(id) dispatch(fetchPriceList({id, network, timeFrame}));
    }, [dispatch, id, network, timeFrame]);

    useEffect(()=>{
        const index = data?.supportedTokenWithSiblings?.findIndex((d)=>d.address === id);
        if (index && index !== -1) {
            setTokeninfo(data.supportedTokenWithSiblings[index]);
        }
    }, [data, id]);

    useEffect(()=>{
        if (priceState?.prices) {
            const onlyPrice = [];
            const data = priceState?.prices?.map((p, i)=>{
                onlyPrice.push(p[1]);
                return {name: p[0], uv: p[1]}
            })
            setSelectedPrice(priceState.prices[priceState.prices.length-1][1]);
            setStartPrice(priceState.prices[0][1])
            console.log(selectedPrice)
            setMinPrice(Math.min(...onlyPrice))
            setMaxPrice(Math.max(...onlyPrice))
            setChartData(data);

            setDiffPercentage((100 * ((selectedPrice - startPrice) / ( (selectedPrice+startPrice)/2) )));
        }
    }, [priceState, selectedPrice, startPrice])

    const handleLegendMouseEnter = (data, e, d) => {
        console.log('dot click', e.target);
        //setOpacity(0.5);
      };
    
    const handleClickDot = (data, e) => {
        console.log('dot click', data, e);
    }
    
    const handleLegendMouseLeave = () => {
        setOpacity(1);
    };

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content w-full">
                <Background />
                <div className="container m-auto px-0 lg:px-16">
                    <div className="welcome-page">
                        <Header page=""/>
                        <div className="trading-view bg-light-card rounded-lg shadow shadow-white pb-5">
                            <div className="flex justify-between p-5">
                                <div className="">
                                    <div className="capitalize mb-3">
                                        {network}
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Image src={tokenInfo?.imgUrl} alt="" width={30} height={30}/>
                                        {tokenInfo?.name && <div className="ml-3 text-2xl font-semibold">{`${tokenInfo?.name} (${tokenInfo.symbol})`}</div>}
                                    </div>
                                </div>
                                <div>
                                    <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="text-white bg-gradient-to-r from-[#FEAA02] to-[#E15310] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={()=>setShowDropdown(!showDropdown)}>
                                        <div className="flex justify-center items-center">
                                            <Image src={tokenInfo?.imgUrl} alt="" width={25} height={25}/>
                                            <div className="ml-3 font-semibold capitalize">{network}</div>
                                        </div>
                                        <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    {showDropdown && <div id="dropdown" className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                            {data?.supportedTokenWithSiblings?.map((token, index)=>{
                                                return (
                                                    <div className="flex justify-left items-center px-5 py-2" key={index}>
                                                        <Image src={token?.imgUrl} alt="" width={25} height={25}/>
                                                        <div className="ml-3 font-semibold lowercase">{token.network.split('_')[0]}</div>
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>}
                                </div>
                            </div>
                            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                                <ul className="flex flex-wrap -mb-px">
                                    <li className="mr-2">
                                        <a href="#" className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500 active" aria-current="page">Overview</a>
                                    </li>
                                    <li className="mr-2">
                                        <a href="#" className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Owners</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="p-5 font-semibold text-3xl flex">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 5, }).format(selectedPrice)}<div className="font-normal text-sm text-[#00B01C]">{diffPercentage.toFixed(2)}</div></div>
                                <ResponsiveContainer width="95%" height={400}>
                                    <LineChart margin={{top: 25, right: 25, left: 25, bottom: 25}} data={chartData}>
                                        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeOpacity={opacity} strokeWidth={2} dot={false} onMouseEnter={handleLegendMouseEnter}/>
                                        <YAxis type="number" domain={['dataMin', 'dataMax']} axisLine={false} ticks={[minPrice, maxPrice]} orientation='right' tickFormatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 5 }).format(value)} tickLine={false} />
                                        <Tooltip />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="flex gap-5 m-5">
                                    <div className={`border border-black text-black font-semibold p-3 mb-5 rounded-xl cursor-pointer ${timeFrame==='hour' ? 'bg-blue1 text-white' : ''}`} onClick={()=>setTimeFrame('hour')}>1H</div>
                                    <div className={`border border-black text-black font-semibold p-3 mb-5 rounded-xl cursor-pointer ${timeFrame==='day' ? 'bg-blue1 text-white' : ''}`} onClick={()=>setTimeFrame('day')}>1D</div>
                                    <div className={`border border-black text-black font-semibold p-3 mb-5 rounded-xl cursor-pointer ${timeFrame==='week' ? 'bg-blue1 text-white' : ''}`} onClick={()=>setTimeFrame('week')}>1W</div>
                                    <div className={`border border-black text-black font-semibold p-3 mb-5 rounded-xl cursor-pointer ${timeFrame==='month' ? 'bg-blue1 text-white' : ''}`} onClick={()=>setTimeFrame('month')}>1M</div>
                                    <div className={`border border-black text-black font-semibold p-3 mb-5 rounded-xl cursor-pointer ${timeFrame==='year' ? 'bg-blue1 text-white' : ''}`} onClick={()=>setTimeFrame('year')}>1Y</div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 p-5 mx-5 mb-0 border border-black rounded-t-lg">
                                    <div>
                                        <div className="font-semibold mb-3">
                                            Market cap
                                        </div>
                                        <div>
                                            {Intl.NumberFormat('en-US', {
                                                notation: "compact",
                                                maximumFractionDigits: 1
                                            }).format(priceState?.marketCap?.usd)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold mb-3">
                                            Circulating supply
                                        </div>
                                        <div>
                                            {Intl.NumberFormat('en-US', {
                                                notation: "compact",
                                                maximumFractionDigits: 1
                                            }).format(priceState?.circulatingSupply)} {priceState?.symbol}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-semibold mb-3">
                                            24 hours volume
                                        </div>
                                        <div>
                                        {Intl.NumberFormat('en-US', {
                                                notation: "compact",
                                                maximumFractionDigits: 1
                                            }).format(priceState?.volume24h?.usd)}
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 p-5 mx-5 border border-t-0 border-black rounded-b-lg">
                                    <div>
                                        <div className="font-semibold mb-3">
                                            All-time high
                                        </div>
                                        <div className="flex">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 5, }).format(priceState?.ath?.price?.usd)}
                                            <div className={`${priceState?.ath?.percent?.usd < 0 ? 'text-red' : 'text-[#00B01C]'} text-sm`}>{priceState?.ath?.percent?.usd}</div>
                                        </div>
                                        <div>{priceState?.ath?.date?.usd}</div>
                                    </div>
                                    <div className="">
                                        <div className="font-semibold mb-3">
                                            All-time low
                                        </div>
                                        <div>
                                            <div className="flex">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 5, }).format(priceState?.atl?.price?.usd)}
                                                <div className={`${priceState?.atl?.percent?.usd < 0 ? 'text-red' : 'text-[#00B01C]'} text-sm`}>{priceState?.atl?.percent?.usd}</div>
                                            </div>
                                            <div>{priceState?.atl?.date?.usd}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
