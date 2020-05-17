import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
//Data
import {
  dropDownPopularity,
  dropDownSearch,
  dropDownTime,
  dropDownTypePopularity,
  dropDownTypeSearch,
  dropDownTypeTime,
  MOBILE,
} from "../../data/data";
import ic_more_white from "../../images/ic_more_white.png";
import ic_search from "../../images/ic_search.jpg";
// Images
import logo_hn from "../../images/logo-hn.png";
import logo_vietinbank from "../../images/logo_vietinbank.svg";
//Control
import DropdownControl from "./DropdownControl";

Header.propTypes = {
  data: PropTypes.array,
  device: PropTypes.string,
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  data: [],
  onSearch: null,
  device: null,
};

const Bound = styled.header`
  min-height: 102px;
  .header-search {
    &__top {
      padding: 4.34px;
      background-color: #ff742b;
      display: flex;
      align-items: center;
      &--cover {
        width: 100%;
        display: flex;
        .content {
          &-left {
            display: flex;
            width: 100%;
            flex: 1;
            margin-right: 7px;
            min-width: 50px;
            img {
              width: 48px;
              object-fit: cover;
            }
          }
          &-center {
            /* flex: 3; */
            width: 100%;
            position: relative;
            overflow: hidden;
            img {
              position: absolute;
              top: 15px;
              left: 12px;
              width: 24px;
              height: 24px;
            }
            input {
              min-width: 100%;
              border: none;
              outline: none;
              padding: 1.1875rem 0 1.1875rem 2.4375rem;
              background-color: #fff;
              color: rgba(0, 0, 0, 0.75);
              font-size: 0.875rem;
              @media screen and (max-width: 576px) {
                color: blue;
                font-size: 0.75rem;
              }
            }
          }
          &-right {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex: 1;
            min-width: 250px;
            background-color: #ff742b;
            @media screen and (max-width: 576px) {
              min-width: unset;
              flex: unset;
            }
          }
        }
      }
    }
    &__bottom {
      height: 42px;
      margin-left: 8px;
      background-color: #f6f6ef;
      display: flex;
    }
  }
`;

function Header(props) {
  const [searchItem, setSearchItem] = useState("");
  const [isShow, setShow] = useState("");

  const setIsShow = (id) => {
    setShow(id);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSearchItem(value);
    props.onSearch(value);
  };
  return (
    <Bound>
      <div className="header-search__top">
        <div className="header-search__top--cover">
          <div className="content-left">
            <img src={logo_hn} alt="logo" />
          </div>
          <div className="content-center">
            <img src={ic_search} alt="ic_search" />
            <input
              type="text"
              value={searchItem}
              onChange={handleChange}
              placeholder="Search stories by title or author"
            />
          </div>
          <div className="content-right">
            {props.device !== MOBILE && (
              <>
                <p>by</p>
                <img src={logo_vietinbank} alt="logo_vtb" />
              </>
            )}
            <img src={ic_more_white} alt="ic_more_white" />
          </div>
        </div>
      </div>
      <div className="header-search__bottom">
        <DropdownControl
          dropDownType={dropDownTypeSearch.Stories}
          dropDownSearch={dropDownSearch}
          title="Search"
          id="search"
          isShow={isShow}
          setShow={setIsShow}
        />
        <DropdownControl
          dropDownType={dropDownTypePopularity.Popularity}
          dropDownSearch={dropDownPopularity}
          title="by"
          id="by"
          isShow={isShow}
          setShow={setIsShow}
        />
        <DropdownControl
          dropDownType={dropDownTypeTime.All_time}
          dropDownSearch={dropDownTime}
          title="for"
          id="for"
          isShow={isShow}
          setShow={setIsShow}
        />
      </div>
    </Bound>
  );
}

export default Header;
