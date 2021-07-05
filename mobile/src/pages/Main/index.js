import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Title,
  Form,
  Input,
  SubmitSearch,
  SubmitAdd,
  List,
  ContainerCreateModal,
  CreateFormInput,
  CreateForm,
  ContainerButton,
  CancelButton,
  CreateButton,
  ButtonText
} from './styles';
import Projects from '../../components/Projects';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';


export default function Main() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');

  const [openCreateModal, setOpenCreateModal] = useState(false);

  const toggleCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  useEffect(() => {
    handleShowProjects();
  }, []);

  async function handleShowProjects() {
    const token = await AsyncStorage.getItem("token");
    const AuthToken = "Bearer ".concat(token);
    setProjects([]);
    var titulo, id, descricao, dataCriacao, tarefa, status, usuario;
    const data = [];
    try {
      const response = await api.get("/projects", {
        headers: { Authorization: AuthToken },
      });

      for (let i = 0; i < response.data.projects.length; i++) {
        titulo = response.data.projects[i].title;
        id = response.data.projects[i]._id;
        descricao = response.data.projects[i].description;
        dataCriacao = response.data.projects[i].createdAt;
        for (let j = 0; j < response.data.projects[i].tasks.length; j++) {
          tarefa = response.data.projects[i].tasks[j].title;
          if (response.data.projects[i].tasks[j].completed === false) {
            status = "Incompleta";
          } else {
            status = "Completada";
          }
        }
        usuario = response.data.projects[i].user.name;

        data.push([
          titulo,
          id,
          usuario,
          descricao,
          tarefa,
          status,
          dataCriacao
        ]);
      }

      setProjects(data);
      console.log("DENTRO DA FUNÇAO:", projects);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreate() {
    const token = await AsyncStorage.getItem("token");
    const AuthToken = "Bearer ".concat(token);
    const id = await AsyncStorage.getItem("id");
    const tasks = [{
      title: task,
      assignedTo: id
    }]

    console.log(AuthToken, id, title, description, task);

    try {
      await api.post("/projects", {
        title,
        description,
        tasks,
      }, {
        headers: { Authorization: AuthToken },
      });
      toggleCreateModal();
      handleShowProjects();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Title>Projetos</Title>

      <Form>
        <Input
          value={input}
          error={error}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar projeto..."
        />
        <SubmitSearch>
          <Icon name="search" size={22} color="#FFF" />
        </SubmitSearch>
        <SubmitAdd onPress={toggleCreateModal}>
          <Icon name="add" size={22} color="#FFF" />
        </SubmitAdd>
      </Form>

      <List
        keyboardShouldPersistTaps="handled"
        data={projects}
        keyExtractor={item => String(item[1])}
        renderItem={({ item }) => (
          <Projects
            data={item}
            handleRefresh={() => handleShowProjects()}
          />
        )}
      />
      <Modal isVisible={openCreateModal}>
        <ContainerCreateModal>
          <CreateForm>
            <CreateFormInput
              value={title}
              onChangeText={title => setTitle(title)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Titulo"
            />
            <CreateFormInput
              value={description}
              onChangeText={description => setDescription(description)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Descrição"
            />
            <CreateFormInput
              value={task}
              onChangeText={task => setTask(task)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Tarefa"
            />
          </CreateForm>
          <ContainerButton>
            <CancelButton onPress={toggleCreateModal}>
              <ButtonText>CANCELAR</ButtonText>
            </CancelButton>
            <CreateButton onPress={handleCreate}>
              <ButtonText>CRIAR PROJETO</ButtonText>
            </CreateButton>
          </ContainerButton>
        </ContainerCreateModal>
      </Modal>
    </Container>
  );
}
