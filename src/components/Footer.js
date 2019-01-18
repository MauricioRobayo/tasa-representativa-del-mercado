import React from "react";
import styled from "styled-components";
import Menu from "./Menu";

const FooterWrapper = styled.footer`
  margin: 1em auto;
  padding: 1em 0;
  border-top: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grey};
  a {
    color: ${({ theme }) => theme.colors.grey};
  }
  ul {
    justify-content: center;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Menu />
      <p>
        <a href="https://www.trmapi.com">trmapi</a> es un proyecto de código
        abierto.
      </p>
      <p>
        <a href="https://github.com/trmapi/">Ayúdenos a mejorarlo.</a>
      </p>
    </FooterWrapper>
  );
};

export default Footer;
