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
};

// Type for the main User object
export type User = {
  id: string;
  Name: string;
  Email: string;
  Image: string;
  Role: string;
  Patient: Patient[];
  "Last Assessment": string; // can also be Date if you parse it
  "FMS Score": number;      // or number if you convert
  Status: string;
}[];


