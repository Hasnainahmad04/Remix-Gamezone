import { useSearchParams } from "@remix-run/react";

interface params {
  totalCount: number;
  pageSize?: number;
}

interface res {
  currentPage: number;
  lastPage: number;
  goToPage: (page: number | string) => string;
  canGoBackward: boolean;
  canGoForward: boolean;
  pages: number[];
}
const useGamePagination = ({ totalCount, pageSize = 40 }: params): res => {
  const [params] = useSearchParams();
  const search = params.get("search");
  const currentPage = Number(params.get("page")) || 1;
  const totalPages = Math.ceil(totalCount / pageSize);
  const canGoBackward: boolean = currentPage !== 1;
  const canGoForward: boolean = currentPage < totalPages;

  const pageNumbers: number[] = [];

  const maxPages = 10;
  const halfMaxPages = Math.floor(maxPages / 2);
  const startPage = Math.max(1, currentPage - halfMaxPages);
  const endPage = Math.min(totalPages, startPage + maxPages - 1);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const goToPage = (page: string | number) => {
    return `/games?page=${page}${search ? `&search=${search}` : ""}`;
  };

  return {
    currentPage,
    lastPage: totalPages,
    goToPage,
    canGoBackward,
    canGoForward,
    pages: pageNumbers,
  };
};

export default useGamePagination;
