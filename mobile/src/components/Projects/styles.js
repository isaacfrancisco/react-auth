import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 15px;
`;

export const ContainerDeleteModal = styled.View`
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 15px;
  align-items: center;
`;

export const ContainerUpdateModal = styled.View`
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 15px;
  align-items: center;
  height: 350px;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #666;
  margin-top: 15px;
  line-height: 20px;
`;

export const MoreInfo = styled.View`
  flex-direction: column;
  margin-top: 15px;
`;

export const MoreInfoText = styled.Text`
  margin-left: 6px;
  margin-top: 6px;
`;
export const ContainerButton = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  background: #fff;
`;

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

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-left: 5px;
`;

export const UpdateForm = styled.View`
  flex-direction: column;
  margin-top: 10px;
  padding: 0 20px;
  height: 250px;
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