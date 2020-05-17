import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";

//Control
import PaginationControl from "./PaginationControl";

MainContainer.propTypes = {
  data: PropTypes.array,
  togglePopupDetail: PropTypes.func,
  limitPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  dataSlice: PropTypes.array,
  currentPage: PropTypes.number,
};

MainContainer.defaultProps = {
  data: [],
  togglePopupDetail: null,
  limitPerPage: null,
  onPageChange: null,
  dataSlice: [],
  currentPage: null,
};

const Bound = styled.div`
  padding: 0 8px;
  h1 {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid antiquewhite;
    margin: 4px 0;
    text-align: left;
    h4 {
      cursor: pointer;
    }
    &__inform {
      padding-bottom: 5px;
    }
  }
`;

function MainContainer(props) {
  const {
    data,
    togglePopupDetail,
    limitPerPage,
    currentPage,
    dataSlice,
  } = props;
  const [index, setIndex] = useState(-1);

  const showPopup = (data, i) => {
    togglePopupDetail(data);
    setIndex(i);
  };

  let newArr = [...dataSlice];
  let filterLst = newArr
    .sort((a, b) => b.points - a.points)
    .filter(
      (searchItem) =>
        searchItem.title.toLowerCase().indexOf(props.filter) >= 0 ||
        searchItem.author.toLowerCase().indexOf(props.filter) >= 0
    );

  const onPageChange = (page) => {
    props.onPageChange(page);
    setIndex(-1);
  };
  return (
    <Bound>
      {(data.length > limitPerPage || filterLst.length > 0) && (
        <PaginationControl
          currentPage={currentPage}
          totalItem={data.length}
          limitPerPage={limitPerPage}
          onPageChange={(page) => onPageChange(page)}
        />
      )}
      {data.length > 0 ? (
        filterLst.length > 0 ? (
          filterLst.map((item, i) => {
            return (
              <div
                key={i}
                className="main-item"
                style={{ backgroundColor: index === i ? "#f6f6ef" : "unset" }}
              >
                <h4 onClick={() => showPopup(item, i)}>{item.title}</h4>
                <div className="main-item__inform">
                  {item.points} points | {item.author} | {item.time} |{" "}
                  {item.comments.length} comments
                </div>
              </div>
            );
          })
        ) : (
          <h1>There is no load data ^.^</h1>
        )
      ) : (
        <h1>There is no load data ^.^</h1>
      )}
    </Bound>
  );
}

export default React.memo(MainContainer);
