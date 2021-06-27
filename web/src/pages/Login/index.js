import React, { useState } from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/authenticate", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Enviar" />
        <Link to="/register">Não possui uma conta, clique para registrar</Link>
      </form>
    </div>
  );
}
