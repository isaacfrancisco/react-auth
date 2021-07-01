import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../services/api';

const id = localStorage.getItem('id');
const token = localStorage.getItem("token");
const AuthToken = "Bearer ".concat(token);

export default function UpdateProject(props) {
    const { open, onClose, titulo } = props;

    console.log(props);

    const [title, setTitle] = useState(props.titulo);
    const [description, setDescription] = useState('');
    const [task, setTask] = useState('');
    const [user, setUser] = useState('');
    const [status, setStatus] = useState('');

    async function handleCreate(e) {
        e.preventDefault();
        const tasks = [{
            title: task,
            assignedTo: id
        }]

        try {
            const response = await api.post("/projects", {
                title,
                description,
                tasks,
            }, {
                headers: { Authorization: AuthToken },
            });
            console.log(response.data);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <span>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editar Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira os dados para editar o projeto.
                    </DialogContentText>
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
                        id="user"
                        label="Usuário"
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
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
                    <Button color="primary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={handleCreate}>
                        Criar
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}