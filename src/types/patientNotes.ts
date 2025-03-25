
// Define interfaces for our Patient Notes data
export interface Note {
  id: string;
  content: string;
  timestamp: string;
}

// Define interfaces for RPC function responses
export interface PatientNoteRecord {
  id: string;
  patient_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

// Define RPC function parameter types
export interface GetPatientNotesParams {
  p_patient_id: string;
}

export interface AddPatientNoteParams {
  p_patient_id: string;
  p_content: string;
}

export interface DeletePatientNoteParams {
  p_note_id: string;
}
