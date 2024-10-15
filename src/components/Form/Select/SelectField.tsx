"use client"
import { Controller, useFormContext } from "react-hook-form";
import Select, { SelectProps } from ".";
import IconAlertCircleOutline from "@/components/Icons/IconAlertCircleOutline";

type Props = {
  name: string;
  required?: boolean;
} & SelectProps;

export default function SelectField(props: Props) {
  const { required, name, label, ...allProps } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? `انتخاب فیلد ${label} الزامی است.` : undefined,
        validate: required
        ? (val) => val !== "null" || `انتخاب فیلد ${label} الزامی است.`
        : undefined,
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="relative pb-8">
          <Select {...allProps} name={name} className={error ? "outline-red-700 dark:outline-rose-300" : ""} value={value} onChange={onChange} label="" />
          <p className="absolute -top-5 left-0 text-xs font-semibold text-rose-700">
            {error ? error.message : ""}
          </p>

          {error ? (
            <span className="absolute text-rose-700 left-5 top-2">
              <IconAlertCircleOutline width={26} height={26} />
            </span>
          ) : null}
        </div>
      )}
    />
  );
}
