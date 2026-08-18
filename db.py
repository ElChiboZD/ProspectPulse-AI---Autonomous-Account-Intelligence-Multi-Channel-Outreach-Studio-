import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "prospectpulse.db")

def get_connection():
    return sqlite3.connect(DB_PATH)

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS searches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            domain TEXT,
            company_name TEXT,
            timestamp TEXT,
            result_json TEXT,
            preset TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS outreach_sent (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            search_id INTEGER,
            channel TEXT,
            contact_name TEXT,
            contact_email TEXT,
            subject TEXT,
            body TEXT,
            timestamp TEXT,
            status TEXT,
            FOREIGN KEY(search_id) REFERENCES searches(id)
        )
    ''')
    conn.commit()
    conn.close()

def save_search(domain, company_name, result_json, preset):
    conn = get_connection()
    cursor = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    cursor.execute('''
        INSERT INTO searches (domain, company_name, timestamp, result_json, preset)
        VALUES (?, ?, ?, ?, ?)
    ''', (domain, company_name, timestamp, json.dumps(result_json), preset))
    search_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return search_id

def get_history(limit=50):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, domain, company_name, timestamp, preset, result_json
        FROM searches
        ORDER BY timestamp DESC
        LIMIT ?
    ''', (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def save_outreach(search_id, channel, contact_name, contact_email, subject, body):
    conn = get_connection()
    cursor = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    cursor.execute('''
        INSERT INTO outreach_sent (search_id, channel, contact_name, contact_email, subject, body, timestamp, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'sent')
    ''', (search_id, channel, contact_name, contact_email, subject, body, timestamp))
    outreach_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return outreach_id

def get_outreach_for_search(search_id):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, search_id, channel, contact_name, contact_email, subject, body, timestamp, status
        FROM outreach_sent
        WHERE search_id = ?
        ORDER BY timestamp DESC
    ''', (search_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_stats():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT COUNT(*) FROM searches')
    total_searches = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(*) FROM outreach_sent')
    total_outreach = cursor.fetchone()[0]
    cursor.execute('SELECT COUNT(DISTINCT domain) FROM searches')
    unique_domains = cursor.fetchone()[0]
    conn.close()
    return {
        "total_searches": total_searches,
        "total_outreach": total_outreach,
        "unique_domains": unique_domains
    }
