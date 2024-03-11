import { useState } from 'react'
import DatePicker from 'react-date-picker'
import { microbes_list, antibiotic_list } from './data'
import Preview from './Preview'
const SpecimenDetails = () => {
	const [directMicroscopicExamination, setDirectMicroscopicExamination] =
		useState('')
	const [details, setDetails] = useState(false)
	const [patientData, setPatientData] = useState()
	const [specimenData, setSpecimenData] = useState()
	const [cultureResult, setCultureResult] = useState('')

	// const [sample_id, setSample_Id] = useState(0)
	const [microbe, setMicrobe] = useState(microbes_list[0])
	const [newMicrobe, setNewMicrobe] = useState('')
	const [antibiotic, setAntibiotic] = useState(antibiotic_list[0])
	const [newAntibiotic, setNewAntibiotic] = useState('')
	const [result, setResult] = useState('Resistant')
	const [notes, setNotes] = useState('')
	const [reportDate, setReportDate] = useState(new Date())
	const [reporterName, setReporterName] = useState('')
	const [reporterDesignation, setReporterDesignation] = useState('')
	const [table, setTable] = useState([])
	const [patient_id, setPatient_id] = useState('')
	const [specimen_id, setSpecimen_id] = useState('')

	const [showReport, setShowReport] = useState(false)

	const getDetails = async (e) => {
		e.preventDefault()

		console.log(patient_id)
		console.log(specimen_id)
		try {
			if (!patient_id || !specimen_id) {
				alert('Enter Patient ID and Speciment ID')
				return
			}
			const response = await fetch('https://amrorbackend-mwxc.onrender.com/get-report-details', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					patient_id: patient_id,
					specimen_id: specimen_id,
				}),
			})
			const result = await response.json()
			console.log(result)
			if (result.success) {
				setSpecimenData(result.specimenData)
				setPatientData(result.patientData)
				setDetails(true)
				console.log(result.patientData.patient_id)
				// setPatient_id(result.patientData.patient_id)
			}
		} catch (errror) {
			alert('Failed to fetch report!!!')
			console.log(errror)
		}
	}

	const handleSubmit = async (e) => {
		// Implement your submission logic here
		// Access the form data using the state variables
		e.preventDefault()
		console.log('table: ', table)

		setTimeout(() => {}, 5000)
		// Wait for a brief moment to activate the camera
		setTimeout(async () => {
			// Inside this block, the camera is active
			// setPatient_id(patientData.patient_id)
			console.log(patient_id)
			// console.log(patient_id)
			console.log(specimen_id)
			try {
				const report_data = {
					patient_id: patientData.patient_id,
					specimen_id: specimen_id,
					direct_microscopic_examination: directMicroscopicExamination,
					culture_results: cultureResult,
					ast: table,
					note: notes,
					report_date: reportDate,
					reporter_name: reporterName,
					reporter_designation: reporterDesignation,
				}
				console.log(patient_id, specimen_id, report_data)
				const response = await fetch('https://amrorbackend-mwxc.onrender.com/new-report', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						report_data: report_data,
					}),
				})

				const result = await response.json()

				if (result.success) {
					alert(result.message)
				} else {
					alert('Submit Failed, try again')
					console.error(result.message)
					return
				}
			} catch (error) {
				console.error('Error during form submission:', error)
				alert('An error occurred during submission. Please try again.')
				return
			} finally {
			}
		}, 10000)
	}

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		if (isCameraActive) {
	// 			const imageSrc = webcamRef.current.getScreenshot()
	// 			const canvas = document.createElement('canvas')
	// 			const ctx = canvas.getContext('2d')

	// 			const img = new Image()
	// 			img.onload = () => {
	// 				canvas.width = img.width
	// 				canvas.height = img.height
	// 				ctx.drawImage(img, 0, 0, img.width, img.height)

	// 				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	// 				const code = jsQR(imageData.data, imageData.width, imageData.height)

	// 				if (code) {
	// 					// console.log('Type:', code.type);
	// 					console.log('Data:', code.data)
	// 					const data = code.data.split(' ')

	// 					setPatient_id(data[0])
	// 					setSpecimen_id(data[1])
	// 					setTimeout(() => {}, 2000)
	// 					console.log('patient_id:', patient_id)
	// 					console.log('specimen_id:', specimen_id)
	// 				}
	// 			}
	// 			img.src = imageSrc
	// 		}
	// 	}, 1000)
	// 	return () => clearInterval(interval)
	// }, [isCameraActive, patient_id, specimen_id])

	const handleAdd = (e) => {
		e.preventDefault()
		if (microbe === '' || antibiotic === '' || result === '') {
			alert('Value missing\nSelect the dropdown menu')
		} else {
			let m1, a1, r1, snum
			if (microbe === 'other') {
				m1 = newMicrobe
			} else {
				m1 = microbe
			}
			if (antibiotic === 'other') {
				a1 = newAntibiotic
			} else {
				a1 = antibiotic
			}
			r1 = result
			setMicrobe(microbes_list[0])
			setAntibiotic(antibiotic_list[0])
			setResult('Resistant')

			let maxi = table.length

			snum = maxi + 1
			if (table.length === 0) {
				snum = 1
			}

			let data = { SNO: snum, Microbe: m1, Antibiotic: a1, Result: r1 }
			setTable([...table, data])

			console.log('added successfully')
		}
	}
	const handleClear = (e, delNo) => {
		e.preventDefault()
		if (!delNo) {
			alert('Value missing\nEnter the serial number')
		} else {
			let len = table.length

			if (len !== delNo) {
				let tempTable = [...table]

				tempTable = tempTable.filter((data) => {
					return data.SNO < delNo || data.SNO > delNo
				})
				console.log('After Filter: ', tempTable)
				tempTable = tempTable.map((data) => {
					if (data.SNO > delNo) {
						// Decrement SNO for elements greater than specificSnoo
						return { ...data, SNO: data.SNO - 1 }
					}
					return data
				})
				console.log('After map: ', tempTable)
				setTable([])
				setTable([...tempTable])
			} else {
				let tempTable = []

				tempTable = table.filter((data) => data.SNO !== delNo)
				console.log('After Filter: ', tempTable)
				setTable([])
				setTable([...tempTable])
			}
			console.log('after: ', table)
		}
	}

	return (
		<div className="container mx-auto mt-8">
			{!showReport ? (
				<>
					<form className="justify-center flex flex-col">
						<div className="flex w-full justify-evenly">
							<div className="flex flex-col space-y-2 w-[32em]">
								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Patient ID:</label>
									<input
										id="patient-id"
										type="text"
										value={patient_id}
										onChange={(e) => setPatient_id(e.target.value)}
										placeholder="Patient ID"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>

								<div className="flex flex-col">
									<label className="text-sm text-gray-600">Sample ID : -</label>
									<input
										id="sample-id"
										type="text"
										value={specimen_id}
										onChange={(e) => setSpecimen_id(e.target.value)}
										placeholder="Sample ID"
										className="p-2 border border-gray-300 rounded-md"
										required={true}
									/>
								</div>
								<div className="my-3 flex justify-end">
									<button
										id="submit-button"
										onClick={getDetails}
										className="outline-none  rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
										Check
									</button>
								</div>
							</div>
						</div>
					</form>
					{details && (
						<Preview patientData={patientData} SpecimenData={specimenData} />
					)}
					<form>
						<div className="items-center ">
							<h1 className="mt-5 text-center font-bold  text-3xl">Report</h1>

							<div className="flex flex-wrap gap-5 items-center justify-around my-14">
								<div>
									<h3 className="font-semibold text-xl">
										Direct Microscopic Examination:
									</h3>
									<textarea
										id="direct-microscopic-examination"
										value={directMicroscopicExamination}
										onChange={(e) =>
											setDirectMicroscopicExamination(e.target.value)
										}
										placeholder="Enter Direct Microscopic Examination here ..."
										className="resize-none mt-3 w-[80%] h-[15vh] sm:h-24 sm:w-[30vw] border border-black p-4 text-lg rounded"
										required={true}
									/>
								</div>
								<div>
									<h3 className="font-semibold text-xl">Culture Results:</h3>
									<textarea
										id="culture-results"
										value={cultureResult}
										onChange={(e) => setCultureResult(e.target.value)}
										placeholder="Enter Culture Results here ..."
										className="resize-none mt-3 w-[80%] h-[15vh]  sm:h-24 sm:w-[30vw] border border-black p-4 text-lg rounded"
										required={true}
									/>
								</div>
							</div>

							<h3 className="text-center font-semibold text-xl underline mt-10">
								Antimicrobial Susceptibility Testing Result:
							</h3>
							<div className="flex items-center flex-wrap justify-center gap-5 mb-8 mt-8">
								<div className="flex flex-col gap-4" id="cont1">
									<label className="font-bold">Select Microbe:</label>
									<select
										id="microbe_dropdown"
										className="w-48 outline rounded-md"
										value={microbe}
										onChange={(e) => setMicrobe(e.target.value)}>
										{microbes_list.map((micr, index) => {
											return (
												<option key={index} value={micr}>
													{micr}
												</option>
											)
										})}
									</select>

									<input
										id="new_microbe"
										type="text"
										value={newMicrobe}
										onChange={(e) => setNewMicrobe(e.target.value)}
										placeholder="Other"
										className="p-2 border border-gray-300 rounded-md"
									/>
								</div>

								<div className="flex flex-col gap-4" id="cont2">
									<label className="font-bold">Select Antibiotic:</label>
									<select
										id="antibiotic_dropdown"
										className="w-48 outline rounded-md"
										value={antibiotic}
										onChange={(e) => setAntibiotic(e.target.value)}>
										{antibiotic_list.map((anti, index) => {
											return (
												<option key={index} value={anti}>
													{anti}
												</option>
											)
										})}
									</select>

									<input
										id="new_antibiotic"
										type="text"
										value={newAntibiotic}
										onChange={(e) => setNewAntibiotic(e.target.value)}
										placeholder="Other"
										className="p-2 border border-gray-300 rounded-md"
									/>
								</div>

								<div className="flex flex-col justify-start">
									<label htmlFor="result" className="font-bold">
										Select Result:
									</label>
									<select
										id="result_dropdown"
										className="w-24 mt-3 outline rounded-md"
										value={result}
										onChange={(e) => setResult(e.target.value)}>
										<option value="Resistant">Resistant</option>
										<option value="Intermediate Resistant">
											Intermediate Resistant
										</option>
										<option value="Sensitive">Senstive</option>
										{/* Add other options */}
									</select>

									<button
										className="mt-4 text-white bg-green-600 px-4 py-2 rounded-md"
										onClick={handleAdd}>
										Add
									</button>
									{/* <div className="flex flex-col justify-start gap-8 mb-2 mt-2"> */}
									{/* <div className="flex flex-col gap-2"> */}
									{/* <div className="flex gap-2">
												<button
													id="clear_button"
													className="btn-clear bg-red-700 p-2 border border-gray-300 rounded-md"
													onClick={handleClear}>
													Clear
												</button>

												<input
													id="del-no"
													type="number"
													placeholder="Enter serial no."
													value={delNo}
													className="p-2 border border-gray-300 rounded-md"
												/>
											</div> */}

									{/* </div> */}
									{/* </div> */}
								</div>
							</div>
							<div className="cont4">
								<div className="mx-auto w-3/8 sm:w-3/4 border-2 border-black">
									<div className="flex">
										<div className="border-2 border-black text-center bg-blue-500 text-white text-lg p-4 w-1/12">
											S.No.
										</div>
										<div className="border-2 text-wrap border-black text-center bg-blue-500 text-white text-lg p-4 w-4/12">
											Microbe
										</div>
										<div className="border-2 text-wrap border-black text-center bg-blue-500 text-white text-lg p-4 w-3/12">
											Antibiotic
										</div>
										<div className="border-2 border-black text-center bg-blue-500 text-white text-lg p-4 w-3/12">
											Result
										</div>
										<div className="border-2 border-black text-center bg-blue-500 text-white text-lg p-4 w-1/12">
											Delete
										</div>
									</div>

									{table.map((data, index) => {
										return (
											<div key={index} id="data_div" className="w-full">
												<div className="flex">
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-1/12">
														{data.SNO}
													</div>
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-4/12">
														{data.Microbe}
													</div>
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-3/12">
														{data.Antibiotic}
													</div>
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-3/12">
														{data.Result}
													</div>
													<div className="border-2 border-black text-center bg-yellow-200 text-black text-lg p-4 w-1/12">
														<button
															className="cursor-pointer "
															onClick={(e) => handleClear(e, data.SNO)}>
															❌
														</button>
													</div>
												</div>
											</div>
										)
									})}
								</div>
							</div>
							<div className="flex gap-15vw mt-8 flex-wrap items-center justify-around m-5vh mx-7vh">
								{/* Note Section */}
								<div>
									<h3 className="text-2xl font-bold mb-4">Note:</h3>
									<textarea
										id="notes"
										placeholder="Enter Note here..."
										className="resize-none mt-3 w-[80%] h-[15vh] sm:h-24 sm:w-[30vw] border border-black p-4 text-lg rounded"
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
									/>
								</div>

								{/* Input Section */}
								<div className="flex gap-2vw flex-col gap-3 items-center justify-around">
									{/* Date Picker */}
									<div className="flex items-center gap-2 justify-between gap-1vw">
										<label className="font-bold">Enter Report Date:</label>
										<DatePicker
											selected={reportDate}
											value={reportDate} // Set the default date as today
											dateFormat="dd-MM-yyyy"
											id="report-date"
											onChange={(e) => {
												setReportDate(e)
												console.log(reportDate)
											}}
											required={true}
										/>
									</div>

									{/* Name Input */}
									<div className="flex items-center gap-2 justify-between gap-1vw">
										<label className="font-bold">Enter Name:</label>
										<input
											id="reporter-name"
											type="text"
											className="p-2 border border-gray-300 rounded-md"
											value={reporterName}
											onChange={(e) => setReporterName(e.target.value)}
											required={true}
										/>
									</div>

									{/* Designation Input */}
									<div className="flex items-center gap-2 justify-between gap-1vw">
										<label className="font-bold">Enter Designation:</label>
										<input
											id="reporter-designation"
											type="text"
											className="p-2 border border-gray-300 rounded-md"
											value={reporterDesignation}
											onChange={(e) => setReporterDesignation(e.target.value)}
											required={true}
										/>
									</div>

									{/* Submit Button */}
								</div>
							</div>
							{/* Rest of your HTML/JSX code */}
						</div>
						<div className="my-3 flex justify-end">
							<button
								id="submit-button"
								onClick={handleSubmit}
								className="outline-none rounded-lg px-5 py-3 bg-red-400 text-white text-lg">
								Submit
							</button>
						</div>
					</form>
				</>
			) : (
				<h1>ksdhfsd</h1>
			)}
		</div>
	)
}

export default SpecimenDetails
