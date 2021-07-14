import { Doctor } from "../doctor/doctor";
import { Patient } from "../patient/patient";

export interface Visit {
    id: number;
    doctorId: number;
    doctor: Doctor;
    patientId: number;
    patient: Patient;
    dateTime: Date;
}