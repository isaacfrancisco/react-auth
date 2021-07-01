import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../services/api';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const id = localStorage.getItem('id');
const token = localStorage.getItem("token");
const AuthToken = "Bearer ".concat(token);

const error = {
    color: 'red',
    fontSize: '12px',
    position: 'relative'
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateProject(props) {
    const { open, onClose, handleRefresh } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [task, setTask] = useState('');

    const [errorText, setErrorText] = useState('');

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


    async function handleCreate(e) {
        e.preventDefault();
        const tasks = [{
            title: task,
            assignedTo: id
        }]

        if (title === '' || description === '' || task === '') {
            setErrorText('Digite os dados corretamente!');
        } else {
            try {
                await api.post("/projects", {
                    title,
                    description,
                    tasks,
                }, {
                    headers: { Authorization: AuthToken },
                });
                setErrorText('');
                handleRefresh();
                onClose();
                handleOpenSnackbar();
            } catch (err) {
                setErrorText('');
                handleOpenErrorSnackbar();
            }
        }
    }

    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Criar Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira os dados para criar um novo projeto.
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
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={handleCreate}>
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Projeto criado com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={2000} onClose={handleCloseErrorSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Erro ao criar o projeto!
                </Alert>
            </Snackbar>
        </div>
    );
}