import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import React from "react";
import { Link } from "@remix-run/react";
import useGamePagination from "~/hooks/useGamePagination";

interface Props {
  totalCount: number;
  pageSize?: number;
}
const PaginationBar: React.FC<Props> = ({ totalCount, pageSize = 20 }) => {
  const {
    currentPage,
    goToPage,
    lastPage,
    canGoBackward,
    canGoForward,
    pages,
  } = useGamePagination({ totalCount });

  return (
    <section className={"flex gap-1"}>
      <Link to={goToPage(1)}>
        <button className={"pagination_btn"} disabled={!canGoBackward}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </button>
      </Link>
      <Link to={goToPage(currentPage - 1)}>
        <button className={"pagination_btn"} disabled={!canGoBackward}>
          <IoIosArrowRoundBack />
        </button>
      </Link>

      {pages.map((page) => {
        const isActive = currentPage === page;
        return (
          <Link to={goToPage(page)} key={page}>
            <button
              className={`px-3 py-1.5 rounded-md text-white ${
                isActive ? "bg-card-dark" : null
              } `}
            >
              {page}
            </button>
          </Link>
        );
      })}

      <Link to={goToPage(currentPage + 1)}>
        <button className={"pagination_btn"} disabled={!canGoForward}>
          <IoIosArrowRoundForward />
        </button>
      </Link>
      <Link to={goToPage(lastPage)}>
        <button className={"pagination_btn"} disabled={!canGoForward}>
          <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </Link>
    </section>
  );
};

export default PaginationBar;
