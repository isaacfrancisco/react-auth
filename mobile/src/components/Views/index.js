import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const ContainerApp = styled(LinearGradient).attrs({
    colors: ['#290000', '#4a0000'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
})`
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
`;

export const Container = styled.View`
  margin: 20px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 15px;
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

export const MoreInfo = styled.View`
  flex-direction: column;
  margin-top: 15px;
`;

export const ContainerButton = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  background: #fff;
`;

export const ContainerActionButton = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 15px;
  background: #fff;
  justify-content: space-between;
`;

export const UpdateForm = styled.View`
  flex-direction: column;
  margin-top: 10px;
  padding: 0 20px;
  height: 250px;
`;