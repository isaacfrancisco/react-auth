import React, { useState } from 'react';
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
  MoreInfoText,
  CancelButton,
  ContainerDeleteModal
} from './styles';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export default function Project({ data, handleRefresh }) {
  console.log(data);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  async function handleDelete() {
    const token = await AsyncStorage.getItem("token");
    const AuthToken = "Bearer ".concat(token);

    try {
      await api.delete("/projects/" + data[1],
        {
          headers: { Authorization: AuthToken },
        });
      toggleDeleteModal();
      handleRefresh();
    } catch (err) {
      console.log(err);
    }

  }

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
        <EditButton>
          <Icon name="edit" color="#fff" size={16} />
          <ButtonText>EDITAR</ButtonText>
        </EditButton>
        <DeleteButton onPress={toggleDeleteModal}>
          <Icon name="trash-o" color="#fff" size={16} />
          <ButtonText>DELETAR</ButtonText>
        </DeleteButton>
      </ContainerButton>
      <Modal isVisible={openDeleteModal}>
        <ContainerDeleteModal>
          <MoreInfoText>Realmente deseja remover esse o projeto?</MoreInfoText>
          <DeleteButton onPress={handleDelete}>
            <ButtonText>DELETAR</ButtonText>
          </DeleteButton>
          <CancelButton onPress={toggleDeleteModal}>
            <ButtonText>CANCELAR</ButtonText>
          </CancelButton>
        </ContainerDeleteModal>
      </Modal>
    </Container>
  );
}
