import styled from "styled-components";

//redux
import { useSelector, useDispatch } from "react-redux"; 
import React, { useEffect, useState } from "react";

import {
  action,changePage,

} from "../../../store/ClosetSlice";


function Pagination({ totalPage, page, setPage }) {
  const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));


  //redux 관리
  let state = useSelector((state:any)=>state.closet);
  let dispatch = useDispatch();



  const numPages = totalPage;

  return (
    <>
      <Nav>
        <Button onClick={() => { dispatch(changePage(page - 1));}} disabled={page === 0}>
          &lt;
        </Button>
        {numPages > 0 && Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => {dispatch(changePage(i)); }}
              aria-current={page === i ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => {dispatch(changePage(page + 1));console.log(page)}} disabled={page === numPages-1}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  width : 40px;
  height : 40px;
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #EAA595;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;