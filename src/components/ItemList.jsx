/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getEntryItems, getEntryCount, updateEnty, deleteRntry } from "../redux/entrySlice";
import { LinearProgress } from "@material-ui/core";
import { format, formatDistanceStrict } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai"
import { BsCheckCircle } from "react-icons/bs"

function ItemList() {
    const dispatch = useDispatch()
    const entryItemsRV = useSelector(getEntryItems)
    const entryCountRV = useSelector(getEntryCount)
    const [entryList, setEntryList] = useState([])
    const [statusFilter, setStatusFilter] = useState('all')
    const [dateFilter, setDateFilter] = useState('All')
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setLoader(true)
        setTimeout(
            function () {
                setEntryList(entryItemsRV)
                setLoader(false)
            }, 1000);
    }, [entryItemsRV])

    useEffect(() => {
        setLoader(true)
        setTimeout(
            function () {
                if (dateFilter === 'All') {
                    if (statusFilter === 'all') {
                        setEntryList(entryItemsRV)
                        setLoader(false)
                    } else {
                        const filterList = entryItemsRV.filter(item => item.status === statusFilter)
                        setEntryList(filterList)
                        setLoader(false)
                    }
                } else if (dateFilter === 'Today') {
                    const dateFilterList = entryItemsRV.filter(item => format(new Date(item.inTime), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy'))
                    if (statusFilter === 'all') {
                        setEntryList(dateFilterList)
                        setLoader(false)
                    } else {
                        const filterList = dateFilterList.filter(item => item.status === statusFilter)
                        setEntryList(filterList)
                        setLoader(false)
                    }
                } else if (dateFilter === 'Week') {
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
                    const dateFilterList = entryItemsRV.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    if (statusFilter === 'all') {
                        setEntryList(dateFilterList)
                        setLoader(false)
                    } else {
                        const filterList = dateFilterList.filter(item => item.status === statusFilter)
                        setEntryList(filterList)
                        setLoader(false)
                    }
                } else if (dateFilter === 'Month') {
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (30 - today.getDay()));
                    const dateFilterList = entryItemsRV.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    if (statusFilter === 'all') {
                        setEntryList(dateFilterList)
                        setLoader(false)
                    } else {
                        const filterList = dateFilterList.filter(item => item.status === statusFilter)
                        setEntryList(filterList)
                        setLoader(false)
                    }
                }

            }, 1000);
    }, [dateFilter, entryItemsRV, statusFilter])

    const dateFormat = (value) => {
        const val = format(new Date(value), 'dd/MM/yyyy, h:mm a');
        return val
    }

    const handleChangDate = event => {
        if (event.target.value === 'All') {
            setDateFilter('All')
            console.log(`update dateFilter ${event.target.value} `)
        } else {
            if (event.target.value === 'Today') {
                setDateFilter('Today')
                console.log(`update dateFilter ${event.target.value} `)
            } else if (event.target.value === 'Week') {
                setDateFilter('Week')
                console.log(`update dateFilter ${event.target.value} `)
            } else if (event.target.value === 'Month') {
                setDateFilter('Month')
                console.log(`update dateFilter ${event.target.value} `)
            }
        }
    }
    
    const handleChangeStatus = (value) => {
        setStatusFilter(value)
        console.log(`update statusFilter ${value} `)
    }

    const handleUpdate = (value) => {
        console.log(value)
        const dat = new Date(value.inTime)
        const currentdate = new Date()
        const dataval = formatDistanceStrict(dat, currentdate, {
            unit: 'day',
            roundingMethod: 'ceil'
        })
        var totalDate = dataval.replace(/ .*/, '');
        const vCost = value.vehicleType === 'car' ? '50' : value.vehicleType === 'bikr' ? "20" : "10"

        const cost = Number(totalDate) * Number(vCost)

        const ud = {
            id: value.id,
            userName: value.userName,
            userMobileNumber: value.userMobileNumber,
            vehicleNumber: value.vehicleNumber,
            vehicleType: value.vehicleType,
            inTime: value.inTime,
            outTime: new Date(),
            status: 'Done',
            totalDays: Number(totalDate),
            totalAmount: Number(cost)
        }
        dispatch(updateEnty(ud))
    }
    
    const handleDelete = (value) => {
        dispatch(deleteRntry(value))
    }

    const totalDateAndCostDone = (inDate, OutDate, vehicleType,) => {
        const dat = new Date(inDate)
        const currentdate = new Date(OutDate)
        const dataval = formatDistanceStrict(dat, currentdate, {
            unit: 'day',
            roundingMethod: 'ceil'
        })
        var totalDate = dataval.replace(/ .*/, '');
        const vCost = vehicleType === 'car' ? '50' : vehicleType === 'bikr' ? "20" : "10"

        const cost = Number(totalDate) * Number(vCost)
        return `${dataval} / $${cost}`
    }

    const totalDateAndCost = (date, vehicleType) => {
        const dat = new Date(date)
        const currentdate = new Date()
        const dataval = formatDistanceStrict(dat, currentdate, {
            unit: 'day',
            roundingMethod: 'ceil'
        })
        var totalDate = dataval.replace(/ .*/, '');
        const vCost = vehicleType === 'car' ? '50' : vehicleType === 'bikr' ? "20" : "10"

        const cost = Number(totalDate) * Number(vCost)
        return `${dataval} / $${cost}`
    }

    const entryListComponets = entryList.map((item, index) => {
        return (
            <>
                <tr className="h-16 border border-gray-100 rounded" key={index}>
                    <td className="pl-3">
                        <div className="flex items-center">

                            <p className="text-xs leading-none text-gray-600 ml-2">{item.id}</p>
                        </div>
                    </td>
                    <td className="pl-5">
                        <div className="flex items-center pl-5">
                            <div>
                                <p className="text-xs font-medium leading-none text-gray-700 mr-2">{item.userName}</p>
                                <p className=" text-xs leading-none text-gray-600 mr-2 mt-2">{item.userMobileNumber}</p>
                            </div>
                        </div>

                    </td>
                    <td className="pl-5">
                        <div className="flex items-center pl-5">
                            <div>
                                <p className="text-xs font-medium leading-none text-gray-700 mr-2">{item.vehicleType}</p>
                                <p className=" text-xs leading-none text-gray-600 mr-2 mt-2">{item.vehicleNumber}</p>
                            </div>
                        </div>
                    </td>
                    <td className="pl-5">
                        <div className="flex items-center">
                            <p className="text-xs leading-none text-gray-600 ml-2">{dateFormat(item.inTime)}</p>
                        </div>
                    </td>
                    <td className="pl-5">
                        <div className="flex items-center">
                            <p className="text-xs leading-none text-gray-600 ml-2">{item.status === 'Done' ? dateFormat(item.outTime) : ''}</p>
                        </div>
                    </td>
                    <td className="pl-5">
                        <div className="flex items-center">
                            <p className={`text-xs leading-none text-white ml-2 ${item.status === 'Done' ? " bg-green-300" : "bg-red-400"}  p-1`}>{item.status}</p>
                        </div>
                    </td>
                    <td className="pl-5">
                        <div className="flex items-center">
                            <p className="text-xs leading-none text-gray-600 ml-2">{
                                item.status === 'Done' ? totalDateAndCostDone(item.inTime, item.outTime, item.vehicleType) :
                                    totalDateAndCost(item.inTime, item.vehicleType)}</p>
                        </div>
                    </td>
                    <td className="pl-8 pr-5">
                        <div className="flex items-center">
                            {item.status !== "Done" ?
                                <div className=" flex justify-between items-center">
                                    <button
                                        onClick={() => handleUpdate(item)}
                                        className="text-xs font-bold">
                                        <BsCheckCircle color="green" size={15} />
                                    </button>
                                    <p className="ml-2 mr-2"> / </p>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-xs font-bold">
                                        <AiOutlineDelete color="red" size={17} />
                                    </button>
                                </div>
                                :
                                <div className=" flex justify-between items-center">
                                    <button
                                        className="text-xs font-bold">
                                        --
                                    </button>
                                    <p className="ml-2 mr-2"> / </p>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-xs font-bold">
                                        <AiOutlineDelete color="red" size={17} />
                                    </button>
                                </div>
                            }
                        </div>
                    </td>

                </tr>
            </>
        );
    })

    return (
        <>
            {
                entryCountRV !== 0 ?
                    <>
                        <div>
                            <div className="sm:px-6 w-full">
                                <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                                    <div className="sm:flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div>
                                                <button
                                                    onClick={() => handleChangeStatus('all')}
                                                >
                                                    <div className={`${statusFilter === 'all' ? "py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full" : ""} `}>
                                                        <p>All</p>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => handleChangeStatus('Done')}
                                                >
                                                    <div className={`${statusFilter === 'Done' ? "py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full" : ""} ml-7`}>
                                                        <p>Done</p>
                                                    </div>
                                                </button>
                                                <button
                                                    onClick={() => handleChangeStatus('Pending')}
                                                >
                                                    <div className={`${statusFilter === 'Pending' ? "py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full" : ""} ml-7`}>
                                                        <p>Pending</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <select
                                            onChange={handleChangDate}
                                            id="pricingType" name="pricingType"
                                            class=" border-b-4 bg-indigo-100 h-10 text-black rounded-full px-2 md:px-3 py-0 md:py-1 tracking-wider  ml-5 text-xs mt-1">
                                            <option value="All" selected="" className=' text-lg'>All</option>
                                            <option value="Today" className=' text-lg'>Today</option>
                                            <option value="Week" className=' text-lg'>Week</option>
                                            <option value="Month" className=' text-lg'>Month</option>
                                        </select>
                                    </div>
                                    <div className="mt-7 overflow-x-auto">
                                        {
                                            loader ? <LinearProgress /> : <> </>
                                        }
                                        {
                                            entryList.length !== 0 ?
                                                <table className="w-full whitespace-nowrap">
                                                    <tbody>

                                                        <tr className="h-16 border border-gray-200 rounded bg-gray-100">
                                                            <td className='pl-3'>

                                                                <div className="flex items-center">
                                                                    <p className="text-base font-medium leading-none text-gray-700 ml-2">Id</p>
                                                                </div>
                                                            </td>
                                                            <td className="pl-5">
                                                                <div className="flex items-center pl-5">
                                                                    <div>
                                                                        <p className="text-base font-medium leading-none text-gray-700 mr-2">UserInfo</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="pl-5">
                                                                <div className="flex items-center">
                                                                    <p className="text-base font-medium leading-none text-gray-700 ml-2">VehicleInfo</p>
                                                                </div>
                                                            </td>
                                                            <td className="pl-5">
                                                                <div className="flex items-center">
                                                                    <p className="text-base font-medium leading-none text-gray-700 ml-2">InTime</p>
                                                                </div>
                                                            </td>
                                                            <td className="pl-5">
                                                                <div className="flex items-center">
                                                                    <p className="text-base font-medium leading-none text-gray-700 ml-2">OutTime</p>
                                                                </div>
                                                            </td>
                                                            <td className="pl-5">
                                                                <div className="flex items-center">
                                                                    <p className="text-base font-medium leading-none text-gray-700 ml-2">Status</p>
                                                                </div>
                                                            </td>
                                                            <td className="pl-5">
                                                                <div className="flex items-center">
                                                                    <p className="text-base font-medium leading-none text-gray-700 ml-2">Days / Price</p>
                                                                </div>
                                                            </td>
                                                            <td className="pl-8 pr-5">
                                                                <div className="flex items-center">
                                                                    <p className="text-base font-medium leading-none text-gray-700 ml-2">Action</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {/*  */}
                                                        <>
                                                            {entryListComponets}
                                                        </>

                                                    </tbody>
                                                </table>
                                                : <p>Data is Empty</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </> : <p className=' text-lg font-bold m-2'>Entry buket is empty</p>
            }

        </>
    );
}

export default ItemList;
