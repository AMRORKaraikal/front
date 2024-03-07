import React, { useState } from 'react'
// import BarcodeReader from 'react-barcode-reader';
import Pdf1 from '../Pdf1';
import Pdf from '../Pdf';
function PatientHistory() {
    const [patient_id, setPatientId] = useState("")
    const [sample_id, setSample_Id] = useState("")

    const [result, setResult] = useState('');
    const [patientData, setPatientData] = useState()
    const [specimenData, setSpecimenData] = useState()
    const [report, setReport] = useState()
    const [details, setDetails] = useState(0)

    const handleScan = (data) => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const getHalfReport = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('https://amrorbackend-mwxc.onrender.com/get-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient_id: patient_id,
                    specimen_id: sample_id,
                }),
            })
            const result = await response.json()
            if (result.success) {
                setSpecimenData(result.specimenData)
                setPatientData(result.patientData)
                setReport(result.report)


                console.log(result.patientData)
                console.log(result.specimenData)
                console.log(result.report)

                
                setDetails(1)
                // setPatient_id(result.patientData.patient_id)
            }
        } catch (errror) {
            alert('Failed to fetch report!!!')
            console.log(errror)
        }
    }
    const getFullReport = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('https://amrorbackend-mwxc.onrender.com/get-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient_id: patient_id,
                    specimen_id: sample_id,
                }),
            })
            const result = await response.json()
            if (result.success) {
                setSpecimenData(result.specimenData)
                setPatientData(result.patientData)
                setReport(result.report)
                console.log(result.patientData)
                console.log(result.specimenData)
                console.log(result.report)
                setDetails(2)
                // setPatient_id(result.patientData.patient_id)
            }
        } catch (errror) {
            alert('Failed to fetch report!!!')
            console.log(errror)
        }
    }
    return (

        <>
            <form className="mt-5 justify-center flex flex-col">
                <div className="flex w-full justify-evenly">
                    <div className="flex flex-col space-y-2 w-[32em]">
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600">Patient ID:</label>
                            <input
                                id="patient-id"
                                type="text"
                                value={patient_id}
                                onChange={(e) => setPatientId(e.target.value)}
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
                                value={sample_id}
                                onChange={(e) => setSample_Id(e.target.value)}
                                placeholder="Sample ID"
                                className="p-2 border border-gray-300 rounded-md"
                                required={true}
                            />
                        </div>
                        <div className="flex justify-around">
                            <button
                                id="submit-button"
                                type='submit'
                                onClick={getHalfReport}
                                className="mt-5 outline-none rounded-md px-5 py-3 bg-blue-900  text-cyan-200 text-lg">
                                Get History
                            </button>

                            <button
                                id="submit-button"
                                type='submit'
                                onClick={getFullReport}
                                className="mt-5  outline-none rounded-md px-5 py-3 bg-pink-400 text-white text-lg">
                                Get Report
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <h1 className='text-2xl text-center'>(OR)</h1>

            <div className='mt-7 flex justify-center '>
                <button className='text-xl  bg-blue-500 text-white px-5 py-3 rounded-md'>Scan</button>
                {/* <BarcodeReader
                    onError={handleError}
                    onScan={handleScan}
                /> */}
                {/* <p>Scanned result: {result}</p> */}
            </div>
            {
                details === 1 ? (
                    <Pdf1 reportData={report} patientData={patientData} specimenData={specimenData} />
                ) : details === 2 && (

                    <Pdf reportData={report} patientData={patientData} specimenData={specimenData} />
                )
            }
        </>
    )
}

export default PatientHistory