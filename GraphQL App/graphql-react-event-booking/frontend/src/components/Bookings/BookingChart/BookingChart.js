import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BOOKINGS_BUCKETS = {
    Cheap: {
        min: 0,
        max: 100
    },
    Affordable: {
        min: 101,
        max: 200
    },
    Expensive: {
        min: 201,
        max: 10000
    }
};

const bookingsChart = props => {
    const chartData = {
        labels: [],
        datasets: [
            {
                label: 'Bookings',
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1,
                data: []
            }
        ]
    };

    for (const bucket in BOOKINGS_BUCKETS) {
        const filteredBookingsCount = props.bookings.reduce((prev, current) => {
            if (current.event.price > BOOKINGS_BUCKETS[bucket].min && current.event.price < BOOKINGS_BUCKETS[bucket].max) {
                return prev + 1;
            } else {
                return prev;
            }
        }, 0);
        
        chartData.labels.push(bucket);
        chartData.datasets[0].data.push(filteredBookingsCount);
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Bookings Chart'
            }
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <div style={{ width: '600px', height: '400px' }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default bookingsChart;
















// import React from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from "chart.js";
// import {Bar} from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BOOKINGS_BUCKETS = {
//     Cheap: {
//         min: 0,
//         max: 100
//     },
//     Affordable: {
//         min: 101,
//         max: 200
//     },
//     Expensive: {
//         min: 201,
//         max: 10000
//     }
// }

// const bookingsChart = props => {
//     const chartData = {labels: [], datasets: [] };
//     let values = []; 

//     for (const bucket in BOOKINGS_BUCKETS) {
//         const filteredBookingsCount = props.bookings.reduce((prev, current) => {
//             if (current.event.price > BOOKINGS_BUCKETS[bucket].min && current.event.price < BOOKINGS_BUCKETS[bucket].max) {
//                 return prev + 1;
//             } else {
//                 return prev;
//             }

//         }, 0);
//         values.push(filteredBookingsCount)
//         chartData.labels.push(bucket)
//         chartData.datasets.push({
//             fillColor:"rgba(173, 216, 230, 0.6)",
//             strokeColor:"rgba(0, 0, 139, 1.0)",
//             highlightFill:"rgba(144, 238, 144, 0.6)",
//             highlightStroke:"rgba(34, 139, 34, 1.0)",
//             data: values
//         })
//         values = [...values]
//         values[values.length -1] = 0
//         console.log(chartData.datasets)
//     }
//     return (
//         <Bar data={chartData}/>
//     )
// };

// export default bookingsChart