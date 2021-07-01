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

const redButton = {
  background: "#c62828"
}

export default function Home() {
  const token = localStorage.getItem("token");
  const AuthToken = "Bearer ".concat(token);
  const [projects, setProjects] = useState([]);

  const [openDialogName, setOpenDialog] = React.useState(false);
  const handleClose = () => setOpenDialog(false);
  const openCreateDialog = () => {
    setOpenDialog('CREATE');
  }

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

  useEffect(() => {
    handleShowProjects();
  }, []);

  async function handleShowProjects() {
    setProjects([]);
    var titulo, id, descricao, dataCriacao, tarefa, status, usuario;
    const data = [];
    try {
      const response = await api.get("/projects", {
        headers: { Authorization: AuthToken },
      });

      console.log(response.data);

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
          </span>
        ]);
      }
      setProjects(data);
    } catch (err) {
      console.log(err);
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

              <ListItem button>
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
                <Button variant="contained" color="primary">
                  Buscar Projeto
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" style={greenButton} onClick={openCreateDialog}>
                  Criar Projeto
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" style={redButton}>
                  Remover Projeto
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
      </div>
    </>

  );
}
