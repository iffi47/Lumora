import styled from "styled-components";
export const BaseButton = styled.button`
  min-height: 46px;
  padding: 12px 23px;
  border: 1px solid #302d29;
  border-radius: 25px;
  background: #302d29;
  color: #fffdf9;
  font:
    500 13px "Open Sans",
    sans-serif;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: #544b40;
  }
  &:focus-visible {
    outline: 3px solid #b79a73;
    outline-offset: 3px;
  }
`;
export const GoogleSignInButton = styled(BaseButton)`
  background: transparent;
  color: #302d29;
  border-color: #c9bdae;
  &:hover {
    background: #e6ddd1;
  }
`;
export const InvertedButton = styled(BaseButton)`
  background: #fffdf9;
  color: #302d29;
  &:hover {
    background: #e6ddd1;
  }
`;
