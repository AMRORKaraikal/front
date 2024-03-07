import { useState, useEffect } from 'react'
import { BarChart, HorizontalBarGraph } from './Charts'

const MonthlyAnalytics = () => {
	// Sample data structure
	const [monthlyData, setMonthlyData] = useState([])
	const [data, setData] = useState({})
	const [ready, setReady] = useState(false)

	// Simulated data fetch
	useEffect(() => {
		// Simulated API call to fetch monthly data
		const fetchMonthlyData = async () => {
			// Replace this with actual API call
			const data = await fetch('https://amrorbackend-mwxc.onrender.com/report', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const jsonData = await data.json()
			console.log(jsonData.data)
			setMonthlyData(jsonData.data)
			setData(jsonData.micro)
		}

		fetchMonthlyData()
	}, [])
	useEffect(() => {
		if (monthlyData.length > 0 && Object.keys(data).length > 0) {
			console.log(monthlyData)
			setReady(true)
		}
	}, [monthlyData, data])

	return (
		<div>
			<h2>Monthly Report: Microorganism Analysis</h2>
			{ready && (
				// monthlyData.map((month) => (
				// 	<div key={month.Microbe}>
				// 		<h3>{month.Microbe}</h3>

				// 		<ul>
				// 			{Object.entries(month.Antibiotics).map(([type, antibiotics]) => (
				// 				<li key={type}>
				// 					<h4>{type}</h4>
				// 					<ul>
				// 						{antibiotics.map((antibiotic, index) => (
				// 							<li key={index}>{antibiotic}</li>
				// 						))}
				// 					</ul>
				// 				</li>
				// 			))}
				// 		</ul>
				// 	</div>
				// ))
				<>
					<HorizontalBarGraph data={data} />
					{monthlyData.map((microbe, index) => {
						return <BarChart data={microbe} key={index} />
					})}
				</>
			)}
		</div>
	)
}

export default MonthlyAnalytics
