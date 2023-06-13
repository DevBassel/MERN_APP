import { IoArrowBackSharp, IoArrowForwardOutline } from "react-icons/io5";

export default function Pagenation({ next, prev }) {
  return (
    <ul className="pagenation">
      <li data-name="Prev" onClick={prev}>
        <IoArrowBackSharp />
      </li>
      <li data-name="Next" onClick={next}>
        <IoArrowForwardOutline />
      </li>
    </ul>
  );
}
