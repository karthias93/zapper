import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from 'next/router';
import Background from "../../components/Background";
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import { fetchProtocol, fetchProtocolUserList, selectProtocolState } from "../../store/protocolSlice";
import Image from "next/image";
import Link from "next/link";

export default function Protocol() {
    const protocolState = useSelector(selectProtocolState);
    const [data, setData] = useState([]);
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { token } = router.query;

    useEffect(()=>{
        if(token) {
            dispatch(fetchProtocol(token));
            dispatch(fetchProtocolUserList(token));
        }
    }, [dispatch, token]);

    useEffect(()=>{
        if (protocolState?.userData?.user_list) {
            setData(protocolState.userData.user_list);
        }
        if (protocolState?.detail) {
            setDetail(protocolState.detail)
        }
    }, [protocolState])

    const columns = useMemo(() => [
        {
          Header: '#',
          accessor: (row, index) => index + 1
        },
        {
          Header: 'User',
          accessor: (row, index) => `${row.user_addr.substr(0,5)}...${row.user_addr.substr(-10)}`
        },
        {
          Header: 'Net worth',
          accessor: (row, index) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.usd_value)
        },
        {
          Header: 'Share',
          accessor: (row, index) => (row.share*100).toFixed(2)
        },
        {
            Header: 'Updated at',
            accessor: (row, index) => `${new Date(row.update_at * 1000).toLocaleDateString('zh-Hans-CN')} ${new Date(row.update_at * 1000).toLocaleTimeString("it-IT")}`
        },
      ], []);
    const tableInstance = useTable({ 
                            columns,
                            data
                        }
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
            <div className="main-content w-full ml-0 lg:ml-64 min-h-screen">
                <Background />
                <div className="container m-auto px-0 lg:px-4 lg:px-16">
                    <div className="welcome-page">
                        <Header page=""/>
                        <div className="project-details bg-light-card lg:rounded-lg shadow shadow-white pb-5">
                            <div className="p-5 dark:bg-black ">
                                <div className="flex items-center ">
                                    <Image src={detail?.logo_url} alt="" width={40} height={40} />
                                    <div className="ml-3 font-semibold text-2xl">{detail?.name}</div>
                                </div>
                                <div className="mt-5 flex">
                                    <Link href={detail?.site_url ? detail.site_url : '/'}><div className="text-[#5089FF] text-sm">{detail?.site_url}</div></Link>   
                                    <div className="w-px h-4 bg-[#8b93a7] mx-5"></div>
                                    <div className="text-sm">On the chain {detail?.chain}</div>
                                </div>
                                <div className="mt-5 flex">
                                    <div className="text-sm mr-3">Genesis date</div>
                                    <div className="font-semibold text-sm">{new Date(detail?.publish_at * 1000).toLocaleDateString('zh-Hans-CN')}</div>
                                </div>
                            </div>
                            <div className="dark:bg-black text-sm p-5">User deposits: <span className="font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(protocolState?.userData?.total_user_usd)}</span></div>
                            <div className="max-lg:overflow-x-auto">
                                <table className="table-auto w-full rounded text-sm " {...getTableProps()}>
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
                                        {rows.map((row, k) => {
                                            prepareRow(row)
                                            return (
                                                <Link href={`/profile/${row.original.user_addr}`} key={k}>
                                                <tr {...row.getRowProps()} className="hover:bg-[#D3D3D3] cursor-pointer">
                                                    {row.cells.map((cell, m)  => {
                                                        return (
                                                            <td {...cell.getCellProps()} key={m} className={`p-5 border-b border-inherit dark:border-[#252a37] dark:bg-black`}>
                                                                {cell.render('Cell')}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                                </Link>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
