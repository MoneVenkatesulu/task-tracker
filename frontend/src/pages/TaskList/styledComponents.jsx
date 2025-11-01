import Styled from "styled-components";

export const TaskListHeading = Styled.h2`
  color: #ff6200;
  padding-bottom: 10px;

  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

export const FilterContainer = Styled.div`
  padding-bottom: 10px;
  display: flex;

`;

export const FilterTitle = Styled.p`
  font-weight: 500;
`;

export const RadioInputEl = Styled.input`
  margin-left: 15px;
  margin-right: 3px;
`;

export const FiltersBtn = Styled.button`
  background-color: transparent;
  color: #ff6200;
  border: 1px solid #ff6200;
  padding: 3px 10px;
  border-radius: 2px;
  margin-bottom: 15px;
  margin-right: 15px;
`;

export const TableData = Styled.td`
  font-weight: bold;

  @media (max-width: 575px) {
    font-weight: 500;
    font-size: 12px;
  }
`;
