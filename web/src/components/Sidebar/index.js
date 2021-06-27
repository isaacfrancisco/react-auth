import React from "react";
import styled from "styled-components";
import { GoProject } from "react-icons/go";
import { GoSettings } from "react-icons/go";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Nav>
      <SideList>
        <ListItem>
          <GoProject />
          <StyledLink to="/">Projetos</StyledLink>
        </ListItem>
        <ListItem>
          <GoSettings />
          <StyledLink to="/">Configurações</StyledLink>
        </ListItem>
        <ListItem>
          <GoSignOut />
          <StyledLink to="/">Sair</StyledLink>
        </ListItem>
      </SideList>
    </Nav>
  );
};

const Nav = styled.div`
  background: #2b2b2b;
  width: 30vh;
  height: 100vh;
  padding-top: 20px;
`;

const SideList = styled.ul`
  list-style: none;
`;

const ListItem = styled.li`
  display: block;
  height: 100%;
  width: 100%;
  line-height: 65px;
  font-size: 20px;
  color: white;
  padding-left: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding-left: 10px;
`;

export default Sidebar;
