import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Name,
  Description,
  ContainerButton,
  EditButton,
  DeleteButton,
  ButtonText,
  MoreInfo,
  MoreInfoText
} from './styles';

export default function Project({ data, onRefresh }) {
  console.log(data);
  return (
    <Container>
      <Name>Titulo: {data[0]}</Name>
      <Description>Usuário: {data[2]}</Description>
      <Description>Descrição: {data[3]}</Description>
      <Description>Tarefa: {data[4]}</Description>

      <MoreInfo>
        <MoreInfoText>Status: {data[5]}</MoreInfoText>
        <MoreInfoText>Data de Criacao: {data[6]}</MoreInfoText>
      </MoreInfo>

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
