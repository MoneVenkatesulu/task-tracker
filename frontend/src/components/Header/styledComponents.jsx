import Styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = Styled.div`
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 2px #888888;
`;

export const AppTitle = Styled.h1`
  font-size: 25px;
  color: #ff6200;
  text-shadow: 1px 2px #202020;

  @media (max-width: 575px) {
    font-size: 20px;
    text-shadow: 1px 1px #202020;
  }
`;

export const TaskTabContainer = Styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 575px) {
    font-size: 14px;
    gap: 10px;
  }
  @media (min-width: 768px) {
    gap: 20px;
  }
`;

export const TaskTab = Styled(Link)`
  text-decoration: none;
  color: #ff6200;
`;
