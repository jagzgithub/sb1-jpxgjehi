export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  mobilenumber: string;
  gender: string;
  dateOfBirth: string;
  houseNumber: string;
  streetName: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface SignUpFormProps {
  onSuccess: () => void;
}