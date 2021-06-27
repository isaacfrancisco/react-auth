import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

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
    <div>
      <form onSubmit={handleRegister}>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <Link to="/">Já possui uma conta, clique para logar!</Link>
      </form>
    </div>
  );
}
