import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  UpdateFormInput
} from '../Inputs';
import {
  Name,
  Description,
  MoreInfoText,
  ButtonText
} from '../Texts';
import {
  Container,
  ContainerUpdateModal,
  ContainerDeleteModal,
  ContainerButton,
  MoreInfo,
  UpdateForm
} from '../Views';
import {
  EditButton,
  DeleteButton,
  CancelButton
} from '../Buttons';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';

export default function Project({ data, handleRefresh }) {
  console.log(data);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const showUpdateModal = () => {
    setTitle(data[0]);
    setDescription(data[3]);
    setTask(data[4]);
    setStatus(data[5]);
    setOpenUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const toggleDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  async function handleUpdate() {
    const token = await AsyncStorage.getItem("token");
    const AuthToken = "Bearer ".concat(token);
    const id = await AsyncStorage.getItem("id");
    var statusProject;

    if (status === 'Incompleta') {
      statusProject = false;
    } else {
      statusProject = true;
    }

    const tasks = [{
      title: task,
      assignedTo: id,
      completed: statusProject
    }]

    try {
      await api.put("/projects/" + data[1], {
        title,
        description,
        tasks,
      }, {
        headers: { Authorization: AuthToken },
      });
      closeUpdateModal();
      handleRefresh();
    } catch (err) {
      console.log(err);
    }

  }

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
        <MoreInfoText>Id: {data[1]}</MoreInfoText>
        <MoreInfoText>Data de Criacao: {data[6]}</MoreInfoText>
      </MoreInfo>
      <ContainerButton>
        <EditButton onPress={showUpdateModal}>
          <Icon name="edit" color="#fff" size={16} />
          <ButtonText>EDITAR</ButtonText>
        </EditButton>
        <DeleteButton onPress={toggleDeleteModal}>
          <Icon name="trash-o" color="#fff" size={16} />
          <ButtonText>DELETAR</ButtonText>
        </DeleteButton>
      </ContainerButton>
      <Modal isVisible={openUpdateModal}>
        <ContainerUpdateModal>
          <UpdateForm>
            <UpdateFormInput
              value={title}
              onChangeText={title => setTitle(title)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Titulo"
            />
            <UpdateFormInput
              value={description}
              onChangeText={description => setDescription(description)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Descrição"
            />
            <UpdateFormInput
              value={task}
              onChangeText={task => setTask(task)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Tarefa"
            />
            <UpdateFormInput
              value={status}
              onChangeText={status => setStatus(status)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Status"
            />
          </UpdateForm>
          <ContainerButton>
            <CancelButton onPress={closeUpdateModal}>
              <ButtonText>CANCELAR</ButtonText>
            </CancelButton>
            <EditButton onPress={handleUpdate}>
              <ButtonText>EDITAR</ButtonText>
            </EditButton>
          </ContainerButton>
        </ContainerUpdateModal>
      </Modal>
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
