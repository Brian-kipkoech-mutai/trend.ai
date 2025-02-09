import { useState, ChangeEvent } from "react";

interface FormData {
  name?: string;
  password: string;
  role?: string;
  email: string;
  startDate?: Date;
  endDate?: Date;
 
}

const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    password: "",
    role: "",
    email: "",
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement> |ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return { handleChange, formData, setFormData };
};

export default useFormData;
