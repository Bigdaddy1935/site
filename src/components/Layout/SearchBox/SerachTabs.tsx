"use client";
import Button from "@/components/Assets/Button";
import { Tab, tabs, useSearchBox } from "./SearchBoxProvider";

export default function SerachTabs() {
  const { activeTab, setActiveTab } = useSearchBox();
  return (
    <div className="flex justify-evenly gap-[5%]">
      {tabs.map((i) => (
        <Button
          size="medium"
          color="gray"
          onClick={() => setActiveTab(i.value as Tab)}
          className={`flex-1 font-normal ${activeTab === i.value ? "bg-primary-300 dark:bg-primary-700 text-hgray-200 " : "bg-hgray-200 text-hgray-600 dark:bg-mdark-500 dark:text-hgray-200"}`}
          key={i.value}
        >
          {i.title}
        </Button>
      ))}
    </div>
  );
}
