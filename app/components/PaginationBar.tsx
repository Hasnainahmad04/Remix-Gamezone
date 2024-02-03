import { Link } from "@remix-run/react";
import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import useGamePagination from "~/hooks/useGamePagination";

interface Props {
  totalCount: number;
}
const PaginationBar: React.FC<Props> = ({ totalCount }) => {
  const {
    currentPage,
    goToPage,
    lastPage,
    canGoBackward,
    canGoForward,
    pages,
  } = useGamePagination({ totalCount });

  return (
    <section className={"flex gap-1 w-full overflow-x-scroll scrollbar-hide"}>
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
          <Link to={goToPage(page)} key={page} preventScrollReset={false}>
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
