
// Mock data types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  mrn: string; // Medical Record Number
  photo?: string;
  lastVisit: string;
  status: 'stable' | 'critical' | 'warning';
  primaryDoctor: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  vitalSigns?: VitalSigns;
  conditions: Condition[];
  medications: Medication[];
  allergies: string[];
  labResults: LabResult[];
  visits: Visit[];
}

export interface VitalSigns {
  temperature: number;
  heartRate: number;
  bloodPressure: string;
  respiratoryRate: number;
  oxygenSaturation: number;
  recordedAt: string;
}

export interface Condition {
  name: string;
  diagnosedDate: string;
  status: 'active' | 'resolved' | 'chronic';
  severity: 'mild' | 'moderate' | 'severe';
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

export interface LabResult {
  name: string;
  date: string;
  result: string;
  normalRange?: string;
  status: 'normal' | 'abnormal' | 'critical';
}

export interface Visit {
  date: string;
  type: 'emergency' | 'routine' | 'follow-up' | 'procedure';
  provider: string;
  notes: string;
}

// Mock patients data
export const patients: Patient[] = [
  {
    id: "p-001",
    firstName: "Alex",
    lastName: "Morgan",
    dateOfBirth: "1985-06-12",
    gender: "Male",
    mrn: "MRN78925",
    photo: undefined,
    lastVisit: "2023-11-28",
    status: "stable",
    primaryDoctor: "Dr. Sarah Johnson",
    contactInfo: {
      phone: "(555) 123-4567",
      email: "alex.morgan@example.com",
      address: "123 Main St, Cityville, ST 12345"
    },
    vitalSigns: {
      temperature: 98.6,
      heartRate: 72,
      bloodPressure: "120/80",
      respiratoryRate: 16,
      oxygenSaturation: 98,
      recordedAt: "2023-11-28T14:30:00"
    },
    conditions: [
      {
        name: "Type 2 Diabetes",
        diagnosedDate: "2019-03-15",
        status: "active",
        severity: "moderate"
      },
      {
        name: "Hypertension",
        diagnosedDate: "2018-05-22",
        status: "active",
        severity: "mild"
      }
    ],
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        startDate: "2019-03-20",
        prescribedBy: "Dr. Sarah Johnson"
      },
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2018-05-25",
        prescribedBy: "Dr. Sarah Johnson"
      }
    ],
    allergies: ["Penicillin", "Shellfish"],
    labResults: [
      {
        name: "HbA1c",
        date: "2023-11-15",
        result: "7.2%",
        normalRange: "<5.7%",
        status: "abnormal"
      },
      {
        name: "Lipid Panel",
        date: "2023-11-15",
        result: "LDL: 110mg/dL",
        normalRange: "<100mg/dL",
        status: "abnormal"
      },
      {
        name: "Comprehensive Metabolic Panel",
        date: "2023-11-15",
        result: "Within normal limits",
        status: "normal"
      }
    ],
    visits: [
      {
        date: "2023-11-28",
        type: "follow-up",
        provider: "Dr. Sarah Johnson",
        notes: "Patient reports improved glucose control with current medication regimen. Adjusting diet and exercise plan. Schedule follow-up in 3 months."
      },
      {
        date: "2023-08-15",
        type: "routine",
        provider: "Dr. Sarah Johnson",
        notes: "Annual physical examination. All systems reviewed. Prescribed medication refills for hypertension and diabetes."
      }
    ]
  },
  {
    id: "p-002",
    firstName: "Emily",
    lastName: "Chen",
    dateOfBirth: "1992-09-23",
    gender: "Female",
    mrn: "MRN65432",
    photo: undefined,
    lastVisit: "2023-12-05",
    status: "warning",
    primaryDoctor: "Dr. Michael Rodriguez",
    contactInfo: {
      phone: "(555) 987-6543",
      email: "emily.chen@example.com",
      address: "456 Oak Ave, Townsville, ST 67890"
    },
    vitalSigns: {
      temperature: 99.1,
      heartRate: 88,
      bloodPressure: "135/85",
      respiratoryRate: 18,
      oxygenSaturation: 96,
      recordedAt: "2023-12-05T10:15:00"
    },
    conditions: [
      {
        name: "Asthma",
        diagnosedDate: "2010-07-18",
        status: "active",
        severity: "moderate"
      },
      {
        name: "Migraine",
        diagnosedDate: "2015-11-03",
        status: "active",
        severity: "moderate"
      }
    ],
    medications: [
      {
        name: "Albuterol",
        dosage: "90mcg",
        frequency: "As needed",
        startDate: "2010-07-20",
        prescribedBy: "Dr. Michael Rodriguez"
      },
      {
        name: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed for migraine",
        startDate: "2015-11-10",
        prescribedBy: "Dr. Michael Rodriguez"
      }
    ],
    allergies: ["Latex", "Peanuts"],
    labResults: [
      {
        name: "CBC",
        date: "2023-12-01",
        result: "WBC elevated",
        normalRange: "4.5-11.0 x10^9/L",
        status: "abnormal"
      },
      {
        name: "Lung Function Test",
        date: "2023-11-20",
        result: "FEV1: 75% predicted",
        normalRange: ">80% predicted",
        status: "abnormal"
      }
    ],
    visits: [
      {
        date: "2023-12-05",
        type: "follow-up",
        provider: "Dr. Michael Rodriguez",
        notes: "Patient reports increased frequency of asthma exacerbations. Adjusting medication regimen and recommending pulmonologist consultation."
      },
      {
        date: "2023-10-12",
        type: "emergency",
        provider: "Dr. Lisa Thompson",
        notes: "Presented with severe migraine. Administered IV medication. Symptoms resolved. Discharged with follow-up instructions."
      }
    ]
  },
  {
    id: "p-003",
    firstName: "Robert",
    lastName: "Williams",
    dateOfBirth: "1957-03-08",
    gender: "Male",
    mrn: "MRN12349",
    photo: undefined,
    lastVisit: "2023-12-10",
    status: "critical",
    primaryDoctor: "Dr. Patricia Lee",
    contactInfo: {
      phone: "(555) 456-7890",
      email: "robert.williams@example.com",
      address: "789 Pine St, Villagetown, ST 54321"
    },
    vitalSigns: {
      temperature: 100.2,
      heartRate: 95,
      bloodPressure: "160/95",
      respiratoryRate: 22,
      oxygenSaturation: 92,
      recordedAt: "2023-12-10T08:45:00"
    },
    conditions: [
      {
        name: "Congestive Heart Failure",
        diagnosedDate: "2015-02-10",
        status: "active",
        severity: "severe"
      },
      {
        name: "Chronic Kidney Disease",
        diagnosedDate: "2018-09-05",
        status: "active",
        severity: "moderate"
      },
      {
        name: "COPD",
        diagnosedDate: "2012-11-18",
        status: "active",
        severity: "severe"
      }
    ],
    medications: [
      {
        name: "Furosemide",
        dosage: "40mg",
        frequency: "Twice daily",
        startDate: "2015-02-15",
        prescribedBy: "Dr. Patricia Lee"
      },
      {
        name: "Lisinopril",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "2015-02-15",
        prescribedBy: "Dr. Patricia Lee"
      },
      {
        name: "Tiotropium",
        dosage: "18mcg",
        frequency: "Once daily",
        startDate: "2012-11-25",
        prescribedBy: "Dr. Patricia Lee"
      }
    ],
    allergies: ["Sulfa drugs"],
    labResults: [
      {
        name: "BNP",
        date: "2023-12-09",
        result: "850 pg/mL",
        normalRange: "<100 pg/mL",
        status: "critical"
      },
      {
        name: "Creatinine",
        date: "2023-12-09",
        result: "2.3 mg/dL",
        normalRange: "0.7-1.3 mg/dL",
        status: "abnormal"
      },
      {
        name: "Arterial Blood Gas",
        date: "2023-12-10",
        result: "pH: 7.32, pO2: 85 mmHg",
        normalRange: "pH: 7.35-7.45, pO2: >90 mmHg",
        status: "abnormal"
      }
    ],
    visits: [
      {
        date: "2023-12-10",
        type: "emergency",
        provider: "Dr. Patricia Lee",
        notes: "Admitted for acute exacerbation of CHF. Presenting with increased dyspnea, peripheral edema, and decreased exercise tolerance. Started IV diuretics and oxygen therapy."
      },
      {
        date: "2023-11-05",
        type: "follow-up",
        provider: "Dr. Patricia Lee",
        notes: "Routine follow-up for CHF and CKD. Medication adjustments made based on lab values. Emphasizing fluid and sodium restriction."
      }
    ]
  },
  {
    id: "p-004",
    firstName: "Sophia",
    lastName: "Garcia",
    dateOfBirth: "2005-12-15",
    gender: "Female",
    mrn: "MRN98765",
    photo: undefined,
    lastVisit: "2023-12-03",
    status: "stable",
    primaryDoctor: "Dr. James Wilson",
    contactInfo: {
      phone: "(555) 234-5678",
      email: "sophia.garcia@example.com",
      address: "321 Cedar Rd, Hamletville, ST 13579"
    },
    vitalSigns: {
      temperature: 98.7,
      heartRate: 75,
      bloodPressure: "110/70",
      respiratoryRate: 16,
      oxygenSaturation: 99,
      recordedAt: "2023-12-03T13:20:00"
    },
    conditions: [
      {
        name: "Type 1 Diabetes",
        diagnosedDate: "2012-05-20",
        status: "active",
        severity: "moderate"
      }
    ],
    medications: [
      {
        name: "Insulin Glargine",
        dosage: "20 units",
        frequency: "Once daily",
        startDate: "2012-05-25",
        prescribedBy: "Dr. James Wilson"
      },
      {
        name: "Insulin Lispro",
        dosage: "Variable based on carbs",
        frequency: "Before meals",
        startDate: "2012-05-25",
        prescribedBy: "Dr. James Wilson"
      }
    ],
    allergies: ["Cephalosporins"],
    labResults: [
      {
        name: "HbA1c",
        date: "2023-12-01",
        result: "6.8%",
        normalRange: "<5.7%",
        status: "abnormal"
      },
      {
        name: "Lipid Panel",
        date: "2023-12-01",
        result: "Within normal limits",
        status: "normal"
      }
    ],
    visits: [
      {
        date: "2023-12-03",
        type: "follow-up",
        provider: "Dr. James Wilson",
        notes: "Routine diabetes follow-up. Good glucose control with current regimen. Discussing transitions of care as patient approaches adulthood."
      },
      {
        date: "2023-09-15",
        type: "follow-up",
        provider: "Dr. James Wilson",
        notes: "Quarterly diabetes check. Reviewing CGM data. Patient engaged in self-management."
      }
    ]
  },
  {
    id: "p-005",
    firstName: "David",
    lastName: "Kim",
    dateOfBirth: "1978-08-30",
    gender: "Male",
    mrn: "MRN24680",
    photo: undefined,
    lastVisit: "2023-11-20",
    status: "stable",
    primaryDoctor: "Dr. Rachel Patel",
    contactInfo: {
      phone: "(555) 876-5432",
      email: "david.kim@example.com",
      address: "654 Elm St, Boroughburg, ST 97531"
    },
    vitalSigns: {
      temperature: 98.4,
      heartRate: 68,
      bloodPressure: "118/78",
      respiratoryRate: 14,
      oxygenSaturation: 99,
      recordedAt: "2023-11-20T11:10:00"
    },
    conditions: [
      {
        name: "Depression",
        diagnosedDate: "2019-10-12",
        status: "active",
        severity: "moderate"
      },
      {
        name: "Gastroesophageal Reflux Disease",
        diagnosedDate: "2020-03-05",
        status: "active",
        severity: "mild"
      }
    ],
    medications: [
      {
        name: "Escitalopram",
        dosage: "10mg",
        frequency: "Once daily",
        startDate: "2019-10-15",
        prescribedBy: "Dr. Rachel Patel"
      },
      {
        name: "Omeprazole",
        dosage: "20mg",
        frequency: "Once daily",
        startDate: "2020-03-10",
        prescribedBy: "Dr. Rachel Patel"
      }
    ],
    allergies: [],
    labResults: [
      {
        name: "Thyroid Function Panel",
        date: "2023-11-15",
        result: "Within normal limits",
        status: "normal"
      },
      {
        name: "CBC",
        date: "2023-11-15",
        result: "Within normal limits",
        status: "normal"
      }
    ],
    visits: [
      {
        date: "2023-11-20",
        type: "follow-up",
        provider: "Dr. Rachel Patel",
        notes: "Patient reports improved mood on current medication. GERD symptoms well-controlled. Continuing current management plan."
      },
      {
        date: "2023-08-05",
        type: "follow-up",
        provider: "Dr. Rachel Patel",
        notes: "Depression follow-up. PHQ-9 score 8, improved from 15. Maintaining current prescription."
      }
    ]
  }
];
