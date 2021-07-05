import styled from 'styled-components/native';

export const LoginInput = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background: #fff;
  margin: 10px;
`;

export const UpdateFormInput = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    flex: 1;
    padding: 12px 15px;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    background: #fff;
    border: 2px solid #333;
    margin: 10px;
    width: 300px;
  `;