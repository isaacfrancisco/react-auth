import React, { useState } from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../assets/img/logo2.png';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const history = useHistory();

    const paperStyle = {
        padding: 20,
        height: '55vh',
        width: 300,
        margin: '150px auto'
    }

    const buttonStyle = {
        margin: '30px 10px 20px 10px'
    }

    const spacing = {
        margin: '10px'
    }

    async function handleResetPassword(e) {
        e.preventDefault();

        try {
            await api.post("/auth/forgot_password", {
                email,
            });
            history.push("/home");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar src={Logo} />
                        <h2>Nova Senha</h2>
                    </Grid>
                    <Grid item xs={12} style={spacing}>
                        <Typography>
                            <span>Insira o email, a nova senha, e o token de confirmação recebido pelo email para recuperar a senha.</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={spacing}>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={spacing}>
                        <TextField
                            label="Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={spacing}>
                        <TextField
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} style={buttonStyle}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={handleResetPassword}
                            fullWidth>Enviar</Button>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}
