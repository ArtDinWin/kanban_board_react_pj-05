import Logo from "./../../assets/logo.svg";
import Arrow from "./../../assets/arrow.svg";
import css from "./Header.module.scss";
import "./Header.animation.scss";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const Header = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const arrowRef = useRef(null);
  const navigate = useNavigate();

  const handleProfile = (e) => {
    if (e.target.dataset.noneClick) {
      return;
    } else if (e.target.closest("a")) {
      e.preventDefault();
      console.log("Go to :", e.target.getAttribute("href"));
      setOpenMenu(false);
    } else {
      setOpenMenu(!openMenu);
    }
    return;
  };

  return (
    <header className={css.wrapper}>
      <img
        className={css.logo}
        src={Logo}
        alt="Logo"
        title="Logo: Kanban"
        onClick={() => {
          navigate("/");
        }}
      />
      <h1 className={css.title}>Awesome Kanban Board</h1>

      <div className={css.profile__wrap} onClick={handleProfile}>
        <div className={css.profile}>
          <CSSTransition in={openMenu} timeout={0} classNames="my-node">
            <div className={css.profile__menu} data-none-click="1">
              <a className={css.profile__link} href="/profile">
                Profile
              </a>
              <a
                className={css.profile__link}
                href="/clear_tasks"
                onClick={(e) => {
                  e.preventDefault();
                  props.setTasks([]);

                  setOpenMenu(false);
                }}
              >
                Clear tasks
              </a>
              <a
                className={css.profile__link}
                href="/clear_localStorage"
                onClick={(e) => {
                  e.preventDefault();
                  window.localStorage.removeItem("kanban-tasks");
                }}
              >
                Clear localStorage
              </a>
              <a
                className={css.profile__link}
                href="/save"
                onClick={(e) => {
                  e.preventDefault();
                  let blob = new Blob([JSON.stringify(props.tasks)], {
                    type: "application/json",
                  });
                  let link = document.createElement("a");
                  link.setAttribute("href", URL.createObjectURL(blob));
                  link.setAttribute("download", "mock");
                  link.click();
                }}
              >
                Save mock data
              </a>

              <a className={css.profile__link} href="/log-out">
                Log Out
              </a>
            </div>
          </CSSTransition>
        </div>
        <div className={css.profile__arrow}>
          <img
            src={Arrow}
            alt="icon: arrow"
            width="12"
            ref={arrowRef}
            style={
              openMenu
                ? { transform: "rotate(180deg)" }
                : { transform: "rotate(0deg)" }
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
