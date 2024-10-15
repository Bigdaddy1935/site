
import { PaginateData } from "@/types/response";
import { CartType } from "../FavoritesCarousel/CartItem";
import { FilterType } from "./FilterContext";

export type ArchivePage = "article" | "course" | "product" | "podcast";
export type FilterKeys = {
    [key: string]: string
}
export type ArchiveLayoutProps = {
    pageType: ArchivePage,
    filters?: FilterType,
    filterKeys?: FilterKeys,
    teacherSelectHidden?: boolean,
    searchHidden?: boolean,
    pageTitle?: string;
    mostLikes ?: boolean;
    cartType ?: CartType
} & Partial<PaginateData<any>>