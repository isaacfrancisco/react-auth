import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled(LinearGradient).attrs({
  colors: ['#290000', '#4a0000'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const ContainerButton = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  background: #fff;
  justify-content: space-between;
`;

export const CreateButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #027d00;
  margin-top: 10px;
  margin-left: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 14px;
  width: 143px;
  height: 30px;
`;

export const CancelButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #1d2185;
  margin-top: 10px;
  margin-left: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 0 14px;
  width: 143px;
  height: 30px;
`;

export const ContainerCreateModal = styled.View`
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 15px;
  align-items: center;
  height: 350px;
`;

export const CreateForm = styled.View`
  flex-direction: column;
  margin-top: 10px;
  padding: 0 20px;
  height: 250px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  padding: 0 20px;
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background: #fff;
  border: 2px solid ${props => (props.error ? '#ff7272' : '#fff')};
`;

export const CreateFormInput = styled.TextInput.attrs({
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

export const SubmitSearch = styled.TouchableOpacity`
  background: #1d2185;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const SubmitAdd = styled.TouchableOpacity`
  background: #027d00;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const List = styled.FlatList.attrs({
  constentContainerStyle: { paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  margin-left: 5px;
`;