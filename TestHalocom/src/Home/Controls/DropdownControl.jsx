import React, { useState, useEffect } from "react";
import styled from "styled-components";
//Images
import ic_arrow_down from "../../images/ic_arrow_down.svg";

const Bound = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  p {
    font-size: 0.875rem;
    margin-right: 0.25rem;
  }
  .active-choice {
    width: 105px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.5px solid #c9cdd6;
    font-size: 0.875rem;
    line-height: 160%;
    letter-spacing: 0.1px;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      right: 7px;
      top: 9px;
    }
  }
  .item-dropdown {
    position: absolute;
    margin-top: 5px;
    font-size: 0.875rem;
    width: 97px;
    padding: 4px;
    letter-spacing: 0.1px;
    color: #222222;
    border: 0.5px solid #e2e2e2;
    cursor: pointer;
    &:hover {
      background: #ff742b !important;
      color: rgb(255, 255, 255) !important;
      transition: all 0.5s ease-in;
    }
    p {
    }
  }
`;

let isMousClick = false;
function DropdownControl(props) {
  const [active, setActive] = useState(props.dropDownType);

  const checkShow = () => props.isShow === props.id;

  const onClickActive = (item) => {
    setActive(item);
  };

  const onClickDropdown = () => {
    if (checkShow()) {
      props.setShow("");
    } else {
      props.setShow(props.id);
    }
  };

  const _handleClick = () => {
    if (!isMousClick) {
      props.setShow("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", _handleClick);

    return () => {
      document.removeEventListener("click", _handleClick);
    };
  }, []);

  return (
    <Bound
      onMouseEnter={() => (isMousClick = true)}
      onMouseLeave={() => (isMousClick = false)}
    >
      <p>{props.title}</p>
      <div className="dropdown-cover" onClick={() => onClickDropdown()}>
        <div className="active-choice" onBlur={() => props.setShow("")}>
          {active}
          <img
            src={ic_arrow_down}
            alt="ic_arrow_down"
            style={{
              transform:
                props.id === props.isShow ? "rotate(-180deg)" : "unset",
              transition: "all 300ms ease",
            }}
          />
        </div>
        {props.id === props.isShow &&
          Object.keys(props.dropDownSearch).map((item, i) => {
            return (
              <div
                className="item-dropdown"
                key={i}
                onClick={() => onClickActive(props.dropDownSearch[item].value)}
              >
                <p>{props.dropDownSearch[item].value}</p>
              </div>
            );
          })}
      </div>
    </Bound>
  );
}

export default React.memo(DropdownControl);
