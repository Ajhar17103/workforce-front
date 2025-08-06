'use client';

import Form from "@/components/form/Form";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/slices/countrySlice";
import { FormField } from "@/types/common/FormField";
import { getUtilityApiUrl } from "@/utils/api";
import { getDefaultValues } from "@/utils/getDefaultValues";
import { setSchemaDefaultValue } from "@/utils/setSchemaDefaultValue";
import { setSchemaEnum } from "@/utils/setSchemaEnum";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { allowanceSchema as baseSchema } from "./AllowanceSchema";
import { toast } from "react-toastify";
import { fetchMissions } from "@/redux/slices/missionSlice";
import axiosInstance from "@/lib/axiosInstance";
import { AllowanceParam, AllowanceUpdateProps } from "@/types/sailor-basic/allowance.type";
import { actionStatus, allowFor, calculationMode, duration, payBasedOn, payStatus, processType } from "@/utils/enums";


export default function AllowanceUpdate({itemUpdate,closeModal}:AllowanceUpdateProps) {
  console.log('itemUpdate',itemUpdate)
  const {register,handleSubmit,formState: { errors },reset} = useForm<AllowanceParam>({defaultValues: getDefaultValues<AllowanceParam>(itemUpdate)});
console.log("test",getDefaultValues<AllowanceParam>(itemUpdate))
  const apiUrl = getUtilityApiUrl("/allowances");

  const dispatch = useAppDispatch();
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
    const withEnums = setSchemaEnum(baseSchema, enumMap);

    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);

    setSchema(finalSchema);
  

  
}, [itemUpdate]);


  const handleFormSubmit = (data: AllowanceParam) => {
    if(itemUpdate?.id){
    axiosInstance
      .put(`${apiUrl}/${itemUpdate?.id}`, data)
      .then((response) => {
        toast.success("Allowance updated successfully", { theme: "dark" });
        dispatch(fetchMissions());
        closeModal();
        console.log(response);
      })
      .catch((error) => {
        toast.error("Something went wrong!", {
          theme: "dark",
          closeOnClick: false,
        });
        console.error(error);
      });
    }

  };


  return (
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white rounded-bottom"
      >
        <div className="row g-3">
            <Form schema={schema} register={register} errors={errors} />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-3 py-2 border-top">
          
          <button
            type="button"
            onClick={()=>closeModal()}
            className="btn btn-outline-danger"
          >
            <i className="bi bi-x" /> Cancel
          </button>

          <button type="submit" className="btn btn-primary">
            <i className="bi bi-floppy2-fill" /> Save
          </button>
        </div>
      </form>
  );
}
