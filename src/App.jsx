import NewSpecimen from './components/NewSpecimen'
import { useState } from 'react'
import SpecimenDetails from './components/SpecimenDetails'
// import Preview from './components/Preview'
import PatientHistory from './components/PatientHistory'
import ExistingPatient from './components/ExistingPatient'
import MonthlyAnalytics from './components/Analytics'
function App() {
	// const [newSpecimen, setNewSpecimen] = useState(false)
	// const [specimenDetails, setSpecimenDetails] = useState(false)

	const [comp, setComp] = useState(0)
	return (
		<>
			<div className="container mx-auto mt-8 px-3 py-1">
				<h1 className="text-2xl font-bold mb-5">AMROR Dashboard</h1>
				<div className="flex ">
					<button
						className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
						onClick={() => {
							setComp(1)
						}}>
						Patient History
					</button>
					<button
						className="bg-green-500 text-white py-2 px-4 rounded mr-4 "
						onClick={() => {
							// setNewSpecimen(true)
							// setSpecimenDetails(false)
							setComp(2)
						}}>
						New Specimen
					</button>
					<button
						className="bg-red-400 text-white py-2 px-4 rounded  mr-4 "
						onClick={() => {
							// setSpecimenDetails(true)
							// setNewSpecimen(false)
							setComp(3)
						}}>
						Existing Speciemen
					</button>
					<button
						className="bg-green-500 text-white py-2 px-4 rounded  mr-4 "
						onClick={() => {
							// setSpecimenDetails(true)
							// setNewSpecimen(false)
							setComp(4)
						}}>
						Enter Specimen Details
					</button>
					<button
						className="bg-orange-500 text-white py-2 px-4 rounded  mr-4 "
						onClick={(e) => {
							// setSpecimenDetails(true)
							// setNewSpecimen(false)
							e.preventDefault()
							setComp(5)
						}}>
						Monthly Analytics
					</button>
				</div>
				{comp === 1 && <PatientHistory />}
				{comp === 2 && <NewSpecimen />}
				{comp === 3 && <ExistingPatient />}
				{comp === 4 && <SpecimenDetails />}
				{comp === 5 && <MonthlyAnalytics />}
			</div>
		</>
	)
}

export default App
