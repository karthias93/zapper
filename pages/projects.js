import Image from 'next/image';
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useAccount } from 'wagmi';
import Router from 'next/router';
import Background from "../components/Background";
import axios from 'axios';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table';
import Link from 'next/link';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

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
        axios.get(`https://api.debank.com/project/v2/list`)
            .then(res=>{
                const data = res.data.data;
                setApps(data)
            })
    }, [])
    const columns = useMemo(() => [
          {
            Header: 'Name',
            accessor: (row, index) => {
                return (
                    <div>
                        <Image src={row.logo_url} alt='' width={24} height={24} />
                        <div>{row.name}</div>
                    </div>
                )}
          },
          {
            Header: '',
            accessor: 'logo_url',
            show: false
          },
          {
            Header: '',
            accessor: 'id',
            show: false
          },
          {
            Header: 'Tags',
            accessor: (row, index) => {
                return (
                    <div>
                        {row.tag_ids.map((tag)=>{
                            return <div key={tag}>{tag}</div>
                        })}
                    </div>
                )}
          },
          
          {
            Header: 'User Deposits',
            accessor:  (row, index) => Intl.NumberFormat('en', { style: 'currency', currency: 'USD', notation: 'compact' }).format(row.total_user_usd)
          },
          {
            Header: 'Invertors',
            accessor: 'total_user_count',
          },
          {
            Header: 'Genesis Date',
            accessor: (row, index) => `${new Date(row.publish_at * 1000).toLocaleDateString('zh-Hans-CN')}`,
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
                            initialState: { pageIndex: 0, hiddenColumns: ['logo_url','id'], sortBy: [{id:'User Deposits', desc: true}] },
                            filterTypes,

                        },
                        useGlobalFilter,
                        useSortBy,
                        usePagination,
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
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i} className="p-5 text-left border-b border-inherit dark:border-[#252a37] bg-[#D3D3D3] dark:bg-black">
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? AiFillCaretDown
                                                        : AiFillCaretUp
                                                    : ''}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, k) => {
                                    prepareRow(row);
                                    return (
                                        <Link href={`/projects/${row.original.id}`} key={k}>
                                            <tr {...row.getRowProps()} className="cursor-pointer hover:bg-light-card dark:hover:bg-black">
                                                {row.cells.map((cell, m)  => {
                                                    console.log(cell)
                                                    return (
                                                        <td {...cell.getCellProps()} key={m} className={`p-5 border-b border-inherit dark:border-[#252a37] dark:bg-black`}>{cell.render('Cell')}</td>
                                                    )
                                                })}
                                            </tr>
                                        </Link>
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
