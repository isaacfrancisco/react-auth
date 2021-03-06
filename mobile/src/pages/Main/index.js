import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  List
} from '../../components/Lists';
import {
  Input,
  FormInput,
} from '../../components/Inputs';
import {
  Title,
  ButtonText
} from '../../components/Texts';
import {
  Form,
  ContainerApp,
  ContainerActionButton,
  ContainerCreateModal,
  CreateForm
} from '../../components/Views';
import {
  SubmitSearch,
  SubmitAdd,
  CreateButton,
  CancelMainButton
} from '../../components/Buttons';
import Projects from '../../components/Projects';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';


export default function Main() {
  const [idProject, setIdProject] = useState('');
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
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSearch() {
    const token = await AsyncStorage.getItem("token");
    const AuthToken = "Bearer ".concat(token);

    try {
      setProjects([]);
      var titulo, id, descricao, dataCriacao, tarefa, status, usuario;
      const data = [];

      const response = await api.get("/projects/" + idProject,
        {
          headers: { Authorization: AuthToken },
        });

      titulo = response.data.project.title;
      id = response.data.project._id;
      descricao = response.data.project.description;
      dataCriacao = response.data.project.createdAt;
      for (let i = 0; i < response.data.project.tasks.length; i++) {
        tarefa = response.data.project.tasks[i].title;
        if (response.data.project.tasks[i].completed === false) {
          status = "Incompleta";
        } else {
          status = "Completada";
        }
      }
      usuario = response.data.project.user.name;

      data.push([
        titulo,
        id,
        usuario,
        descricao,
        tarefa,
        status,
        dataCriacao,
      ]);

      setProjects(data);
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
    <ContainerApp>
      <Title>Projetos</Title>

      <Form>
        <Input
          value={idProject}
          onChangeText={project => setIdProject(project)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar projeto..."
        />
        <SubmitSearch onPress={handleSearch}>
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
            <FormInput
              value={title}
              onChangeText={title => setTitle(title)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Titulo"
            />
            <FormInput
              value={description}
              onChangeText={description => setDescription(description)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Descri????o"
            />
            <FormInput
              value={task}
              onChangeText={task => setTask(task)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Tarefa"
            />
          </CreateForm>
          <ContainerActionButton>
            <CancelMainButton onPress={toggleCreateModal}>
              <ButtonText>CANCELAR</ButtonText>
            </CancelMainButton>
            <CreateButton onPress={handleCreate}>
              <ButtonText>CRIAR PROJETO</ButtonText>
            </CreateButton>
          </ContainerActionButton>
        </ContainerCreateModal>
      </Modal>
    </ContainerApp>
  );
}
