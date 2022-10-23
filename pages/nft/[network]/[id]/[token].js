import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../../components/layout/Sidebar";
import Header from "../../../../components/layout/Header";
import { useEffect, useState, useMemo } from "react";
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import Background from "../../../../components/Background";
import { fetchPriceList, selectPriceState } from "../../../../store/priceSlice";
import { useQuery } from "@apollo/client";
import { supportedTokenWithSiblings } from "../../../../graphql/query";
import Image from "next/image";
import Copy from "../../../../public/images/copy.svg";
import { useTable, usePagination } from 'react-table';
import axios from 'axios';

export default function Nft() {
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

    const columns = useMemo(() => [
        {
          Header: '#',
          accessor: 'id', // accessor is the "key" in the data
        },
        {
          Header: 'App',
          accessor: 'appName',
        },
        {
          Header: 'Network',
          accessor: 'network',
        },
        {
          Header: 'TIV',
          accessor: 'tvl',
        },
      ], []);
    const [apps, setApps] = useState([]);
    useEffect(()=>{
        axios.get(`/data/apps.json`)
            .then(res=>{
                const data = res.data.pageProps.tableData;
                setApps(data)
            })
    }, [])
    const tableInstance = useTable({ 
                            columns,
                            data: apps,
                            initialState: { pageIndex: 0 },
                        },
                        usePagination
                    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = tableInstance;

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content w-full ml-64">
                <Background />
                <div className="container m-auto px-16">
                    <div className="welcome-page">
                        <Header page=""/>
                        <div className="nft-view bg-light-card rounded-lg shadow shadow-white pb-5 grid grid-cols-12">
                            <div className="col-span-4 p-5">
                                <video width="100%" className="rounded-lg mb-5">
                                    <source src="https://web.zapper.fi/images/?url=ipfs%3A%2F%2FQmWXbbhG3pNoPC8LkoW1KD9vMnUBbMp7D84my9GCLG7Hkr&width=500&checksum=0e961" type="video/mp4" />
                                </video>
                                <div className="rounded-lg bg-[#D3D3D3] shadow shadow-white text-sm">
                                    <div className="flex justify-between p-3 border-b border-white">
                                        <div className="font-semibold">Token ID</div>
                                        <div className="flex items-center">
                                            <div className="mr-4">1</div>
                                            <Copy />
                                        </div>
                                    </div>
                                    <div className="flex justify-between p-3 border-b border-white">
                                        <div className="font-semibold">Address</div>
                                        <div className="flex items-center">
                                            <div className="mr-4">1</div>
                                            <Copy />
                                        </div>
                                    </div>
                                    <div className="flex justify-between p-3 border-b border-white">
                                        <div className="font-semibold">Network</div>
                                        <div className="flex items-center">
                                            <div className="mr-4">1</div>
                                            <Copy />
                                        </div>
                                    </div>
                                    <div className="flex justify-between p-3 border-b border-white">
                                        <div className="font-semibold">Standard</div>
                                        <div className="flex items-center">
                                            <div className="mr-4">1</div>
                                            <Copy />
                                        </div>
                                    </div>
                                    <div className="p-3 border-b border-white">
                                        <div className="font-semibold">Description</div>
                                        <div className="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 p-5">
                                <div>Zeus ZUZ</div>
                                <div>Owned by 111 accounts</div>
                                <div className="flex w-1/4">
                                    <div>
                                        <div>Est. Value</div>
                                        <div>Ξ 0.08</div>
                                    </div>
                                    <div>
                                        <div>Last</div>
                                        <div>Ξ 0.08</div>
                                    </div>
                                    <div>
                                        <div>Supply</div>
                                        <div>132</div>
                                    </div>
                                </div>
                                <div>
                                    Properties
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <div>
                                            <div>Min balance</div>
                                            <div>Ξ 0.08</div>
                                        </div>
                                        <div>.1</div>
                                        <div>1(50% have this)</div>
                                    </div>
                                </div>
                                <div>
                                <table className="table-auto w-full rounded" {...getTableProps()}>
                                    <thead>
                                        {headerGroups.map((headerGroup, index) => (
                                            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                                {headerGroup.headers.map((column, i) => (
                                                    <th {...column.getHeaderProps()} key={i} className="p-5 text-left border-b border-inherit dark:border-[#252a37] bg-[#D3D3D3] dark:bg-black">{column.render('Header')}</th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                        {page.map((row, k) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()} key={k}>
                                                    {row.cells.map((cell, m)  => {
                                                        return (
                                                            <td {...cell.getCellProps()} key={m} className={`p-5 border-b border-inherit dark:border-[#252a37] dark:bg-black`}>
                                                                {cell.column.id === 'tvl' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(cell.value).toFixed(2)) : cell.render('Cell')}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="pagination dark:bg-black flex justify-center py-5">
                                    <div className='dark:border-[#2c3a43] border rounded-2xl flex p-3 gap-5'>
                                        <div className="" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2rem" width="1.2rem" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"></path></g></svg>
                                        </div>
                                        <div className="">
                                            <span className="line-height _1nv4amt1a9 _1nv4amt17m">{pageIndex + 1} / {pageOptions.length}</span>
                                        </div>
                                        <div className="" onClick={() => nextPage()} disabled={!canNextPage}>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1.2rem" width="1.2rem" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></g></svg>
                                        </div>
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
