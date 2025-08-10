'use client';

import Form from "@/common/form/Form";
import axiosInstance from "@/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/slices/countrySlice";
import { fetchMissions } from "@/redux/slices/missionSlice";
import { FormField } from "@/types/common/FormField";
import { MissionParam } from "@/types/general-setup/mission.type";
import { getUtilityApiUrl } from "@/utils/api";
import { setSchemaEnum } from "@/utils/setSchemaEnum";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { missionSchema as baseSchema } from "./MenuFormSchema";

export default function MenuCreate() {
  const {register,handleSubmit,formState: { errors },reset} = useForm<MissionParam>();

  const missionUrl = getUtilityApiUrl("/missions");

  const dispatch = useAppDispatch();
  const { countries, loading, error } = useAppSelector((state) => state.country);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (countries?.length!==0) {
    const enumMap = {
      missionCountryId: countries,
    };

    const updatedSchema = setSchemaEnum(baseSchema, enumMap);
    setSchema(updatedSchema);
  }
  
}, [countries]);


  const handleFormSubmit = (data: MissionParam) => {
    axiosInstance
      .post(missionUrl, data)
      .then((response) => {
        toast.success("Mission created successfully", { theme: "dark" });
        dispatch(fetchMissions());
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
        <h2 className="h5 text-primary m-0">Mission</h2>
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
