import React, { memo, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function BarChart({ chartData }) {
	const options = {
		plugins: {
			legend: false,
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
		},
	}

	const [data, setData] = useState({
		labels: ['', '', '', '', ''],
		datasets: [
			{},
			{
				backgroundColor: [
					'#04B90B',
					'#106AAB ',
					'#8D31E9',
					'#DA9F0A',
					'#EA8484',
				],
				data: [10, 2, 3, 4, 5],
				borderRadius: 12,
			},
			{},
		],
	})

	useEffect(() => {
		setData(prev => ({
			...prev,
			datasets: [
				{},
				{
					backgroundColor: [
						'#04B90B',
						'#106AAB ',
						'#8D31E9',
						'#DA9F0A',
						'#EA8484',
					],
					data: chartData,
					borderRadius: 12,
				},
				{},
			],
		}))
	}, [chartData])

	return <Bar data={data} options={options} />
}

export default memo(BarChart)
