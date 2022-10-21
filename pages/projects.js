import Image from 'next/image';
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from 'wagmi';
import Router from 'next/router';
import Background from "../components/Background";
import axios from 'axios';
import { useTable } from 'react-table';

export default function Projects() {
    const [apps, setApps] = useState([]);
    useEffect(()=>{
        axios.get(`/data/apps.json`)
            .then(res=>{
                const data = res.data.pageProps.tableData;
                setApps(data)
            })
    }, [])
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
    const tableInstance = useTable({ columns, data: apps })
 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content w-full">
                <Background />
                <div className="container m-auto px-16">
                <div className="welcome-page">
                    <Header page="Defi List"/>
                    <div className="projects-card">
                        <table className="table-auto w-full rounded" {...getTableProps()}>
                            <thead>
                                {headerGroups.map((headerGroup, index) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                        {headerGroup.headers.map((column, i) => (
                                            <th {...column.getHeaderProps()} key={i} className="p-5 text-left border-b border-inherit bg-[#D3D3D3]">{column.render('Header')}</th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row, k) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} key={k}>
                                            {row.cells.map((cell, m)  => {
                                                return (
                                                    <td {...cell.getCellProps()} key={m} className={`p-5 border-b border-inherit`}>
                                                        {cell.column.id === 'tvl' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(cell.value).toFixed(2)) : cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
