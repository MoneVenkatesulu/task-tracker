import Styled from "styled-components";

export const TableData = Styled.td`
  @media (max-width: 575px) {
    font-size: 12px;
  }
`;

export const SelectEl = Styled.select`
  @media (max-width: 575px) {
    width: 40px;
  }
  
`;

export const EditBtn = Styled.button`
  width: 50px;

  @media (max-width: 575px) {
    font-size: 10px;
    width: 37px;
  }
`;
