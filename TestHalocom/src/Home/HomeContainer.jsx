import React, { useEffect, useState } from "react";
import styled from "styled-components";
//Data
import { data, DESKTOP, MOBILE, TABLET } from "../data/data";
//Control
import Header from "./Controls/Header";
import MainContainer from "./Controls/MainContainer";
import PopupDetail from "./Controls/PopupDetail";

HomeContainer.propTypes = {};
HomeContainer.defautProps = {};

const Bound = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const limitPerPage = 5;

function HomeContainer() {
  const [isShowPopupDetail, setIsShowPopupDetail] = useState(false);
  const [dataTtem, setData] = useState();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [device, setDevice] = useState(DESKTOP);

  const onPageChange = (page) => {
    let currentPage = page;
    let endIndex = currentPage * limitPerPage;
    let startIndex = endIndex - limitPerPage;
    setCurrentPage(currentPage);
    setStartIndex(startIndex);
    setEndIndex(endIndex);
  };

  console.log("startIdex", startIndex);
  console.log("endIdex", endIndex);
  console.log("curee", currentPage);

  let dataSlice = data.slice(startIndex, endIndex);

  const togglePopupDetail = (data) => {
    setData(data);
    setIsShowPopupDetail(!isShowPopupDetail);
  };

  useEffect(() => {
    if (isShowPopupDetail) {
      let popupDetail = document.getElementById("popup_detail_id");
      if (popupDetail) {
        popupDetail.style.right = "0";
      }
    }
  }, [isShowPopupDetail]);

  const onSearch = (formvalue) => {
    setFilter(formvalue);
  };

  const getResolution = () => {
    let width = window.innerWidth;

    if (width >= 992) {
      setDevice(DESKTOP);
    } else if (width > 576 && width < 992) {
      setDevice(TABLET);
    } else if (width <= 576) {
      setDevice(MOBILE);
    }
  };

  useEffect(() => {
    getResolution();
    window.addEventListener("resize", getResolution());
    return () => {
      window.removeEventListener("resize", getResolution());
    };
  }, [device]);

  return (
    <Bound>
      <Header onSearch={onSearch} device={device} />
      <MainContainer
        data={data}
        filter={filter}
        togglePopupDetail={togglePopupDetail}
        limitPerPage={limitPerPage}
        onPageChange={onPageChange}
        dataSlice={dataSlice}
        currentPage={currentPage}
      />
      {isShowPopupDetail && !!dataTtem && (
        <PopupDetail togglePopupDetail={togglePopupDetail} data={dataTtem} />
      )}
    </Bound>
  );
}

export default React.memo(HomeContainer);
