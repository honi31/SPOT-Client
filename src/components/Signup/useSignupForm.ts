import { useForm, Control, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../utils/schema";
import { useNavigate } from "react-router-dom";

const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    navigate("/product");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    setValue,
  };
};

export default useSignupForm;
