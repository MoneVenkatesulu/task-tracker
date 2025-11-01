import Styled, { styled } from "styled-components";

export const TaskFormContainer = Styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TaskFormContent = Styled.div`
  background-color: #fff;
  box-shadow: 1px 1px 4px 4px #7f7f7f;
  border-radius: 10px;
  height: 70%;
  width: 300px;
  padding: 10px;
  display: inline-flex;
  flex-direction: column;

  @media (min-width: 576px) {
    width: 400px;
  }
`;

export const AddTaskHeading = Styled.h2`
  align-self: center;
  color: #ff6200;
  padding-bottom: 10px;

  @media (max-width: 575px) {
    font-size: 18px;
  }
`;

export const TaskFormEl = Styled.form`
  display: flex;
  flex-direction: column;
`;

export const TextLabel = Styled.label`
  align-self: flex-start;
`;

export const TitleInput = Styled.input`
  outline: none;
  margin-bottom: 10px;
`;

export const DescriptionInput = Styled.textarea`
  outline: none;
  margin-bottom: 10px;
`;

export const SubContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const SelectEl = Styled.select`
  width: 40%;
  height: 25px;
  outline: none;
`;

export const DateInputbar = Styled.input`
  width: 40%;
  height: 25px;
  outline: none;
`;

export const AddTaskBtn = Styled.input`
  color: #ffffff;
  background-color: #ff5900;
  border-radius: 2px;
  border: none;
  padding: 5px 10px;
  margin-top: 10px;
`;

export const SuccessMsg = Styled.p`
  color: #008521ff;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;
