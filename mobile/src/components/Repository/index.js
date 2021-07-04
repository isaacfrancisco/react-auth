import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Name,
  Description,
  Stats,
  Stat,
  StatCount,
  ContainerButton,
  EditButton,
  DeleteButton,
  ButtonText
} from './styles';

export default function Repository({ data, onRefresh }) {
  return (
    <Container>
      <Name>{data.name}</Name>
      <Description>{data.description}</Description>

      <Stats>
        <Stat>
          <Icon name="star" size={16} colors="#333" />
          <StatCount>{data.stars}</StatCount>
        </Stat>
        <Stat>
          <Icon name="code-fork" size={16} colors="#333" />
          <StatCount>{data.forks}</StatCount>
        </Stat>
      </Stats>

      <ContainerButton>
        <EditButton onPress={onRefresh}>
          <Icon name="edit" color="#fff" size={16} />
          <ButtonText>EDITAR</ButtonText>
        </EditButton>
        <DeleteButton onPress={onRefresh}>
          <Icon name="trash-o" color="#fff" size={16} />
          <ButtonText>DELETAR</ButtonText>
        </DeleteButton>
      </ContainerButton>

    </Container>
  );
}
