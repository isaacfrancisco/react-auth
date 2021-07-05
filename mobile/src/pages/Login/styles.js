import styled from 'styled-components/native';

export const LoginForm = styled.View`
  flex-direction: column;
  margin-top: 10px;
  padding: 0 20px;
  height: 300px;
`;

export const LoginInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background: #fff;
  border: 2px solid ${props => (props.error ? '#ff7272' : '#fff')};
  margin: 10px;
`;