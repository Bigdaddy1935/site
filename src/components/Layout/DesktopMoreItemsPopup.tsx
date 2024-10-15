import AppDownload from "./AppDownload";
import DesktopPopup from "./DesktopPopup";
import MoreItemsMenu from "./MoreItemsMenu";
import TeacherList from "./TeacherList";

export default function DesktopMoreItemsPopup() {
  return (
    <DesktopPopup>
      <div className="flex-1 px-4">
        <MoreItemsMenu />
      </div>

      {/* 
            <div className="w-0.5 bg-hgray-300 dark:bg-mdark-400" />
            <div className="flex-1 px-4">

                 <TeacherList /> 
            </div> */}

      <div className="w-0.5 bg-hgray-300 dark:bg-mdark-400" />

      <div className="flex-1 px-4">
        <AppDownload />
      </div>
    </DesktopPopup>
  );
}
