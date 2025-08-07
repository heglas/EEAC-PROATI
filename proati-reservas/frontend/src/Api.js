// Força sempre o endereço do VPS para produção (HTTPS com domínio configurado)
const API_BASE_URL = "https://api.heglasmoreira.com.br";

// Função para buscar a lista de equipamentos na API
export async function fetchEquipamentos() {
  const response = await fetch(`${API_BASE_URL}/equipamentos`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar equipamentos: ${response.statusText}`);
  }
  return response.json();
}

// Função para enviar os dados da reserva para a API
export async function reservarEquipamento(dadosReserva) {
  const response = await fetch(`${API_BASE_URL}/reservar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosReserva),
  });

  if (!response.ok) {
    const erro = await response.text();
    throw new Error(`Erro na reserva: ${erro}`);
  }
  return response.json();
}

// Função para buscar as reservas do backend
export async function fetchReservas() {
  const response = await fetch(`${API_BASE_URL}/reservas`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar reservas: ${response.statusText}`);
  }
  return response.json();
}