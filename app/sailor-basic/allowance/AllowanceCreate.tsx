'use client';

import Form from "@/components/form/Form";
import axiosInstance from "@/lib/axiosInstance";
import { FormField } from "@/types/common/FormField";
import { getUtilityApiUrl } from "@/utils/api";
import { setSchemaEnum } from "@/utils/setSchemaEnum";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { allowanceSchema as baseSchema } from "./AllowanceSchema";
import { actionStatus, allowFor, calculationMode, duration, payBasedOn, payStatus, processType } from "@/utils/enums";
import { AllowanceParam } from "@/types/sailor-basic/allowance.type";
import { fetchAllowances } from "@/redux/slices/allowanceSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function AllowanceCreate() {
  const {register,handleSubmit,formState: { errors },reset} = useForm<AllowanceParam>();

  const dispatch = useAppDispatch();

  const apiUrl = getUtilityApiUrl("/allowances");

  const [schema, setSchema] = useState<FormField[]>(baseSchema);


  useEffect(() => {
     
    const enumMap = {
      payStatus:payStatus,
      applyFor: allowFor,
      calculationMode:calculationMode,
      actionStatus:actionStatus,
      duration:duration,
      jsiDuration:duration,
      payBasedOn:payBasedOn,
      processType:processType,
    };

    const updatedSchema = setSchemaEnum(baseSchema, enumMap);
    setSchema(updatedSchema);
  
}, []);


  const handleFormSubmit = (data: AllowanceParam) => {
    axiosInstance
      .post(apiUrl, data)
      .then((response) => {
        toast.success("Allowance created successfully", { theme: "dark" });
        dispatch(fetchAllowances());
        reset()
        console.log(response);
      })
      .catch((error) => {
        toast.error("Something went wrong!", {
          theme: "dark",
          closeOnClick: false,
        });
        console.error(error);
      });
  };

  const handleClear = () => reset();

  return (
    <div className="mb-5">
      <div className="bg-light p-3 rounded-top border">
        <h2 className="h5 text-primary m-0">Allowance</h2>
      </div>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white p-4 rounded-bottom border border-top-0"
      >
        <div className="row g-3">
            <Form schema={schema} register={register} errors={errors} />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3 py-2 border-top">
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-outline-danger"
          >
            <i className="bi bi-eraser" /> Clear All
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-floppy2-fill" /> Save
          </button>
        </div>
      </form>
    </div>
  );
}
