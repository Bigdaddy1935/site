import FieldTitle from "@/components/Assets/FieldTitle";
import SelectField from "@/components/Form/Select/SelectField";
import {
  useGetStateCitiesQuery,
  useGetStatesQuery,
} from "@/lib/services/mahdyar";
import React from "react";

import { useFormContext } from "react-hook-form";

type Props = {
  defaultState?: string | undefined;
  defaultCity?: string | undefined;
};

export default function SelectStateAndCity({
  defaultCity = "null",
  defaultState = "null",
}: Props) {
  const { data: states, isLoading } = useGetStatesQuery();

  const { watch } = useFormContext();

  const stateName = watch("state");

  const { data: cities, isLoading: getCitiesLoading } = useGetStateCitiesQuery(
    { stateName },
    {
      skip: !stateName || stateName === "null" || stateName === "loading",
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <React.Fragment>
      <div className="px-3 w-full lg:w-[50%]">
        <FieldTitle title="استان" required />
        <SelectField
          required
          name="state"
          defaultValue={isLoading ? "loading" : defaultState}
          items={
            isLoading || !states
              ? [{ label: "در حال دریافت...", value: "loading" }]
              : states?.map((i) => ({ label: i.name, value: i.name }))
          }
          className="w-full"
          label=""
        />
      </div>
      <div className="px-3 w-full lg:w-[50%]">
        <FieldTitle title="شهر" required />
        <SelectField
          required
          initOption={getCitiesLoading || stateName === "null" ? false : true}
          name="city"
          defaultValue={getCitiesLoading ? "loading" : defaultCity}
          items={
            !getCitiesLoading && cities
              ? cities?.map((i) => ({ label: i.name, value: i.name }))
              : stateName === "null"
                ? [{ label: "ابتدا استان را انتخاب کنید", value: "null" }]
                : [{ label: "در حال دریافت...", value: "loading" }]
          }
          className="w-full"
          label=""
        />
      </div>
    </React.Fragment>
  );
}
