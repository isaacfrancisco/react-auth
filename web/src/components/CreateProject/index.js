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

export default function CreateProject(props) {
    const { open, onClose } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [task, setTask] = useState('');

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
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Criar Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insira os dados para criar um novo projeto.
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
        </div>
    );
}