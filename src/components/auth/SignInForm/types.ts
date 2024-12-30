export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignInFormProps {
  onSuccess?: () => void;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  submit?: string;
}