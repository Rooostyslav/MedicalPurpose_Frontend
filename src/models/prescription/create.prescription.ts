import { MedicineAmount } from "./medicine.amount";

export interface CreatePrescription {
    doctorId: number;
    patientId: number;
    description: string;
    medicines: MedicineAmount[];
}