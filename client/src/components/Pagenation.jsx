import { IoArrowBackSharp, IoArrowForwardOutline } from "react-icons/io5";

export default function Pagenation({ next, prev, page, total, per }) {
  // console.log(page, total, per);
  return (
    <ul className="pagenation">
      {page > 1 && (
        <li data-name="Prev" onClick={prev}>
          <IoArrowBackSharp />
        </li>
      )}
      {page < total / per && (
        <li data-name="Next" onClick={next}>
          <IoArrowForwardOutline />
        </li>
      )}
    </ul>
  );
}
