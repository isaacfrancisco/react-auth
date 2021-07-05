import styled from 'styled-components/native';

export const EditButton = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  background: #ad9900;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 14px;
  width: 150px;
  height: 30px;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  background: #a10000;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 14px;
  width: 150px;
  height: 30px;
`;

export const CancelButton = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  background: #1d2185;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 14px;
  width: 145px;
  height: 30px;
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