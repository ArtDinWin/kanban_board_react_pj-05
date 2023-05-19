import Button from "./../button/Button";
import css from "./Forms.module.scss";
import { useState } from "react";

const FormAddNewTask = (props) => {
  const { setIsFormVisible, addNewTask } = props;
  const [valueInput, setValueInput] = useState("");
  const idForm = "new-task";
  const changeValue = (e) => {
    setValueInput(e.target.value);
  };

  const hundleSubmit = (e) => {
    e.preventDefault();
    addNewTask(valueInput.trim());
    setIsFormVisible();
  };

  return (
    <form id={idForm} className={css.wrapper} onSubmit={hundleSubmit}>
      <input
        className={css.newtask__input}
        type="text"
        name="new-task"
        placeholder="New task title..."
        autoFocus
        value={valueInput}
        onChange={changeValue}
      />

      <div className={css.buttons__wrap}>
        <Button
          textBtn={["Submit", "Submit"]}
          styleBtn="dark"
          enabled={valueInput && valueInput.trim() ? true : false}
          type="submit"
          idForm={idForm}
        />
        <Button
          textBtn={["X", "Y"]}
          styleBtn="light"
          handleBtn={(e) => {
            e.preventDefault();
            setIsFormVisible();
          }}
          enabled={true}
        />
      </div>
    </form>
  );
};

export default FormAddNewTask;
