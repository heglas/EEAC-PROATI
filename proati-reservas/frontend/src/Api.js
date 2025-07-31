export const API_BASE_URL = "http://194.5.159.164:8000";

export async function fetchEquipamentos() {
  const response = await fetch(`${API_BASE_URL}/equipamentos`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar equipamentos: ${response.statusText}`);
  }
  return response.json();
}

export async function reservarEquipamento(dadosReserva) {
  const response = await fetch(`${API_BASE_URL}/reservar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosReserva),
  });
  if (!response.ok) {
    const erro = await response.text();
    throw new Error(`Erro na reserva: ${erro}`);
  }
  return response.json();
}
