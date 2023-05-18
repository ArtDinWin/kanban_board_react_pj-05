import clsx from "clsx";
import css from "./Button.module.scss";

const Button = ({
  textBtn,
  styleBtn,
  handleBtn,
  enabled,
  isItemVisible,
  idForm,
  type,
}) => {
  let styleButton, buttonActive, buttonDisabled, active;

  if (isItemVisible === undefined) {
    active = 0;
  } else {
    active = Number(isItemVisible);
  }

  if (textBtn[active] === "Submit") {
    styleButton = clsx(css.style, css.style__dark);
  } else {
    styleButton =
      styleBtn === "dark"
        ? clsx(css.style, css.style__dark)
        : styleBtn === "light"
        ? clsx(css.style, css.style__light)
        : "";
  }

  buttonActive = (
    <button
      className={styleButton}
      onClick={handleBtn}
      type={type === undefined ? "button" : "submit"}
      form={idForm === undefined ? "" : idForm}
    >
      {textBtn[active]}
    </button>
  );

  buttonDisabled = (
    <button
      className={styleButton}
      onClick={handleBtn}
      disabled
      type={"button"}
    >
      {textBtn[active]}
    </button>
  );

  return enabled ? buttonActive : buttonDisabled;
};

export default Button;
