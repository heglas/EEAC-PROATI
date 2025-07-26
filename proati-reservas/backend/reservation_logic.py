from database import mysql_connection

def verificar_disponibilidade(equipamento_id, inicio, fim):
    conn = mysql_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT COUNT(*) FROM reservas 
        WHERE equipamento_id = %s 
        AND ((data_inicio BETWEEN %s AND %s) 
        OR (data_fim BETWEEN %s AND %s))
    """, (equipamento_id, inicio, fim, inicio, fim))
    disponivel = cursor.fetchone()[0] == 0
    conn.close()
    return disponivel
