import { InjectionToken } from "@angular/core";
import { environment } from "src/environments/environment";

export const MEDICAL_PURPOSE_API = new InjectionToken<string>(environment.medicalPurposeApi);
export const MEDICAL_PURPOSE_AUTH_API = new InjectionToken<string>(environment.medicalPurposeAuthApi);