PROATI Reservas
Sistema web para agendamento e controle de recursos computacionais em ambientes educacionais.

📌 Visão Geral
O PROATI Reservas é uma aplicação web responsiva para gerenciar reservas de equipamentos como tablets, notebooks, netbooks e ultrabooks em escolas. O sistema integra dados entre uma planilha do Google Sheets e um banco de dados MySQL, garantindo redundância e facilitando o controle em tempo real.

🚀 Funcionalidades Principais
Listagem de equipamentos com status de disponibilidade

Agendamento de reservas com validação de conflitos

Painel de controle (dashboard) com indicadores de uso e disponibilidade

Sincronização automática entre Google Sheets e MySQL

Interface responsiva para desktop e mobile

🛠️ Pré-requisitos
Backend: Python 3.8+, Flask, MySQL

Frontend: Node.js, React

Google Cloud para autenticação da API do Google Sheets (opcional)

Hostinger ou outro serviço de hospedagem para banco de dados MySQL

🚦 Instalação
Clone o repositório:

bash
git clone https://github.com/SEU_USUARIO/proati-reservas.git
cd proati-reservas
Configure o ambiente backend:

bash
cd backend
pip install -r requirements.txt
cp ../config/config.py.template config.py
# Edite o arquivo config.py com suas credenciais
Configure o banco de dados:

bash
mysql -u usuario -p < scripts/init_db.sql
Configure o ambiente frontend:

bash
cd ../frontend
npm install
Inicie o backend:

bash
cd ../backend
python app.py
Inicie o frontend:

bash
cd ../frontend
npm start
🏗️ Estrutura do Projeto
text
proati-reservas/
├── backend/
│   ├── app.py
│   ├── database.py
│   ├── sync_logic.py
│   ├── reservation_logic.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── EquipmentList.jsx
│       │   ├── ReservationForm.jsx
│       │   └── Dashboard.jsx
│       ├── App.js
│       └── index.js
├── scripts/
│   ├── init_db.sql
│   └── deploy.sh
├── config/
│   └── config.py.template
└── README.md
🔒 Segurança
Não armazene credenciais diretamente no código.

Use HTTPS para comunicação entre frontend e backend.

Implemente autenticação (ex: JWT) conforme necessário.

Valide e sanitize todas as entradas de usuário.

🧩 Boas Práticas de Desenvolvimento
Separação clara entre backend e frontend para facilitar manutenção e escalabilidade.

Componentes React reutilizáveis para consistência e facilidade de atualização.

Tratamento de erros e logs no backend para facilitar a identificação de problemas.

Sincronização automática de dados para garantir redundância e integridade.

Documentação atualizada para facilitar onboarding de novos colaboradores.

🔄 Contribuição
Siga as diretrizes abaixo para contribuir com o projeto:

Faça um fork do repositório.

Crie um branch para sua feature:

bash
git checkout -b feature/minha-feature
Faça commit das suas alterações:

bash
git commit -m "Adiciona nova funcionalidade"
Faça push para o branch:

bash
git push origin feature/minha-feature
Abra um Pull Request.

📄 Licença
Este projeto está licenciado sob a MIT License.

📞 Contato
Para dúvidas ou sugestões, entre em contato com o time de desenvolvimento.

Última atualização: 2025-06-26