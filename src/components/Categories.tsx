import React from "react";
import tick from "../assets/tick-square.png";
import tick2 from "../assets/tick-square2.png";
import eyeIcon from "../assets/eye.svg";
import lighttickIcon from "../assets/light-tick.svg";
import eyeLight from "../assets/eye-light.svg";

export type Category = {
  name: string;
  alwaysActive?: boolean;
};

export type CategoryCheckedState = {
  name: string;
  checked: boolean;
};

type Props = {
  categories: Category[];
  checkedCategories: CategoryCheckedState[];
  onCheck: (name: string) => void;
};

interface CategoryCheckboxProps {
  checked: boolean;
  label: string;
  alwaysActive?: boolean;
  onChange: () => void;
}

const CategoryCheckbox: React.FC<CategoryCheckboxProps> = ({
  checked,
  label,
  alwaysActive,
  onChange
}) => (
  <div className={`custom-category-row${alwaysActive ? " always-active" : ""}`}>
    <label className={`custom-category-label`}>
      {alwaysActive && (
        <img src={lighttickIcon} alt="Checked" className="category-checkbox-icon" />
      )}

      {!alwaysActive ? (
        checked ? (
          <img src={tick} alt="Checked" className="category-checkbox-icon" />
        ) : (
          <img src={tick2} alt="Unchecked" className="category-checkbox-icon" />
        )
      ) : null}

      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="category-checkbox-input"
        style={{ display: "none" }}
        disabled={alwaysActive}
      />
      <span className="custom-category-text">{label}</span>
    </label>
    {alwaysActive ? (
      <>
        <span className="custom-category-always">Always active</span>
      </>
    ) : (
      <button className="custom-category-eye" onClick={onChange}>
        {checked ? (
          <img src={eyeIcon} alt="View" className="category-eye-icon" />
        ) : (
          <img src={eyeLight} alt="View" className="category-eye-icon" />
        )}
      </button>
    )}
  </div>
);

const Categories: React.FC<Props> = ({
  categories,
  checkedCategories,
  onCheck
}) => (
  <div className="custom-categories">
    <div className="custom-category-title">Categories</div>
    {categories.map((cat) => {
      const checkedObj = checkedCategories.find((c) => c.name === cat.name);
      return (
        <CategoryCheckbox
          key={cat.name}
          checked={!!checkedObj?.checked}
          label={cat.name}
          alwaysActive={cat.alwaysActive}
          onChange={() => onCheck(cat.name)}
        />
      );
    })}
  </div>
);

export default Categories;
