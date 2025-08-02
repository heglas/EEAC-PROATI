from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Configurando CORS permitindo origens específicas (frontend local e IP da VPS)
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:3000",        # frontend rodando localmente (dev)
    "http://194.5.159.164",         # frontend hospedado acessando backend
    "http://194.5.159.164:8000"     # se frontend na mesma porta backend
]}})

# Suas outras configurações e rotas aqui

@app.route('/equipamentos')
def equipamentos():
    # Exemplo simples, substitua pela sua implementação real
    return {
        "message": "Lista de equipamentos"
        # seu código real que retorna a lista dos equipamentos
    }

# Outras rotas ...

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
