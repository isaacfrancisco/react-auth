import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title, Form, Input, SubmitSearch, SubmitAdd, List } from './styles';
import Projects from '../../components/Projects';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Main() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);

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
        <SubmitAdd onPress={handleShowProjects}>
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
    </Container>
  );
}
