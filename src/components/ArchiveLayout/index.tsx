import ArchiveContent from "./ArchiveContent";
import ArchiveSidebar from "./ArchiveSidebar";
import FilterProvider from "./FilterContext";
import { ArchiveLayoutProps } from "./types";

export default function ArchiveLayout(props: ArchiveLayoutProps) {
  return (
    <section className="mt-3 lg:mt-20 ">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <FilterProvider filterKeys={props.filterKeys} filters={props.filters}>
            <ArchiveSidebar
              title={props.pageTitle ?? "آرشیو"}
              pageType={props.pageType}
              teacherSelectHidden={props.teacherSelectHidden}
              searchHidden={props.searchHidden}
            />
            <ArchiveContent {...props} />
          </FilterProvider>
      </div>
    </section>
  );
}
