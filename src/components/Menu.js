import React from "react";
import styled from "styled-components/macro";

const Ul = styled.ul`
  font-size: 0.85em;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  li {
    padding-left: 1em;
    &:first-child {
      padding-left: 0;
    }
    a {
      color: ${({ theme }) => theme.colors.white};
      text-decoration: none;
    }
  }
`;

const Menu = () => {
  return (
    <Ul>
      <li>
        <a href="https://github.com/MauricioRobayo/tasa-representativa-del-mercado">
          Código
        </a>
      </li>
    </Ul>
  );
};

export default Menu;
