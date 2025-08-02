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

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (erro) return <Alert severity="error">{erro}</Alert>;
  if (equipamentos.length === 0)
    return <Alert severity="info">Nenhum equipamento encontrado.</Alert>;

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {equipamentos.map((eq) => (
        <Grid item xs={12} md={6} lg={4} key={eq.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {eq.tipo} — {eq.modelo}
              </Typography>
              <Typography color="text.secondary">
                {eq.marca} ({eq.identificador})
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Disponíveis: {eq.disponiveis} | Ativos: {eq.ativo}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="small"
                onClick={() => onSelecionar(eq)}
              >
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
