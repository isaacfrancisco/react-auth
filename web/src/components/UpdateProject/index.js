import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../services/api';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const id = localStorage.getItem('id');
const token = localStorage.getItem("token");
const AuthToken = "Bearer ".concat(token);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const error = {
    color: 'red',
    fontSize: '12px',
    position: 'relative'
}

export default function UpdateProject(props) {
    const {
        handleRefresh,
        titulo,
        idProject,
        descricao,
        tarefa,
        statusProject,
    } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [task, setTask] = useState('');
    const [status, setStatus] = useState('');

    const [errorText, setErrorText] = useState('');

    const [openDialog, setOpenDialog] = useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const handleOpen = () => {
        setTitle(titulo);
        setDescription(descricao);
        setTask(tarefa);
        setStatus(statusProject);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

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

    async function handleUpdate(e) {
        e.preventDefault();

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

        if (title === '' || description === '' || task === '' || status === '') {
            setErrorText('Digite os dados corretamente!');
        } else {
            try {
                await api.put("/projects/" + idProject, {
                    title,
                    description,
                    tasks,
                }, {
                    headers: { Authorization: AuthToken },
                });
                setErrorText('');
                handleRefresh();
                handleClose();
                handleOpenSnackbar();
            } catch (err) {
                console.log(err);
                setErrorText('');
                handleOpenErrorSnackbar();
            }
        }
    }

    return (
        <span>
            <Tooltip title="Editar Projeto">
                <IconButton onClick={handleOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira os dados para editar o projeto.
                    </DialogContentText>
                    <span style={error}> {errorText} </span>
                    <TextField
                        margin="dense"
                        id="title"
                        label="Titulo"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Descrição"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="task"
                        label="Tarefa"
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="status"
                        label="Status"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={handleUpdate}>
                        Editar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Projeto editado com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={2000} onClose={handleCloseErrorSnackbar}>
                <Alert onClose={handleCloseErrorSnackbar} severity="error">
                    Erro ao editar o projeto!
                </Alert>
            </Snackbar>
        </span>
    );
}