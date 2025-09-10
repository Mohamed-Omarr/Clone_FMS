// Type for the Contact object
type Contact = {
  email: string;
  phone: number;
};

// Type for each Patient
type Patient = {
  Name: string;
  Age: number;
  Contact: Contact;
  LastAssessment: string;
  FMSScore: number;      
  Status: string;
};

// Type for the main User object
export type User = {
  id: string;
  Name: string;
  Email: string;
  Image: string;
  Role: string;
  Patient: Patient[];
};


