import Styled from "styled-components";

export const TaskListHeading = Styled.h2`
  color: #ff6200;
  padding-bottom: 10px;

  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

export const InsightText = Styled.p`
  font-weight: bold;
  font-family: Roboto;
  @media (max-width: 400px) {
    font-size: 13px;
  }
`;
