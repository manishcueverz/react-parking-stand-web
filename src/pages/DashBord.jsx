import React, { useEffect, useState } from 'react'
import { AiOutlineCar } from 'react-icons/ai'
import { PiBicycleLight } from 'react-icons/pi'
import { RiMotorbikeFill } from 'react-icons/ri'
import ItemList from '../components/ItemList'
import { useSelector, useDispatch } from 'react-redux'
import {
  addEntry,
  headerInfo,
  gettotalIncome,
  gettotalVehicle,
  getdone,
  getpending,
  getEntryItems,
  updateEnty,
  deleteRntry,
  clearAllData
} from "../redux/entrySlice";
import { format, formatDistanceStrict } from 'date-fns';
import { AiOutlineDelete } from "react-icons/ai"
import { BsCheckCircle } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"

const DashBord = () => {

  const dispatch = useDispatch()
  const entryItemsRV = useSelector(getEntryItems)
  const [searchEntryList, setSearchEntryList] = useState([])
  const [activeVehicle, setActiveVehicle] = useState('car')
  const [searchValue, setSearchValue] = useState('')
  const [formData, setFormData] = useState({})
  const totalIncome = useSelector(gettotalIncome)
  const totalVehicle = useSelector((gettotalVehicle))
  const done = useSelector(getdone)
  const pending = useSelector(getpending)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData)
  };
  useEffect(() => {
    dispatch(headerInfo('All'))
  }, [dispatch])
  const handleAddEntry = () => {
    if (document.getElementById("name").value !== '' &&
      document.getElementById("mobilenumber").value !== '' &&
      document.getElementById("vehiclenumber").value !== '') {
      const newId = entryItemsRV.length !== 0 ? Number(entryItemsRV[0].id) + 1 : 1
      let date = {
        id: newId,
        userName: formData.name,
        userMobileNumber: formData.mobilenumber,
        vehicleNumber: formData.vehiclenumber,
        vehicleType: activeVehicle,
        inTime: new Date(),
        // inTime: "2023-10-01T17:09:37.046Z",
        outTime: '',
        status: 'Pending',
        totalDays: 0,
        totalAmount: 0
      }
      dispatch((addEntry(date)))
      setFormData({})
      document.getElementById("name").value = "";
      document.getElementById("mobilenumber").value = "";
      document.getElementById("vehiclenumber").value = "";
      setActiveVehicle('car')
    }
  };
  const handleChangDate = event => {
    if (event.target.value === 'All') {
      dispatch(headerInfo('All'))
      console.log(`update dateFilter ${event.target.value} `)
    } else {
      if (event.target.value === 'Today') {
        dispatch(headerInfo('Today'))
        console.log(`update dateFilter ${event.target.value} `)
      } else if (event.target.value === 'Week') {
        dispatch(headerInfo('Week'))
        console.log(`update dateFilter ${event.target.value} `)
      } else if (event.target.value === 'Month') {
        dispatch(headerInfo('Month'))
        console.log(`update dateFilter ${event.target.value} `)
      }
    }
  }
  const handleChangeSearch = (value) => {
    setSearchValue(value);
    filterData(value);
  }
  const filterData = (value) => {
    const lowercasedValue = value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/gi, "");
    if (lowercasedValue !== "") {
      const filteredData = entryItemsRV.filter((item) => item.id === Number(lowercasedValue));
      setSearchEntryList(filteredData);
    } else {
      setSearchEntryList([])
    }
  };
  const dateFormat = (value) => {
    const val = format(new Date(value), 'dd/MM/yyyy, h:mm a');
    return val
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
    setSearchValue('')
  }
  const handleDelete = (value) => {
    dispatch(deleteRntry(value))
    setSearchValue('')
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

    //return val
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

  const handleClearAllDate = () => {
    dispatch(clearAllData())
  }

  return (
    <div className=' grid  grid-cols-12'>
      <div className=' col-span-12  h-[80px] flex justify-between items-center p-7 fixed top-0 bg-white w-full'>
      <p className=' text-lg font-bold '>PARKING STAND</p>
        <div className=' flex justify-between items-center'>
          <div className=' flex justify-center'>
            <p className=' text-lg ml-7'>Total Income : ${totalIncome}</p>
            <p className=' text-lg  ml-7'>Total Vehicle : {totalVehicle}</p>
            <p className=' text-lg  ml-7'>Completed : {done}</p>
            <p className=' text-lg  ml-7'>Pending : {pending}</p>
          </div>
        </div>
      
        <div className=' flex justify-between items-center'>
        <select
            onChange={handleChangDate}
            id="pricingType" name="pricingType"
            class=" w-28 h-10 border-2 text-black rounded-full px-2 md:px-3 py-0 md:py-1 tracking-wider  mr-5 text-xs">
            <option value="All" selected="" className=' text-lg'>All</option>
            <option value="Today" className=' text-lg'>Today</option>
            <option value="Week" className=' text-lg'>Week</option>
            <option value="Month" className=' text-lg'>Month</option>
          </select>
          <button
            onClick={() => { handleClearAllDate() }}
            className="text-xs font-bold ml-2 flex">
            <AiOutlineDelete size={18} />
          </button>
          <button
            className="text-xs font-bold ml-7 flex">
            <FiLogOut size={18} />
          </button>
        </div>
        
      </div>
      <div className=' col-span-9 bg-slate-800 min-h-[100ch] p-10'>
        <div className=' mt-20 flex justify-center mb-10'>
          <form className=' ml-7 mr-7 mt-4 w-2/4'>
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="">
              <input
                value={searchValue}
                onChange={(e) => handleChangeSearch(e.target.value)}
                type="search" id="default-search" className="block w-full p-3 pl-10 text-sm  border border-gray-200 rounded-full shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white  text-black " placeholder="Search" required />
            </div>
          </form>
        </div>

        <div className='  bg-white rounded-xl ml-4 mr-4 mt-5 p-4 content-center'>
          {searchValue === '' ? <ItemList /> : <>
            <p>Search result.....</p>
            <div className="sm:px-6 w-full">
              <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                {searchEntryList.map((item => {
                  return (
                    <table className="w-full whitespace-nowrap">
                      <tbody>
                        <tr className="h-16 border border-gray-100 rounded" key={item.id}>
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

                      </tbody>

                    </table>


                  )
                }))}
                {searchEntryList.length === 0 ? <p>No date fund !</p> : <p></p>}
              </div>
            </div>


          </>}

        </div>

      </div>
      <div className=' col-span-3 p-10  bg-slate-300 fixed top-[80px] right-0'>
        <p className=' text-lg font-bold '>Add New Entry</p>
        <div className=' flex justify-between mt-10'>
          <button
            onClick={() => setActiveVehicle('car')}
            className={`${activeVehicle === 'car' ? "bg-slate-400 " : ""} cursor-pointer p-2 rounded-full pl-4 pr-4`}>
            <div className="flex items-center instance group ">
              <div className="svg-container ">
                <AiOutlineCar className="text-[#1E293B] group-hover:text-indigo-700" />
              </div>
              <div className="pl-3 heading-container">
                <p className="text-base font-medium leading-none text-slate-800 group-hover:text-indigo-700 ">
                  Car
                </p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setActiveVehicle('bike')}
            className={`${activeVehicle === 'bike' ? "bg-slate-400 " : ""} cursor-pointer p-2 rounded-full pl-4 pr-4`}>
            <div className="flex items-center instance group">
              <div className="svg-container">
                <RiMotorbikeFill className="text-[#1E293B] group-hover:text-indigo-700" />
              </div>
              <div className="pl-3 heading-container">
                <p className="text-base font-medium leading-none text-slate-800 group-hover:text-indigo-700 ">
                  Bike
                </p>
              </div>
            </div>
          </button>
          <button
            onClick={() => setActiveVehicle('cycle')}
            className={`${activeVehicle === 'cycle' ? "bg-slate-400 " : ""} cursor-pointer p-2 rounded-full pl-4 pr-4`}>
            <div className="flex items-center instance group">
              <div className="svg-container">
                <PiBicycleLight className="text-[#1E293B] group-hover:text-indigo-700" />
              </div>
              <div className="pl-3 heading-container">
                <p className="text-base font-medium leading-none text-slate-800 group-hover:text-indigo-700 ">
                  Cycle
                </p>
              </div>
            </div>
          </button>
        </div>
        <div className="mt-6  w-full">
          <lable className="text-sm font-medium leading-none text-gray-800">Name</lable>
          <div className="relative flex items-center justify-center">
            <input
              onChange={handleChange}
              aria-label="enter name" type="name" id="name" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
            </div>
          </div>
        </div>
        <div className="mt-6  w-full">
          <lable className="text-sm font-medium leading-none text-gray-800">Mobile Number</lable>
          <div className="relative flex items-center justify-center">
            <input
              onChange={handleChange}
              aria-label="enter mobilenumber" type="mobilenumber" id="mobilenumber" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
            </div>
          </div>
        </div>
        <div className="mt-6  w-full">
          <lable className="text-sm font-medium leading-none text-gray-800">Vehicle Number</lable>
          <div className="relative flex items-center justify-center">
            <input
              onChange={handleChange}
              aria-label="enter vehiclenumber" type="vehiclenumber" id="vehiclenumber" className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
            <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
            </div>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={() => handleAddEntry()}
            aria-label="create my account" className=" text-sm font-semibold leading-none text-white bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">
            Add Entry
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashBord