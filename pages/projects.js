import Image from 'next/image';
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useAccount } from 'wagmi';
import Router from 'next/router';
import Background from "../components/Background";
import axios from 'axios';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce } from 'react-table';

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
       setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <div className='dark:bg-black p-5'>
        <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-black" viewBox="0 0 20 20"></svg>
            </span>
            <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full lg:w-1/4 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm dark:bg-[#212121]" type="text" name="search" value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
            }}
            placeholder={`${count} records...`}/>
        </label>
      </div>
    )
  }

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  // Let the table remove the filter if the string is empty
  fuzzyTextFilterFn.autoRemove = val => !val

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
            Header: '',
            accessor: 'appId',
            show: false
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
    
    const filterTypes = useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id]
                return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
            },
        }),
        []
        )
    const tableInstance = useTable({ 
                            columns,
                            data: apps,
                            initialState: { pageIndex: 0, hiddenColumns: ['appId'] },
                            filterTypes,

                        },
                        useGlobalFilter,
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
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = tableInstance;

    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content w-full ml-0 lg:ml-64">
                <Background />
                <div className="container m-auto px-0 lg:px-16">
                <div className="welcome-page">
                    <Header page="Defi List"/>
                    <div className="projects-card">
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                        <table className="table-auto w-full rounded max-lg:block text-sm max-lg:overflow-x-auto" {...getTableProps()}>
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
                                                console.log(cell)
                                                return (
                                                    <td {...cell.getCellProps()} key={m} className={`p-5 border-b border-inherit dark:border-[#252a37] dark:bg-black`}>
                                                        {cell.column.id === 'tvl' ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(cell.value).toFixed(2)) : cell.column.id === 'appName' ? <div className='flex'><img src={`https://storage.googleapis.com/zapper-fi-assets/apps/${cell.row.values.appId}.png`} alt="" width={24} height={24}/><span className='ml-3'>{cell.value}</span></div> : cell.render('Cell')}
                                                        
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
    )
}
