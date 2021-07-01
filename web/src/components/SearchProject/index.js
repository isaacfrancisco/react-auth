import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const error = {
    color: 'red',
    fontSize: '12px',
    position: 'relative'
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UpdateProject(props) {
    const { open,
        onClose,
        searchData,
        onChange,
        valueSearch,
        handleSearch,
        openSnackbar,
        openErrorSnackbar,
        handleCloseSnackbar,
        handleCloseErrorSnackbar,
        errorText } = props;


    const [inputValue, setInputValue] = React.useState('');

    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Buscar Projeto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Selecione um projeto para mostrar seus detalhes.
                    </DialogContentText>
                    <span style={error}> {errorText} </span>
                    <Autocomplete
                        id="search-box"
                        options={searchData}
                        autoSelect={true}
                        getOptionLabel={(option) => (
                            option.title === undefined ? '' : option.title + " - " + option.id
                        )}
                        value={valueSearch}
                        onChange={onChange}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) =>
                            <TextField {...params}
                                placeholder="Projetos"
                                variant="outlined"
                                fullWidth
                            />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button color="primary" onClick={handleSearch}>
                        Buscar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Projeto buscado com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar open={openErrorSnackbar} autoHideDuration={2000} onClose={handleCloseErrorSnackbar}>
                <Alert onClose={handleCloseErrorSnackbar} severity="error">
                    Erro ao buscar o projeto!
                </Alert>
            </Snackbar>
        </div>
    );
}