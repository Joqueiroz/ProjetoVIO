import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";

function listEventos() {
  const [events, setEventos] = useState([]);
  const [alert, setalert] = useState({
    // Visibilidade (false = oculto; true = visivel)
    open: false,

    // Nivel do alerta (sucess, error, warning, etc)
    severity: "",

    // messagem exibida
    message: "",
  });

  // função para exibir o alerta
  const showAlert = (severity, message) => {
    setalert({ open: true, severity, message });
  };

  // fechar o alerta
  const handleCloseAlert = () => {
    setalert({ ...alert, open: false });
  };

  const navigate = useNavigate();

  async function getEvents() {
    // Chamada da Api
    await api.getEvents().then(
      (response) => {
        console.log(response.data.events);
        setEventos(response.data.events);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  async function deleteEvento(id) {
    try {
      await api.deleteEvento(id);
      await getEvents();
      showAlert("success", "Usuário Excluido com Sucesso!");
    } catch (error) {
      console.log("Erro ao deletar usuario...", error);
      showAlert("Error", error.response.data.error);
    }
  }

  const listEventos = events.map((evento) => {
    return (
      <TableRow key={evento.id_evento}>
        <TableCell align="center">{evento.nome}</TableCell>
        <TableCell align="center">{evento.descricao}</TableCell>
        <TableCell align="center">{evento.data_hora}</TableCell>
        <TableCell align="center">{evento.local}</TableCell>
        <TableCell align="center">
          <IconButton onClick={() => deleteEvento(evento.id_evento)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  useEffect(() => {
    // if(!localStorage.getItem("authenticated")){
    //   navigate("/")
    // }
    getEvents();
  }, []);

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{vertical:"top", horizontal:"center"}}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}
        sx={{
          width:"100%"
        }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      {events.length == 0 ? (
        <h1 style={{ textAlign: "center" }}>Carregando Eventos</h1>
      ) : (
        <div>
          <h5>Lista de Eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "purple", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Horario</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center">LIXO POR AQUI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEventos}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" onClick={logout}>
            SAIR
          </Button>
          
        </div>
      )}
    </div>
  );
}
export default listEventos;
