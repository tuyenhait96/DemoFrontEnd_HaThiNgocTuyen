import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

PaginationControl.propTypes = {
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
  totalItem: PropTypes.number,
  limitPerPage: PropTypes.number,
};
PaginationControl.defaultProps = {
  onPageChange: null,
  currentPage: null,
  totalItem: null,
  limitPerPage: null,
};
const Bound = styled.div`
  display: flex;
  justify-content: flex-end;
  .border-icon {
    width: 24px;
    height: 24px;
    background-color: bisque;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    .left {
      width: 8px;
      height: 14px;
      background-color: #ff742b;
      clip-path: polygon(100% 0, 0 50%, 100% 100%);
    }
    .right {
      width: 8px;
      height: 14px;
      background-color: #ff742b;
      clip-path: polygon(100% 50%, 0 0, 0 100%);
    }
  }
  .center {
    color: #222222;
    font-size: 0.8125rem;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #c8c8c8;
      margin-left: 0.25rem;
    }
  }
`;

function PaginationControl(props) {
  const { currentPage, totalItem, limitPerPage } = props;
  const [totalPage, setTotalPage] = useState(0);

  const paginatioPage = () => {
    let totalPage = Math.ceil(totalItem / limitPerPage);
    setTotalPage(totalPage);
  };

  useEffect(() => {
    paginatioPage();
  }, []);

  const n = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  console.log("currentPage", currentPage);
  console.log("limitPerpage", limitPerPage);
  console.log("totalItem", totalItem);
  console.log("totalPage", totalPage);
  return (
    <Bound>
      <div
        className="border-icon"
        onClick={() => {
          let page = currentPage - 1;
          if (page <= 0) page = 1;
          console.log("pre", page, totalPage);
          props.onPageChange(page, totalPage);
        }}
      >
        <div className="left"></div>
      </div>
      <div className="center">
        {n(currentPage)}/<span>{n(totalPage)}</span>
      </div>
      <div
        className="border-icon"
        onClick={() => {
          let page = currentPage + 1;
          if (page > totalPage) page = totalPage;
          console.log("next", page, totalPage);
          props.onPageChange(page, totalPage);
        }}
      >
        <div className="right"></div>
      </div>
    </Bound>
  );
}

export default React.memo(PaginationControl);
