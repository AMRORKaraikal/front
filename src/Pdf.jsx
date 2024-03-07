import React, { useEffect, useRef } from 'react'
import { jsPDF } from 'jspdf'
const Pdf = ({ reportData, specimenData, patientData }) => {
	const canvasRef = useRef(null)
	console.log(reportData, specimenData, patientData)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		canvas.width = 595
		canvas.height = 842
		const {
			hospital_id,
			patient_name,
			father_name,
			village_name,
			patient_age,
			gender,
			patient_mobile,
			location,
			clinical_ho,
			provisional_diagnosis,
			antibiotics_given,
		} = patientData
		const {
			specimen_nature,
			specimen_source,
			collection_date,
			collection_time,
			illness_duration,
			investigation_required,
			specimen_collector,
			admission_date,
			physician_name,
		} = specimenData
		// Define your data, specimen_data, and patient_history here
		const {
			specimen_id,
			direct_microscopic_examination,
			culture_results,
			ast,
			note,
			report_date,
			reporter_name,
			reporter_designation,
		} = reportData
		let arr1 = [],
			arr2 = []
		ast.forEach((element) => {
			arr1.push(element.Antibiotic)
			arr2.push(element.Result)
		})
		// Use jsPDF for creating a PDF

		const pdfDoc = new jsPDF()

		ctx.fillStyle = '#fff'
		ctx.fillRect(0, 0, canvas.width, canvas.height)
		ctx.fillStyle = '#000'
		const xStart = 25 // Adjust as needed
		const yStart = 340 // Adjust as needed
		const tableWidth = 545 // Adjust as needed
		const tableHeight = 320 // Adjust as needed
		const rowHeight = 20 // Adjust as needed
		const colWidths = [275, 225] // Adjust as needed

		// Draw table border
		ctx.rect(xStart, yStart - tableHeight, tableWidth, tableHeight)
		ctx.stroke()

		// Draw inner horizontal borders
		for (let i = 1; i < 17; i++) {
			ctx.beginPath()
			if (i === 13 || i === 11 || i === 6 || i === 4) {
				ctx.moveTo(xStart, yStart - rowHeight * i - rowHeight)
				ctx.lineTo(xStart + tableWidth, yStart - rowHeight * i - rowHeight)
				i++
			} else {
				ctx.moveTo(xStart, yStart - rowHeight * i)
				ctx.lineTo(xStart + tableWidth, yStart - rowHeight * i)
			}
			ctx.stroke()
		}

		ctx.rect(
			xStart,
			yStart + 335 - rowHeight * 10,
			tableWidth,
			tableHeight - 140
		)
		ctx.stroke()

		for (let i = 1; i < 11; i++) {
			ctx.beginPath()
			ctx.moveTo(xStart, yStart + 335 - rowHeight * i)
			ctx.lineTo(xStart + tableWidth, yStart - rowHeight * i + 335)

			ctx.stroke()
		}

		// Draw inner vertical borders
		for (let i = 1; i < colWidths.length; i++) {
			ctx.beginPath()
			ctx.moveTo(
				xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
				yStart - colWidths.length * 20
			)
			ctx.lineTo(
				xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
				yStart - tableHeight
			)
			ctx.stroke()
			ctx.beginPath()
			ctx.moveTo(
				xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
				yStart + 335 - rowHeight * 10
			)
			ctx.lineTo(
				xStart + colWidths.slice(0, i).reduce((acc, val) => acc + val, 0),
				yStart + 335 - rowHeight * 10 + 180
			)
			ctx.stroke()
		}
		ctx.font = 'bold 16px Times New Roman ' //font
		for (let i = 0; i < arr1.length; i++) {
			ctx.fillText(arr1[i], 30, 510 + i * 20)
			ctx.fillText(arr2[i], 305, 510 + i * 20)
		}
		// content
		ctx.fillText('Patient Details', 32, 35)
		ctx.fillText('Specimen Details', 305, 35)
		ctx.fillText('Direct Microscopic Examination:', 25, 360)
		ctx.fillText('Culture Results:', 25, 415)
		ctx.fillText('Antimicrobial Susceptibility Test Result:', 25, 470)
		ctx.fillText('Antibiotic', 30, 490)
		ctx.fillText('Result', 305, 490)
		ctx.fillText('Note:', 25, 680)
		ctx.fillText('Report Date:', 25, 740)
		ctx.fillText('Name:', 25, 760)
		ctx.fillText('Designation:', 25, 780)
		ctx.fillText('Signature:', 25, 800)

		ctx.font = '14px Times New Roman'
		ctx.fillText('Hospital ID:', 32, 55)
		ctx.fillText(hospital_id, 125, 55) //id
		ctx.fillText('Patient Name:', 32, 75)
		ctx.fillText(patient_name, 125, 75) //var firstname
		ctx.fillText('Father Name:', 32, 95)
		ctx.fillText(father_name, 125, 95) //Lname
		ctx.fillText('Name of village/Town:', 32, 115)
		ctx.fillText(village_name, 125, 130) //place
		ctx.fillText('Age:', 32, 155)
		ctx.fillText(patient_age, 125, 155) //age
		ctx.fillText('Gender:', 32, 175)
		ctx.fillText(gender, 125, 175) //gender
		ctx.fillText('Phone No:', 32, 195)
		ctx.fillText(patient_mobile, 125, 195) //phone
		ctx.fillText('Location:', 32, 215)
		ctx.fillText(location, 125, 215) //loc
		ctx.fillText('Clinical H/O', 32, 255)
		ctx.fillText(clinical_ho, 125, 255) //clinical h/o
		ctx.fillText('Provisional Diagnosis', 32, 295)
		ctx.fillText(provisional_diagnosis, 165, 295) //prov diag
		ctx.fillText('Antibiotics Given:', 32, 315)
		ctx.fillText(antibiotics_given, 165, 315) //antibio
		ctx.fillText('Name of the Physician:', 32, 335)
		ctx.fillText(physician_name, 175, 335) //physician name
		//second col
		ctx.fillText('Specimen No:', 305, 55)
		ctx.fillText(specimen_id, 400, 55) //specino
		ctx.fillText('Nature of specimen:', 305, 75)
		ctx.fillText(specimen_nature, 400, 90) //nature
		ctx.fillText('Specimen Source / Body Site:', 305, 115)
		ctx.fillText(specimen_source, 400, 130) //site
		ctx.fillText('Date of Collection:', 305, 155)
		ctx.fillText(collection_date.slice(0, 10), 420, 155) //date
		ctx.fillText('time of Collection:', 305, 175)
		ctx.fillText(collection_time, 420, 175) //time
		ctx.fillText('Duration of Illness:', 305, 195)
		ctx.fillText(illness_duration, 420, 195) //duration
		ctx.fillText('Specimen Collected by:', 305, 215)
		ctx.fillText(specimen_collector, 380, 230) //who collected
		ctx.fillText('Investigation Required:', 305, 255)
		ctx.fillText(investigation_required, 380, 270) //investigation
		ctx.fillText('Date of Admission:', 305, 295)
		ctx.fillText(admission_date.slice(0, 10), 420, 295)

		//two major comp
		ctx.fillText(direct_microscopic_examination, 60, 373) //direct
		ctx.fillText(culture_results, 60, 428) //culture
		ctx.fillText(note, 80, 680) //note
		ctx.fillText(report_date, 120, 740) // report date
		ctx.fillText(reporter_name, 120, 760) //name
		ctx.fillText(reporter_designation, 120, 780) //designation
		const pdfDataURL = canvas.toDataURL()

		// Add the data URL to the PDF document
		pdfDoc.addImage(pdfDataURL, 'JPEG', 0, 0)

		// Save or display the PDF (change the filename as needed)
		pdfDoc.save('output.pdf')
	}, [patientData, specimenData, reportData]) // Run this effect only once when the component mounts

	return (
		<div>
			<canvas
				ref={canvasRef}
				width={595 * (5 / 3)}
				height={842 * (5 / 3)}></canvas>
		</div>
	)
}

export default Pdf
