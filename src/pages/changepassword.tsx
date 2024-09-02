import useSignupForm from "../components/Signup/useSignupForm";

export default function ChangePassword() {
  const { register, handleSubmit, control, setValue, errors } = useSignupForm();
  return (
    <div className="flex flex-col">
      <div className="bg-emerald-500 flex w-full h-14 sticky top-0 z-40 justify-center items-center">
        <span className="items-center text-[22px] font-semibold text-neutral-100">
          비밀번호 변경
        </span>
      </div>
      <div className="flex flex-col p-4">
        <div className="mt-5 mb-1">
          <label htmlFor="password" className="p-1 text-sm font-semibold">
            새 비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="새 비밀번호"
            className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-1"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">
              {errors.password?.message?.toString()}
            </p>
          )}
        </div>
        <input
          type="password"
          id="confirmPassword"
          placeholder="새 비밀번호 확인"
          className="w-full border border-gray-300 h-11 rounded-lg p-2 mb-1"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500 mb-0">
            {errors.confirmPassword?.message?.toString()}
          </p>
        )}
        <div className="mt-5 mb-1">
          <label htmlFor="password" className="p-1 text-sm font-semibold">
            현재 비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="현재 비밀번호"
            className="w-full border border-gray-300 h-11 p-2 rounded-lg mb-1"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">
              {errors.password?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-8 p-4">
        <button
          type="submit"
          className="bg-emerald-500 flex h-11 rounded-xl text-white justify-center text-center items-center w-full font-medium text-lg hover:bg-emerald-600 transition-colors"
        >
          비밀번호 변경
        </button>
      </div>
    </div>
  );
}
