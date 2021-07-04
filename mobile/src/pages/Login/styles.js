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

export const ActionButton = styled.TouchableOpacity`
  margin-top: 30px;
  flex-direction: row;
  background: #1d2185;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 14px;
  width: 350px;
  height: 40px;
`;