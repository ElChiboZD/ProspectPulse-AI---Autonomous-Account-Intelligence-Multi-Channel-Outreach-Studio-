import sqlite3
import json
import os
import sys
from datetime import datetime

if getattr(sys, 'frozen', False):
    if sys.platform == 'darwin':
        base_dir = os.path.expanduser('~/Library/Application Support')
    elif sys.platform == 'win32':
        base_dir = os.environ.get('APPDATA', os.path.dirname(sys.executable))
    else:
        base_dir = os.path.expanduser('~/.config')
    DB_DIR = os.path.join(base_dir, 'ProspectPulseAI')
    try:
        os.makedirs(DB_DIR, exist_ok=True)
    except Exception:
        DB_DIR = os.path.dirname(sys.executable)
else:
    DB_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DB_DIR, "prospectpulse.db")

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
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            name TEXT,
            title TEXT,
            company TEXT,
            preset TEXT,
            api_key TEXT,
            avatar_url TEXT,
            updated_at TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS beta_feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            feedback_type TEXT,
            rating INTEGER,
            message TEXT,
            diagnostic_info TEXT,
            timestamp TEXT
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

def save_user_profile(email, name, title, company, preset, api_key="", avatar_url=""):
    conn = get_connection()
    cursor = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    cursor.execute('''
        INSERT INTO user_profiles (email, name, title, company, preset, api_key, avatar_url, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET
            name=excluded.name,
            title=excluded.title,
            company=excluded.company,
            preset=excluded.preset,
            api_key=excluded.api_key,
            avatar_url=excluded.avatar_url,
            updated_at=excluded.updated_at
    ''', (email, name, title, company, preset, api_key, avatar_url, timestamp))
    conn.commit()
    conn.close()
    return True

def get_user_profile(email=None):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    if email:
        cursor.execute('SELECT * FROM user_profiles WHERE email = ? LIMIT 1', (email,))
    else:
        cursor.execute('SELECT * FROM user_profiles ORDER BY updated_at DESC LIMIT 1')
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def save_beta_feedback(email, feedback_type, rating, message, diagnostic_info):
    conn = get_connection()
    cursor = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    cursor.execute('''
        INSERT INTO beta_feedback (email, feedback_type, rating, message, diagnostic_info, timestamp)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (email, feedback_type, rating, message, json.dumps(diagnostic_info), timestamp))
    conn.commit()
    conn.close()
    return True

def get_beta_feedback():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM beta_feedback ORDER BY timestamp DESC')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

