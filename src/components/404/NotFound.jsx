import { Link } from "react-router-dom";
import css from "./NotFound.module.scss";

const NotFound = ({ text }) => {
  return (
    <div className={css.style__window}>
      <h2>404 Sorry</h2>
      <div className={css.style__wrap}>
        <p>{text ? text : "That page cannot be found"} </p>
        <Link to="/">Go to HomePage</Link>
      </div>
    </div>
  );
};

export default NotFound;
