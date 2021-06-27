import React from "react";
import styled from "styled-components";
import img from "../../assets/img/logo2.png";

const Navbar = () => {
  return (
    <Nav>
      <a href="/home">
        <Logo src={img} />
      </a>
    </Nav>
  );
};

const Nav = styled.div`
  background: #2b2b2b;
`;

const Logo = styled.img`
  margin: 5px;
  padding-left: 10px;
  width: 50px;
  height: 50px;
`;

export default Navbar;
