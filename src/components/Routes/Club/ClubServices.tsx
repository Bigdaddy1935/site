import Image from "@/components/Assets/Image";
import IconCheckLg from "@/components/Icons/IconCheckLg";
import React from "react";

export default function ClubServices() {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
      <div className="flex-1">
        <h3 className="text-2xl mb-4 font-semibold text-blue-900 dark:text-text-dark-5">اطلاعات بیشتر</h3>

        {Array.from({ length: 3 }).map((_, index) => (
          <div className="flex items-center py-2">
            <IconCheckLg width={32} height={32} className="text-primary-700 dark:text-primary-100" />
            <p className="text-hgray-600 dark:text-text-dark-2">متن ایتم خدمت نوشته شود</p>
          </div>
        ))}
      </div>

      <div className="flex-1 flex justify-center">
        <Image alt="" width={400} height={400} src={"/club-services.svg"} />
      </div>
    </div>
  );
}
