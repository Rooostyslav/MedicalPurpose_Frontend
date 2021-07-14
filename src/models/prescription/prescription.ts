import { Doctor } from "../doctor/doctor";
import { PrescriptionMedicine } from "../medicine/prescription.medicine";
import { Patient } from "../patient/patient";

export interface Prescription {
    id: number;
    doctorId: number;
    doctor: Doctor;
    patientId: number;
    patient: Patient;
    description: string;
    medicines: PrescriptionMedicine[];
}