import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Container, Main, TableView } from "./styles";
import api from "../../services/api";
import MUIDataTable from "mui-datatables";

export default function Home() {
  const token = localStorage.getItem("token");
  const AuthToken = "Bearer ".concat(token);
  const [projects, setProjects] = useState([]);

  const columns = ["Titulo", "Id", "Descrição", "Data de Criação"];

  const options = {
    filterType: "checkbox",
  };

  useEffect(() => {
    handleShowProjects();
  }, []);

  async function handleShowProjects() {
    setProjects([]);
    var titulo, id, descricao, dataCriacao;
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

        data.push([titulo, id, descricao, dataCriacao]);
      }
      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(projects);

  return (
    <Container>
      <Navbar />
      <Sidebar />
      <Main>
        <TableView>
          <MUIDataTable
            title={"Projetos"}
            data={projects}
            columns={columns}
            options={options}
          />
        </TableView>
      </Main>
    </Container>
  );
}
