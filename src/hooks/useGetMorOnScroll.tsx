"use client";
import { Post, Query } from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import { PaginateData } from "@/types/response";

type Props = {
  route: {
    url: string;
    method?: "post" | "get";
  };
  body?: any;
  params?: any;
};
export default function useGetMorOnScroll({
  route,
  body = {},
  params = {},
}: Props) {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getMoreData = () => {
    const request = route.method === "get" ? Query : Post;
    request<any>(route.url, {
      params: { ...params, page: currentPage + 1 },
      ...(route.method === "post" ? { data: { ...body } } : null),
    })
      .then((res: PaginateData<any>) => {
        if (res.data) {
          setData((pre) =>
            currentPage === 0
              ? [...(res as PaginateData<any>).data]
              : [...pre, ...(res as PaginateData<any>).data]
          );
          setCurrentPage((prev) => res.current_page);
          setLastPage(res.last_page);
        } else {
          setCurrentPage(99999);
        }
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  };

  const handleFetchdata = (reset: boolean = false) => {
    if (!loading && currentPage < lastPage) {
      setLoading(() => true);
      getMoreData();
    } else if (currentPage === lastPage) setShowEnd(true);
  };

  const fetchInitData = () => {
    setCurrentPage(0);
    setData([]);
    setTimeout(() => handleFetchdata(), 100);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          handleFetchdata();
          //observer.disconnect();
        }
      },
      { threshold: 1 } // Adjust the threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [params]);

  /*   useEffect(() => {
    window?.addEventListener('scroll', handleScroll);
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, loading]); */

  return {
    data,
    loading,
    showEnd,
    currentPage,
    lastPage,
    ref,
    setData,
    setCurrentPage,
    handleFetchdata,
    fetchInitData,
  };
}
