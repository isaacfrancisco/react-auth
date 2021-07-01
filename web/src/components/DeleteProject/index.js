import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
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
import DeleteIcon from '@material-ui/icons/Delete';

const token = localStorage.getItem("token");
const AuthToken = "Bearer ".concat(token);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function DeleteProject(props) {
    const { handleRefresh, idProject } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const handleOpen = () => {
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

        try {
            await api.delete("/projects/" + idProject,
                {
                    headers: { Authorization: AuthToken },
                });
            handleRefresh();
            handleClose();
            handleOpenSnackbar();
        } catch (err) {
            console.log(err);
            handleOpenErrorSnackbar();
        }

    }

    return (
        <span>
            <Tooltip title="Remover Projeto">
                <IconButton onClick={handleOpen}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Remover Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja remover esse projeto?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={handleUpdate}>
                        Remover
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Projeto removido com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={2000} onClose={handleCloseErrorSnackbar}>
                <Alert onClose={handleCloseErrorSnackbar} severity="error">
                    Erro ao deletar o projeto!
                </Alert>
            </Snackbar>
        </span>
    );
}