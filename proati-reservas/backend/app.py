from flask import Flask, jsonify, request
from database import mysql_connection
from sync_logic import sync_equipamentos
from reservation_logic import verificar_disponibilidade

app = Flask(__name__)

@app.route('/equipamentos', methods=['GET'])
def get_equipamentos():
    conn = mysql_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM equipamentos")
    result = cursor.fetchall()
    conn.close()
    return jsonify(result)

@app.route('/reservar', methods=['POST'])
def criar_reserva():
    data = request.json
    disponivel = verificar_disponibilidade(
        data['equipamento_id'], data['inicio'], data['fim']
    )
    if disponivel:
        conn = mysql_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO reservas (equipamento_id, usuario, data_inicio, data_fim, finalidade)
            VALUES (%s, %s, %s, %s, %s)
        """, (data['equipamento_id'], data['usuario'], data['inicio'], data['fim'], data.get('finalidade', '')))
        conn.commit()
        conn.close()
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "error", "message": "Conflito de reserva"}), 400

@app.route('/sync', methods=['POST'])
def sincronizar():
    sync_equipamentos()
    return jsonify({"status": "sincronizado"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)