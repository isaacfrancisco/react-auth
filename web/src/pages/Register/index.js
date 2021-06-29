import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../../assets/img/logo2.png';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const paperStyle = {
    padding: 20,
    height: '60vh',
    width: 300,
    margin: '150px auto'
  }

  const buttonStyle = {
    margin: '30px 10px 20px 10px'
  }

  const spacing = {
    margin: '10px'
  }

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);

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
            <h2>Cadastrar</h2>
          </Grid>
          <Grid item xs={12} style={spacing}>
            <TextField
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
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
              onClick={handleRegister}
              fullWidth>Cadastrar</Button>
          </Grid>
          <Link to="" style={spacing}>
            Esqueceu a Senha?
          </Link>
          <Typography style={spacing}>
            Já possui uma conta?
            <Link to="/">
              Entrar
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}
