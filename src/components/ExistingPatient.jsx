import { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ReactToPrint from 'react-to-print'
import Barcode from 'react-barcode'

const ExistingPatient = () => {
    const [patient_age, setPatient_Age] = useState(0)
    const [patient_mobile, setPatient_Mobile] = useState("")
    const [patient_name, setPatient_Name] = useState("")
    const [gender, setGender] = useState('Male')


    const [collectionDate, setCollectionDate] = useState(new Date())
    const [admissionDate, setAdmissionDate] = useState(new Date())
    const [location, setLocation] = useState('')
    const [clinical_ho, setClinical_Ho] = useState('')
    const [provisional_diagnosis, setProvisional_Diagnosis] = useState('')
    const [antibiotics_given, setAntibiotics_Given] = useState('')
    const [sample_id, setSample_Id] = useState(0)
    const [specimen_nature, setSpecimen_Nature] = useState('')
    const [specimen_source, setSpecimen_Source] = useState('')
    const [collection_time, setCollection_Time] = useState('')
    const [illness_duration, setIllness_Duration] = useState('')
    const [investigation_required, setInvestigation_Required] = useState('')
    const [specimen_collector, setSpecimen_Collector] = useState('')
    const [physician_name, setPhysician_Name] = useState('')

    const [qrdata, setQrData] = useState('')
    const [showQr, setShowQr] = useState(false)

    const [patientData, setPatientData] = useState({});
    useEffect(() => {
        async function getCount() {
            const response = await fetch('https://amrorbackend-mwxc.onrender.com/specimen-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const result = await response.json()
            // console.log(result)
            setSample_Id(result.count)
        }
        getCount()
    }, [])

    const submitNewSpecimen = async (e) => {
        e.preventDefault()
      
        const specimen_data = {
            specimen_id: sample_id,
            specimen_nature: specimen_nature,
            specimen_source: specimen_source,
            collection_date: collectionDate,
            collection_time: collection_time,
            illness_duration: illness_duration,
            investigation_required: investigation_required,
            specimen_collector: specimen_collector,
            admission_date: admissionDate,
            physician_name: physician_name,
        }
        try {
            // if (!hospital_id || !patient_name || !father_name || !village_name || !patient_age || !patient_mobile) {
            //     alert("Enter all the details")
            //     return;
            // }
            const response = await fetch('https://amrorbackend-mwxc.onrender.com/existing-specimen-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient_id: patientData.patient_id,
                    specimen_data: specimen_data,
                }),
            })

            // const result = await response.json()

            const tem = patientData.patient_id + ' ' + sample_id
            setQrData(tem)
            setShowQr(true)

            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
    const getDetails = async (e) => {
		e.preventDefault()

		console.log(patient_mobile)
		console.log(patient_name)
		try {
			if(!patient_mobile || !patient_name)
			{
				alert("Enter Patient Name and Mobile Number")
				return ;
			}
			const response = await fetch('https://amrorbackend-mwxc.onrender.com/patient-details', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					patient_mobile: patient_mobile,
					patient_name: patient_name,
				}),
			})
			const result = await response.json()
			console.log(result)
			if (result.success) {
				// setSpecimenData(result.specimenData)
				setPatientData(result.patientData)
				// setDetails(true)
				// console.log(result.patientData.patient_id)
				// setPatient_id(result.patientData.patient_id)
			}
		} catch (errror) {
			alert('Failed to fetch patient!!!')
			console.log(errror)
		}
	}

    return (
        <>
            {showQr && (
                <div className="mt-3 text-2xl  border-solid border-black border-3 w-[35vw] h-[35vh] flex justify-center items-center">
                    {<QRCodePrint data={qrdata} />}
                </div>
            )}

            <div className="mt-5">
                {
                    <>
                        <form className="justify-center flex flex-col">
                            <div className="flex w-full justify-evenly">
                                <div className="flex flex-col space-y-2 w-[32em]">
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Enter Phone Number:</label>
                                        <input
                                            id="patient-mobile"
                                            type="text"
                                            value={patient_mobile}
                                            onChange={(e) => setPatient_Mobile(e.target.value)}
                                            placeholder="Patient Mobile Number"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Patient Name: </label>
                                        <input
                                            id="patient-name"
                                            type="text"
                                            value={patient_name}
                                            onChange={(e) => setPatient_Name(e.target.value)}
                                            placeholder="Patient Name"
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
                        <form className="justify-center flex flex-col">
                            <div className="flex w-full justify-evenly">
                                <div className="flex flex-col space-y-2 w-[32em]">
                                    {/* <!-- Hospital Id --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Hospital Id:</label>
                                        <input
                                            id="hospital-id"
                                            type="text"
                                            value={patientData.hospital_id}
                                            // onChange={(e) => setHospital_Id(e.target.value)}
                                            placeholder="Hospital ID"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* <!-- Patient Name --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Patient Name:</label>
                                        <input
                                            id="patient-name"
                                            type="text"
                                            value={patientData.patient_name}
                                            // onChange={(e) => setPatient_Name(e.target.value)}
                                            placeholder="Patient Name"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* <!-- Father Name --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Father Name:</label>
                                        <input
                                            id="father-name"
                                            type="text"
                                            value={patientData.father_name}
                                            // onChange={(e) => setFather_Name(e.target.value)}
                                            placeholder="Father Name"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* <!-- Name of the village --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Name of the village:
                                        </label>
                                        <input
                                            id="village-name"
                                            type="text"
                                            value={patientData.village_name}
                                            // onChange={(e) => setVillage_Name(e.target.value)}
                                            placeholder="Village"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* <!-- Patient Age --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Patient Age:</label>
                                        <input
                                            id="patient-age"
                                            type="number"
                                            placeholder="Age"
                                            value={patientData.patient_age}
                                            onChange={(e) => setPatient_Age(e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* <!-- Gender --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Gender:</label>
                                        <input type="text" value={patientData.gender} name="patient_age" id="patient_age" />
                                    </div>

                                    {/* <!-- Mobile Number --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Mobile Number:
                                        </label>
                                        <input
                                            id="patient-mobile"
                                            type="number"
                                            value={patient_mobile}
                                            onChange={(e) => setPatient_Mobile(e.target.value)}
                                            placeholder="Mobile"
                                            className="p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    {/* <!-- Location --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Location:</label>
                                        <input
                                            id="location"
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="Ward"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* <!-- Clinical H/O --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Clinical H/O:</label>
                                        <input
                                            id="clinical-ho"
                                            type="text"
                                            value={clinical_ho}
                                            onChange={(e) => setClinical_Ho(e.target.value)}
                                            placeholder=""
                                            className="p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    {/* <!-- Provisional Diagnosis --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Provisional Diagnosis:
                                        </label>
                                        <input
                                            id="provisional-diagnosis"
                                            type="text"
                                            value={provisional_diagnosis}
                                            onChange={(e) => setProvisional_Diagnosis(e.target.value)}
                                            placeholder=""
                                            className="p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>

                                    {/* <!-- Antibiotics Given --> */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Antibiotics Given:
                                        </label>
                                        <input
                                            id="antibiotics-given"
                                            type="text"
                                            value={antibiotics_given}
                                            onChange={(e) => setAntibiotics_Given(e.target.value)}
                                            placeholder=""
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2 w-[32em]">
                                    {/* Sample ID */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">Sample ID :</label>
                                        <input
                                            id="sample-id"
                                            type="number"
                                            value={sample_id}
                                            placeholder="Sample ID"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                            disabled
                                        />
                                    </div>

                                    {/* Nature of Specimen */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Nature of Specimen :
                                        </label>
                                        <input
                                            id="specimen-nature"
                                            type="text"
                                            value={specimen_nature}
                                            onChange={(e) => setSpecimen_Nature(e.target.value)}
                                            placeholder="Specimen Nature"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* Specimen Source/Body site */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Specimen Source/Body site :{' '}
                                        </label>
                                        <input
                                            id="specimen-source"
                                            type="text"
                                            value={specimen_source}
                                            onChange={(e) => setSpecimen_Source(e.target.value)}
                                            placeholder="Specimen source"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* Date of collection */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Date of collection :{' '}
                                        </label>
                                        <DatePicker
                                            value={collectionDate}
                                            dateFormat="dd-MM-yyyy"
                                            className="p-2 border border-gray-300 rounded-md"
                                            id="collection-date"
                                            onChange={(e) => {
                                                setCollectionDate(e)
                                            }}
                                            required={true}
                                        />
                                    </div>

                                    {/* Time of collection */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Time of collection : -
                                        </label>
                                        <input
                                            id="collection-time"
                                            type="time"
                                            value={collection_time}
                                            onChange={(e) => setCollection_Time(e.target.value)}
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* Duration of illness */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Duration of illness : -
                                        </label>
                                        <input
                                            id="illness-duration"
                                            type="text"
                                            value={illness_duration}
                                            onChange={(e) => setIllness_Duration(e.target.value)}
                                            placeholder="Ex: 5 Days"
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* Investigation Required */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Investigation Required : -
                                        </label>
                                        <input
                                            id="investigation-required"
                                            type="text"
                                            value={investigation_required}
                                            onChange={(e) => setInvestigation_Required(e.target.value)}
                                            placeholder=""
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* Specimen Collected By */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Specimen Collected By : -
                                        </label>
                                        <input
                                            id="specimen-collector"
                                            type="text"
                                            value={specimen_collector}
                                            onChange={(e) => setSpecimen_Collector(e.target.value)}
                                            placeholder=""
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>

                                    {/* Date of admission */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Date of admission : -
                                        </label>
                                        <DatePicker
                                            value={admissionDate}
                                            dateFormat="dd-MM-yyyy"
                                            className="p-2 border border-gray-300 rounded-md"
                                            onChange={(e) => {
                                                setAdmissionDate(e)
                                            }}
                                            id="admission-date"
                                            required={true}
                                        />
                                    </div>

                                    {/* Name of the Physician */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600">
                                            Name of the Physician : -
                                        </label>
                                        <input
                                            id="physician-name"
                                            type="text"
                                            value={physician_name}
                                            onChange={(e) => setPhysician_Name(e.target.value)}
                                            placeholder=""
                                            className="p-2 border border-gray-300 rounded-md"
                                            required={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='my-3 flex justify-end'>
                                <button
                                    className="bg-red-500 w-[20%]  text-white py-2 px-4 rounded"
                                    type="submit"
                                    onClick={submitNewSpecimen}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </>
                }
            </div>
        </>
    )
}

const QRCodePrint = ({ data }) => {
    const qrCodeRef = useRef()

    return (
        <div>
            <ReactToPrint
                bodyClass="print-agreement"
                content={() => qrCodeRef.current}
                trigger={() => <button type="primary">Print</button>}
            />
            <Barcode value={data} ref={qrCodeRef} />
        </div>
    )
}

export default ExistingPatient
