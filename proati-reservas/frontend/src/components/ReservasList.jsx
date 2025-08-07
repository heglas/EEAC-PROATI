import React, { useEffect, useState } from "react";
import { fetchReservas } from "../api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

function ReservasList() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchReservas()
      .then((data) => {
        setReservas(data);
        setLoading(false);
      })
      .catch((e) => {
        setErro(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (erro) return <Alert severity="error">{erro}</Alert>;
  if (reservas.length === 0)
    return <Typography>Nenhuma reserva registrada ainda.</Typography>;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Reservas Atuais
      </Typography>
      <List>
        {reservas.map((reserva) => (
          <ListItem key={reserva.id} divider>
            <ListItemText
              primary={`Equipamento: ${reserva.equipamento_id}`}
              secondary={`De: ${new Date(reserva.inicio).toLocaleString()} até ${new Date(
                reserva.fim
              ).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ReservasList;
