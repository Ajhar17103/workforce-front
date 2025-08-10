'use client';

import Form from "@/common/form/Form";
import axiosInstance from "@/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/slices/countrySlice";
import { fetchMissions } from "@/redux/slices/missionSlice";
import { FormField } from "@/types/common/FormField";
import { MissionParam, MissionUpdateProps } from "@/types/general-setup/mission.type";
import { getUtilityApiUrl } from "@/utils/api";
import { getDefaultValues } from "@/utils/getDefaultValues";
import { setSchemaDefaultValue } from "@/utils/setSchemaDefaultValue";
import { setSchemaEnum } from "@/utils/setSchemaEnum";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { missionSchema as baseSchema } from "./UserFormSchema";


export default function UserUpdate({itemUpdate,closeModal}:MissionUpdateProps) {
  const {register,handleSubmit,formState: { errors },reset} = useForm<MissionParam>({defaultValues: getDefaultValues<MissionParam>(itemUpdate)});
console.log("test",getDefaultValues<MissionParam>(itemUpdate))
  const missionUrl = getUtilityApiUrl("/missions");

  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector((state) => state.country);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

useEffect(() => {
  if (countries?.length !== 0 && itemUpdate) {
    const enumMap = {
      missionCountryId: countries,
    };
    const withEnums = setSchemaEnum(baseSchema, enumMap);

    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);

    setSchema(finalSchema);
  }

  
}, [countries, itemUpdate]);


  const handleFormSubmit = (data: MissionParam) => {
    if(itemUpdate?.id){
    axiosInstance
      .put(`${missionUrl}/${itemUpdate?.id}`, data)
      .then((response) => {
        toast.success("Mission created successfully", { theme: "dark" });
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
