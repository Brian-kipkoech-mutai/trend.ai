import { useState, ChangeEvent } from "react";

interface FormData {
  name?: string;
  password?: string;
  role?: string;
  email?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  contentLink?: string;
  // Add other fields as needed
}

const useFormData = (initialState: FormData = {}) => {
  const [formData, setFormData] = useState<FormData>(initialState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return { handleChange, formData, setFormData };
};

export default useFormData;
