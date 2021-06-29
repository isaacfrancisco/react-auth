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

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const history = useHistory();

    const paperStyle = {
        padding: 20,
        height: '40vh',
        width: 300,
        margin: '150px auto'
    }

    const buttonStyle = {
        margin: '30px 10px 20px 10px'
    }

    const spacing = {
        margin: '10px'
    }

    async function handleForgotPassword(e) {
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
                        <h2>Esqueceu a Senha</h2>
                    </Grid>
                    <Grid item xs={12} style={spacing}>
                        <Typography>
                            <span>Insira o email para recuperar a senha</span>
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
                    <Grid item xs={12} style={buttonStyle}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            onClick={handleForgotPassword}
                            fullWidth>Enviar</Button>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}
