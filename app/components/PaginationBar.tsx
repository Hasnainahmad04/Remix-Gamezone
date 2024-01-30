import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const PaginationBar = () => {
  return (
    <section className={"flex gap-1"}>
      <button className={"pagination_btn"}>
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <button className={"pagination_btn"}>
        <IoIosArrowRoundBack />
      </button>
      <button className={"px-3 py-1.5 rounded-md bg-neutral-100"}>1</button>
      <button className={"pagination_btn"}>
        <IoIosArrowRoundForward />
      </button>
      <button className={"pagination_btn"}>
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </section>
  );
};

export default PaginationBar;
