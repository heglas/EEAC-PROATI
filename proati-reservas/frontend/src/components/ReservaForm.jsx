import React, { useState } from "react";
import { reservarEquipamento } from "../api";
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";

function ReservaForm({ equipamento, onSucesso, onCancelar }) {
  // Hooks sempre declarados no topo
  const [usuario, setUsuario] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [selectedUnits, setSelectedUnits] = useState([]); // seleção múltipla
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!equipamento) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Selecione um equipamento para reservar.
        </Typography>
      </Box>
    );
  }

  const unidadesDisponiveis = equipamento.disponiveis || 0;

  // Alterna seleção da unidade (toggle)
  const toggleUnit = (unitNumber) => {
    if (selectedUnits.includes(unitNumber)) {
      setSelectedUnits(selectedUnits.filter((u) => u !== unitNumber));
    } else {
      setSelectedUnits([...selectedUnits, unitNumber]);
    }
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    if (selectedUnits.length === 0) {
      setErro("Por favor, selecione pelo menos um número de equipamento para reservar.");
      return;
    }

    setLoading(true);

    try {
      await reservarEquipamento({
        equipamento_id: equipamento.id,
        usuario,
        inicio,
        fim,
        unidades: selectedUnits, // Array das unidades selecionadas
      });
      setLoading(false);
      onSucesso();
    } catch (e) {
      setErro(e.message);
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 4,
        p: 3,
        borderRadius: 2,
        border: "1px solid #ddd",
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Reservar: {equipamento.tipo} – {equipamento.modelo}
      </Typography>

      <TextField
        label="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Início"
        type="datetime-local"
        value={inicio}
        onChange={(e) => setInicio(e.target.value)}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Fim"
        type="datetime-local"
        value={fim}
        onChange={(e) => setFim(e.target.value)}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />

      <Typography sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
        Selecione os números dos equipamentos que deseja reservar:
      </Typography>

      <Grid container spacing={1} justifyContent="center">
        {Array.from({ length: unidadesDisponiveis }).map((_, idx) => {
          const numero = idx + 1;
          const numeroFormatado = String(numero).padStart(2, "0");
          const isSelected = selectedUnits.includes(numero);
          return (
            <Grid item xs={2} sm={1} key={numero}>
              <Button
                fullWidth
                variant={isSelected ? "contained" : "outlined"}
                color={isSelected ? "primary" : "inherit"}
                onClick={() => toggleUnit(numero)}
                sx={{ minWidth: 44, minHeight: 44 }}
              >
                {numeroFormatado}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {erro && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {erro}
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={onCancelar} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Reservar"}
        </Button>
      </Box>
    </Box>
  );
}

export default ReservaForm;
