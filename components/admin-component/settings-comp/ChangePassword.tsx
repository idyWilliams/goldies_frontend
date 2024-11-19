import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeSlash, Lock1 } from "iconsax-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactPasswordChecklist from "react-password-checklist";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { changeAdminPassword } from "@/services/hooks/admin-auth";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),
  newPassword: yup.string().required("New password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function ChangePassword() {
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const admin = JSON.parse(localStorage.getItem("admin") as string) || null;

  const updatePassword = useMutation({
    mutationFn: changeAdminPassword,
    mutationKey: ["updatePassword"],
  });

  const toggleEye1 = () => {
    setEye1((prev: any) => !prev);
  };
  const toggleEye2 = () => {
    setEye2((prev: any) => !prev);
  };
  const toggleEye3 = () => {
    setEye3((prev: any) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  // const password = watch("newPassword");
  // const confirm = watch("confirm");
  // console.log(password);
  const handleSave = async (data: any) => {
    const { newPassword, oldPassword: currentPassword } = data;
    console.log(
      {
        newPassword,
        currentPassword,
        id: admin?._id,
      },
      errors,
      "DATA PASWOSSSS",
    );

    try {
      const update = await updatePassword.mutateAsync({
        newPassword,
        currentPassword,
        id: admin?._id,
      });

      toast.success("Password Updated!!!");

      console.log(update);

      // CLEAR INPUT FIELDS ON SUCCESS UPDATE
      reset();
      setPassword("");
      setPasswordAgain("");
    } catch (error: any) {
      console.log(error, "CHangePAsS");
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const handleCancel = () => {
    setPassword("");
    setPasswordAgain("");
    console.log("click cancelled");
    reset();
  };
  return (
    <>
      <section className="w-full px-2 lg:w-[48%]">
        <>
          <div className="mb-6">
            <h1 className="font-bold">Change Password</h1>
            <p className="text-sm text-neutral-500">
              Input your password below
            </p>
          </div>
          <form
            id="changePassword"
            className="space-y-5"
            onSubmit={handleSubmit(handleSave)}
          >
            <label htmlFor="oldPassword" className="relative block">
              <span className="mb-1 text-sm font-medium">Old Password</span>
              <input
                {...register("oldPassword")}
                type={eye1 ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                className="form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black"
              />
              <span
                className="absolute bottom-3 right-3 cursor-pointer text-gray-500"
                onClick={toggleEye1}
              >
                {eye1 ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </label>
            <label htmlFor="newPassword" className="relative block">
              <span className="mb-1 text-sm font-medium">New Password</span>
              <input
                {...register("newPassword")}
                type={eye2 ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                className="form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span
                className="absolute bottom-3 right-3 cursor-pointer text-gray-500"
                onClick={toggleEye2}
              >
                {eye2 ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </label>
            <label htmlFor="confirm" className="relative mb-2 block">
              <span className="mb-1 text-sm font-medium">
                Confirm New Password
              </span>
              <input
                {...register("confirm")}
                type={eye3 ? "text" : "password"}
                name="confirm"
                id="confirm"
                className="form-input w-full rounded-sm border-none bg-gray-100 focus:border focus:border-black focus:ring-black"
                onChange={(e) => setPasswordAgain(e.target.value)}
                value={passwordAgain}
              />
              <span
                className="absolute bottom-3 right-3 cursor-pointer text-gray-500"
                onClick={toggleEye3}
              >
                {eye3 ? <EyeSlash size={20} /> : <Eye size={20} />}
              </span>
            </label>
            {password !== "" && (
              <ReactPasswordChecklist
                rules={[
                  "minLength",
                  "specialChar",
                  "number",
                  "capital",
                  "match",
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordAgain}
                onChange={(isValid) => {}}
              />
            )}
            <div className="mb-6 mt-10  grid  grid-cols-2 gap-8 lg:mb-0">
              <Button
                type="submit"
                disabled={updatePassword?.isPending}
                className="h-auto items-center justify-center gap-2 rounded-sm bg-black px-5 py-2 text-sm text-main lg:text-base"
              >
                {updatePassword?.isPending ? (
                  <>
                    <span>
                      <CgSpinner className="animate-spin" />
                    </span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </>
      </section>
    </>
  );
}
