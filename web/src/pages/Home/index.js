import React, { useEffect, useState } from "react";
import api from "../../services/api";
import MUIDataTable from "mui-datatables";
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../assets/img/logo2.png';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListAltIcon from '@material-ui/icons/ListAlt';
import Paper from '@material-ui/core/Paper';
import { Grid } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CreateProject from "../../components/CreateProject";
import UpdateProject from "../../components/UpdateProject";
import DeleteProject from '../../components/DeleteProject';
import { useHistory } from "react-router-dom";
import SearchProject from '../../components/SearchProject';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: '#2b2b2b',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#2b2b2b',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    margin: 10,
  },
  colorText: {
    color: 'white',
  }
}));

const paperStyle = {
  padding: 20,
  marginBottom: 20
}

const greenButton = {
  background: "#2e7d32"
}

export default function Home() {
  const token = localStorage.getItem("token");
  const AuthToken = "Bearer ".concat(token);
  const [projects, setProjects] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const [project, setProject] = useState('');

  const history = useHistory();

  const classes = useStyles();

  const columns = ["Titulo", "Id", "Usuário", "Descrição", "Tarefa", "Status", "Data de Criação", "Ações"];

  const options = {
    filterType: "checkbox",
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    search: false,
    download: false,
    print: false,
    viewColumns: false,
    filter: false
  };

  const [errorText, setErrorText] = useState('');

  const [openDialogName, setOpenDialog] = React.useState(false);
  const handleClose = () => setOpenDialog(false);
  const openCreateDialog = () => {
    setOpenDialog('CREATE');
  }
  const openSearchDialog = () => {
    setProject('');
    setOpenDialog('SEARCH');
  }

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("name", "");
    localStorage.setItem("id", "");
    history.push("/")
  }

  const onChange = (event, newValue) => {
    setProject(newValue);
  }

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleOpenErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorSnackbar(false);
  };

  useEffect(() => {
    handleShowProjects();
  }, []);

  async function handleShowProjects() {
    setProjects([]);
    var titulo, id, descricao, dataCriacao, tarefa, status, usuario;
    const data = [];
    const dataSearch = [];
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
          dataCriacao,
          <span>
            <UpdateProject
              titulo={titulo}
              idProject={id}
              descricao={descricao}
              tarefa={tarefa}
              statusProject={status}
              handleRefresh={(e) => handleRefresh()}
            />
            <DeleteProject
              idProject={id}
              handleRefresh={(e) => handleRefresh()}
            />
          </span>
        ]);

        dataSearch.push({
          title: titulo,
          id: id
        })
      }

      console.log(dataSearch);
      setProjects(data);
      setSearchData(dataSearch);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSearch() {
    if (project.id === '') {
      setErrorText('Selecione um projeto!');
    } else {
      try {
        setProjects([]);
        var titulo, id, descricao, dataCriacao, tarefa, status, usuario;
        const data = [];

        const response = await api.get("/projects/" + project.id,
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
          <span>
            <UpdateProject
              titulo={titulo}
              idProject={id}
              descricao={descricao}
              tarefa={tarefa}
              statusProject={status}
              handleRefresh={(e) => handleRefresh()}
            />
            <DeleteProject
              idProject={id}
              handleRefresh={(e) => handleRefresh()}
            />
          </span>
        ]);

        setProjects(data);
        setErrorText('');
        handleClose();
        handleOpenSnackbar();
      } catch (err) {
        setErrorText('');
        handleOpenErrorSnackbar();
      }
    }
  }

  function handleRefresh() {
    handleShowProjects();
  }

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Avatar src={Logo} className={classes.avatar} />
            <Typography variant="h6" noWrap>
              React Auth
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ListAltIcon className={classes.colorText} />
                </ListItemIcon>
                <ListItemText className={classes.colorText} primary="Projetos" />
              </ListItem>

              <ListItem onClick={handleLogout} button>
                <ListItemIcon>
                  <ArrowBackIcon className={classes.colorText} />
                </ListItemIcon>
                <ListItemText className={classes.colorText} primary="Sair" />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Paper elevation={3} style={paperStyle}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
              <Grid item>
                <Button variant="contained" color="primary" onClick={openSearchDialog}>
                  Buscar Projeto
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" style={greenButton} onClick={openCreateDialog}>
                  Criar Projeto
                </Button>
              </Grid>
            </Grid>

          </Paper>
          <MUIDataTable
            title={"Projetos"}
            data={projects}
            columns={columns}
            options={options}
          />
        </main>
        <CreateProject
          open={openDialogName === 'CREATE'}
          onClose={handleClose}
          handleRefresh={(e) => handleRefresh()}
        />
        <SearchProject
          open={openDialogName === 'SEARCH'}
          onClose={handleClose}
          searchData={searchData}
          valueSearch={project}
          onChange={onChange}
          openSnackbar={openSnackbar}
          openErrorSnackbar={openErrorSnackbar}
          handleSearch={(e) => handleSearch()}
          handleOpenSnackbar={handleOpenSnackbar}
          handleOpenErrorSnackbar={handleOpenErrorSnackbar}
          handleCloseSnackbar={handleCloseSnackbar}
          handleCloseErrorSnackbar={handleCloseErrorSnackbar}
          errorText={errorText}
        />
      </div>
    </>

  );
}
