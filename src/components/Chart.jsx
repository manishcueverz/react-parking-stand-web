import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { getEntryItems, getdone, getheaderStatus, getpending, gettotalVehicle } from '../redux/entrySlice';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const acitiveStatus = useSelector((getheaderStatus))
    const totalVehicle = useSelector((gettotalVehicle))
    const done = useSelector(getdone)
    const pending = useSelector(getpending)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false
                    }
                }
            ]
        }
    };

    const labels = [acitiveStatus, 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Total',
                data: [totalVehicle, 1, 1, 2, 3, 1],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Done',
                data: [done, 2, 1, 3, 1, 1],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Pending',
                data: [pending, 1, 2, 1, 2, 1],
                backgroundColor: 'rgba(53, 162, 235, 0.1)',
            },
        ],
    };


    const Barlabels = [acitiveStatus, 'February', 'March', 'April', 'May', 'June', 'July'];

    const Bardata = {
        Barlabels,
        datasets: [
            {
                label: 'Total',
                data: [totalVehicle, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Done',
                data: [done, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Pending',
                data: [pending, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(53, 162, 235, 0.1)',
            },
        ],
    };

    return (
        <>
         {/* <Pie data={Bardata} className=' m-80'/>; */}
            <Bar options={options} data={data} className=' mt-20' />
           
        </>

    )
}

export default Chart
