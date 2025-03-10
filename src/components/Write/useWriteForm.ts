import { useForm, Control, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { writeSchema } from "../../utils/writeSchema";
import { useNavigate } from "react-router-dom";

const useSignupForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(writeSchema),
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
    watch,
  };
};

export default useSignupForm;
