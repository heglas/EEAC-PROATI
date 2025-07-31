from database import mysql_connection
import gspread
from config import GOOGLE_CREDS

def sheets_connection():
    # Inicializa a conexão com o Google Sheets usando credenciais da conta de serviço
    gc = gspread.service_account_from_dict(GOOGLE_CREDS)
    return gc.open_by_key("1S9O1ZFOZCxgecHucMTclaf-OIFz6xVRmWV2zmFGaBD4")  # Troque pelo ID correto da sua planilha

def parse_int(value, default=0):
    """Tenta converter value para int. Retorna default se falhar."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

def sync_equipamentos():
    sheet = sheets_connection().worksheet("Equipamentos")
    dados = sheet.get_all_values()[1:]  # Ignora o cabeçalho principal

    conn = mysql_connection()
    cursor = conn.cursor()

    for row in dados:
        # Validação para evitar processar linhas de cabeçalho extras ou células inválidas
        # Pula linhas que não tenham o número esperado de colunas
        if len(row) < 6:
            print(f"[WARNING] Linha ignorada por ter menos de 6 colunas: {row}")
            continue

        # Pula linhas que têm valores de cabeçalho duplicados ou valores não numéricos inesperados
        if row[0].strip().lower() == 'tipo' or row[3].strip().upper() in ['#N/A', '']:
            print(f"[WARNING] Linha ignorada (provável cabeçalho ou valor inválido): {row}")
            continue

        try:
            cursor.execute("""
                INSERT INTO equipamentos (tipo, modelo, marca, ativo, identificador, disponiveis)
                VALUES (%s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    modelo=VALUES(modelo),
                    marca=VALUES(marca),
                    ativo=VALUES(ativo),
                    disponiveis=VALUES(disponiveis)
            """, (
                row[0],                # tipo
                row[1],                # modelo
                row[2],                # marca
                parse_int(row[3]),     # ativo (convertido para inteiro ou 0)
                row[4],                # identificador
                parse_int(row[5])      # disponiveis (convertido para inteiro ou 0)
            ))
        except Exception as e:
            print(f"[ERROR] Linha ignorada durante inserção na base: {row} -- erro: {e}")
            continue

    conn.commit()
    conn.close()