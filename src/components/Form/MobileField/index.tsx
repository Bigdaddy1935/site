import IconAlertCircleOutline from "@/components/Icons/IconAlertCircleOutline";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";

type Props = {
  name: string;
  label: string;
  className?: string;
  required?: boolean;
};

export const mobilePattern = /^(\+98|0)?9\d{9}$/g;
const MobileField = (props: Props) => {
  const { name, label, className, required = true } = props;
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={{
        required: required ? "ورود شماره موبایل الزامی است." : undefined,
        validate: required
          ? (val) =>
              mobilePattern.test(val?.replaceAll(" ", "")) ||
              "شماره وارد شده صحیح نیست"
          : undefined,
      }}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex relative flex-col lg:flex-row lg:items-center">
          {label ? (
            <label className="text-hgray-600 dark:text-text-dark-3 font-medium flex-1 lg:min-w-[100px] text-sm mb-2 inline-block">
              {label}
            </label>
          ) : null}
          <PatternFormat
            {...field}
            lang="fa-IR"
            className={clsx(
              className,
              "bg-hgray-200 p-2 dark:bg-mdark-500 text-hgray-400  rounded-lg !border-none !shadow-none !outline-0 text-right",
              error ? "!outline-red-700 dark:!outline-rose-300" : ""
            )}
            dir="ltr"
            format="09## #### ###"
            allowEmptyFormatting
            mask="_"
          />
          <p className="absolute -top-6 left-0 text-xs font-semibold text-rose-700">
            {error ? error.message : ""}
          </p>

          {error ? (
            <span className="absolute text-rose-700 left-1 top-2.5">
              <IconAlertCircleOutline width={26} height={26} />
            </span>
          ) : null}
        </div>
      )}
    />
  );
};

export default MobileField;
