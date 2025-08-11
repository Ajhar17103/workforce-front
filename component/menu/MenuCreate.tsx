'use client';

import Form from "@/common/form/Form";
import axiosInstance from "@/lib/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCountries } from "@/redux/slices/countrySlice";
import { fetchMissions } from "@/redux/slices/missionSlice";
import { FormField } from "@/types/common/FormField";
import { getUtilityApiUrl } from "@/utils/api";
import { setSchemaEnum } from "@/utils/setSchemaEnum";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { menuFormSchema as baseSchema } from "./MenuFormSchema";
import { MenuParam, MenuUpdateProps } from "@/types/master-data/menu.type";

export default function MenuCreate({closeModal}:MenuUpdateProps) {
  const {register,handleSubmit,control,formState: { errors },reset} = useForm<MenuParam>();

  const missionUrl = getUtilityApiUrl("/menus");

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


  const handleFormSubmit = (data: MenuParam) => {

    let menuPostData={
    name: data.menuType==='MAINMENU'? data?.menuName:data?.subMenuName,
    icon: data.menuType==='MAINMENU'? data?.icon:"",
    path:data?.path,
    menuType: data.menuType,
    parentId:data?.parentId? data?.parentId:null
    }
console.log('menuPostData:', menuPostData)
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
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white p-4 rounded-bottom border"
      >
        <div className="row g-3">
            <Form schema={schema} register={register} control={control} errors={errors} />
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
  );
}
