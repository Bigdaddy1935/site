import AppDownloadLink from "@/components/Assets/AppDownloadLink";
import IconArrowDownShort from "@/components/Icons/IconArrowDownShort";
import NextLink from "../Assets/NextLink";
import IconLogoPwa from "../Icons/IconLogoPwa";


export default  function () {
  return (
    <div className="p-3 lg:h-full lg:flex lg:flex-col lg:justify-center lg:gap-2 lg:bg-[url('/menu-bg.png')] bg-center bg-contain bg-no-repeat lg:bg-[100% 100%]">
      <div className="flex flex-col gap-4 justify-between items-center">
        <p className="text-base text-hgray-600 dark:text-white dark:lg:text-primary-300 lg:text-2xl lg:text-primary-300 lg:font-semibold">
          دانلود اپلیکیشن
        </p>
        
        <AppDownloadLink
          className="flex flex-1 p-1 items-center justify-between border-2 rounded-md border-primary-300 text-primary-400 lg:rounded-full dark:text-primary-50 lg:bg-primary-300 lg:text-white lg:w-[160px] lg:px-3"
        >
          <span className="text-base">دریافت</span>

          <span>
            <IconArrowDownShort width={28} height={28} />
          </span>
        </AppDownloadLink>
        <NextLink
          href={"https://app.roohbakhshac.ir/"}
          target="_blank"
          className="flex w-full flex-1 p-1 items-center justify-between border-2 rounded-md border-primary-300 dark:border-primary-50 text-primary-400 dark:text-primary-50 lg:rounded-full lg:bg-primary-300 lg:text-white lg:w-[160px] lg:px-3"
        >
          <span className="text-base">ورود به وب اپ</span>

          <span>
            <IconLogoPwa width={28} height={28} />
          </span>
        </NextLink>
      </div>

      {/*   <p className="text-sm lg:hidden text-hgray-400 dark:text-white mt-4">
        توضیحاتی در مورد اپلیکیشن لیزبذطذطذطذذرب ائزلاتلازلازلازالزااززدزطلبد
      </p> */}
    </div>
  );
}
