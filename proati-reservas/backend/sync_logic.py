from database import mysql_connection
import gspread
from config import GOOGLE_CREDS

def sheets_connection():
    gc = gspread.service_account_from_dict(GOOGLE_CREDS)
    return gc.open_by_key("1S9O1ZFOZCxgecHucMTclaf-OIFz6xVRmWV2zmFGaBD4")  # Troque pelo ID da sua planilha, se necessário

def sync_equipamentos():
    sheet = sheets_connection().worksheet("Equipamentos")
    dados = sheet.get_all_values()[1:]  # Ignorar cabeçalho
    
    conn = mysql_connection()
    cursor = conn.cursor()

    for row in dados:
        cursor.execute("""
            INSERT INTO equipamentos (tipo, modelo, marca, ativo, identificador, disponiveis)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                modelo=VALUES(modelo),
                marca=VALUES(marca),
                ativo=VALUES(ativo),
                disponiveis=VALUES(disponiveis)
        """, (row[0], row[1], row[2], int(row[3]), row[4], int(row[5])))

    conn.commit()
    conn.close()
