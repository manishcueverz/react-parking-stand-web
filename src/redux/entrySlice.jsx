
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const entrySlice = createSlice({
    name: 'entry',
    initialState: {
        items: [],
        count: 0,
        headerStatus: 'All',
        totalIncome: 0,
        totalVehicle: 0,
        done: 0,
        pending: 0,
    },
    reducers: {
        addEntry(state, action) {
            state.items.push(action.payload)
            const dataToSort = [...state.items];
            const sorted = dataToSort.sort((a, b) => Number(b.id) - Number(a.id));
            state.items = sorted
            state.count = state.items.length

            if (state.headerStatus === 'All') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'All'
                    state.totalVehicle = state.items.length
                    const filterDone = state.items.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = state.items.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = state.items.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (state.headerStatus === 'Today') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Today'
                    const dateFilterList = state.items.filter(item => format(new Date(item.inTime), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy'))
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (state.headerStatus === 'Week') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Week'
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
                    const dateFilterList = state.items.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (state.headerStatus === 'Month') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Month'
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (30 - today.getDay()));
                    const dateFilterList = state.items.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            }
        },
        headerInfo(state, action) {
            if (action.payload === 'All') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'All'
                    state.totalVehicle = state.items.length
                    const filterDone = state.items.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = state.items.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = state.items.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (action.payload === 'Today') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Today'
                    const dateFilterList = state.items.filter(item => format(new Date(item.inTime), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy'))
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (action.payload === 'Week') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Week'
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
                    const dateFilterList = state.items.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (action.payload === 'Month') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Month'
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (30 - today.getDay()));
                    const dateFilterList = state.items.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            }
        },
        updateEnty(state, action) {
            const { id } = action.payload
            const filter = state.items.filter((item) => item.id !== id);
            state.items = filter
            state.items.push(action.payload)
            const dataToSort = [...state.items];
            const sorted = dataToSort.sort((a, b) => Number(b.id) - Number(a.id));
            state.items = sorted
            state.count = state.items.length

            if (state.headerStatus === 'All') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'All'
                    state.totalVehicle = state.items.length
                    const filterDone = state.items.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = state.items.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = state.items.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (state.headerStatus === 'Today') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Today'
                    const dateFilterList = state.items.filter(item => format(new Date(item.inTime), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy'))
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (state.headerStatus === 'Week') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Week'
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
                    const dateFilterList = state.items.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            } else if (state.headerStatus === 'Month') {
                if (state.items.length !== 0) {
                    state.headerStatus = 'Month'
                    const today = new Date();
                    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (30 - today.getDay()));
                    const dateFilterList = state.items.filter(item => {
                        const entrytoday = new Date(item.inTime);
                        const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                        return entryDate >= startOfWeek && entryDate <= endOfWeek;
                    })
                    state.totalVehicle = dateFilterList.length
                    const filterDone = dateFilterList.filter(item => item.status === 'Done')
                    state.done = filterDone.length
                    const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                    state.pending = filterPending.length
                    const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                    state.totalIncome = total
                }
            }
        },
        deleteRntry(state, action) {
            const filter = state.items.filter((item) => item.id !== action.payload);
            state.items = filter
            if (state.items.length !== 0) {
                const dataToSort = [...state.items];
                const sorted = dataToSort.sort((a, b) => Number(b.id) - Number(a.id));
                state.items = sorted
                state.count = state.items.length

                if (state.headerStatus === 'All') {
                    if (state.items.length !== 0) {
                        state.headerStatus = 'All'
                        state.totalVehicle = state.items.length
                        const filterDone = state.items.filter(item => item.status === 'Done')
                        state.done = filterDone.length
                        const filterPending = state.items.filter(item => item.status === 'Pending')
                        state.pending = filterPending.length
                        const total = state.items.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                        state.totalIncome = total
                    }
                } else if (state.headerStatus === 'Today') {
                    if (state.items.length !== 0) {
                        state.headerStatus = 'Today'
                        const dateFilterList = state.items.filter(item => format(new Date(item.inTime), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy'))
                        state.totalVehicle = dateFilterList.length
                        const filterDone = dateFilterList.filter(item => item.status === 'Done')
                        state.done = filterDone.length
                        const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                        state.pending = filterPending.length
                        const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                        state.totalIncome = total
                    }
                } else if (state.headerStatus === 'Week') {
                    if (state.items.length !== 0) {
                        state.headerStatus = 'Week'
                        const today = new Date();
                        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
                        const dateFilterList = state.items.filter(item => {
                            const entrytoday = new Date(item.inTime);
                            const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                            return entryDate >= startOfWeek && entryDate <= endOfWeek;
                        })
                        state.totalVehicle = dateFilterList.length
                        const filterDone = dateFilterList.filter(item => item.status === 'Done')
                        state.done = filterDone.length
                        const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                        state.pending = filterPending.length
                        const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                        state.totalIncome = total
                    }
                } else if (state.headerStatus === 'Month') {
                    if (state.items.length !== 0) {
                        state.headerStatus = 'Month'
                        const today = new Date();
                        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (30 - today.getDay()));
                        const dateFilterList = state.items.filter(item => {
                            const entrytoday = new Date(item.inTime);
                            const entryDate = new Date(entrytoday.getFullYear(), entrytoday.getMonth(), entrytoday.getDate() - entrytoday.getDay());
                            return entryDate >= startOfWeek && entryDate <= endOfWeek;
                        })
                        state.totalVehicle = dateFilterList.length
                        const filterDone = dateFilterList.filter(item => item.status === 'Done')
                        state.done = filterDone.length
                        const filterPending = dateFilterList.filter(item => item.status === 'Pending')
                        state.pending = filterPending.length
                        const total = dateFilterList.reduce((accumulator, currentValue) => accumulator + currentValue.totalAmount, 0)
                        state.totalIncome = total
                    }
                }
            } else {
                state.items = []
                state.count = 0
                state.headerStatus = 'All'
                state.totalIncome = 0
                state.totalVehicle = 0
                state.done = 0
                state.pending = 0
            }
        },
    },

})

export const { addEntry, headerInfo, updateEnty, deleteRntry } = entrySlice.actions;
export const getheaderStatus = (state) => state.entry.headerStatus;
export const gettotalIncome = (state) => state.entry.totalIncome;
export const gettotalVehicle = (state) => state.entry.totalVehicle;
export const getdone = (state) => state.entry.done;
export const getpending = (state) => state.entry.pending;
export const getEntryItems = (state) => state.entry.items;
export const getEntryCount = (state) => state.entry.count;

export default entrySlice.reducer