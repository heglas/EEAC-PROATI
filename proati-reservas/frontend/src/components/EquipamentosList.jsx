import React, { useEffect, useState } from "react";
import { fetchEquipamentos } from "../api";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Alert,
} from "@mui/material";

function EquipamentosList({ onSelecionar = () => {} }) {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchEquipamentos()
      .then((data) => {
        setEquipamentos(data);
        setLoading(false);
      })
      .catch((e) => {
        setErro(e.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (erro) return <Alert severity="error">{erro}</Alert>;
  if (equipamentos.length === 0) return <Typography>Nenhum equipamento encontrado.</Typography>;

  return (
    <Grid container spacing={2}>
      {equipamentos.map((eq) => (
        <Grid item xs={12} sm={6} md={4} key={eq.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                {eq.tipo} — {eq.modelo}
              </Typography>
              <Typography color="text.secondary">
                {eq.marca} ({eq.identificador})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Disponíveis: {eq.disponiveis} | Ativos: {eq.ativo ? "Sim" : "Não"}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => onSelecionar(eq)}>
                Reservar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default EquipamentosList;
