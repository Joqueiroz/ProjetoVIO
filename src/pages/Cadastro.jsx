import * as React from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Avatar,
  Box,
  Container,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios"; // Supondo que o método POST esteja aqui

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    data_nascimento: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    cadastrar();
  };

  async function cadastrar() {
    await api.postCadastro(user).then(
      (response) => {
        alert("Cadastro realizado com sucesso!");
        navigate("/"); // Volta para a tela de login
      },
      (error) => {
        console.log(error);
        alert(error.response?.data?.error || "Erro ao cadastrar");
      }
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ margin: 1, backgroundColor: "red" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            required
            label="Nome"
            name="name"
            margin="normal"
            value={user.name}
            onChange={onChange}
          />
          <TextField
            fullWidth
            required
            label="Email"
            name="email"
            margin="normal"
            value={user.email}
            onChange={onChange}
          />
          <TextField
            fullWidth
            required
            label="Senha"
            name="password"
            type="password"
            margin="normal"
            value={user.password}
            onChange={onChange}
          />
          <TextField
            fullWidth
            required
            label="CPF"
            name="cpf"
            margin="normal"
            inputProps={{ maxLength: 11 }}
            value={user.cpf}
            onChange={onChange}
          />
          <TextField
            fullWidth
            required
            label="Data de Nascimento"
            name="data_nascimento"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={user.data_nascimento}
            onChange={onChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
          >
            Cadastrar
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
            onClick={() => navigate("/")}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
