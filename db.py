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
            created_at TEXT,
            updated_at TEXT
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS site_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_name TEXT,
            user_title TEXT,
            user_company TEXT,
            user_email TEXT,
            action TEXT,
            target_domain TEXT,
            details TEXT,
            ip_address TEXT,
            timestamp TEXT
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


def log_event(user_name, user_title, user_company, user_email, action, target_domain="", details="", ip_address=""):
    """Log an interaction/telemetry event to the database."""
    conn = get_connection()
    cursor = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    try:
        cursor.execute('''
            INSERT INTO site_events (user_name, user_title, user_company, user_email, action, target_domain, details, ip_address, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            str(user_name or "Anonymous"),
            str(user_title or "Tester"),
            str(user_company or "Zendesk"),
            str(user_email or "").lower(),
            str(action),
            str(target_domain or ""),
            str(details or ""),
            str(ip_address or ""),
            timestamp
        ))
        conn.commit()
    except Exception as e:
        pass
    finally:
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


def save_user_profile(email, name, title, company, preset, api_key="", avatar_url=""):
    conn = get_connection()
    cursor = conn.cursor()
    timestamp = datetime.utcnow().isoformat()
    clean_email = str(email or "").strip().lower()
    if not clean_email:
        clean_email = "tester@zendesk.com"
    try:
        cursor.execute("ALTER TABLE user_profiles ADD COLUMN created_at TEXT")
    except Exception:
        pass
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
    ''', (clean_email, name, title, company, preset, api_key, avatar_url, timestamp))
    conn.commit()
    conn.close()

    # Log profile event
    log_event(name, title, company, clean_email, "profile_saved", details=f"Preset: {preset}")
    return True


def get_user_profile(email=None):
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    if email:
        cursor.execute('SELECT * FROM user_profiles WHERE email = ? LIMIT 1', (email.lower(),))
    else:
        cursor.execute('SELECT * FROM user_profiles ORDER BY updated_at DESC LIMIT 1')
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None


def get_all_user_profiles():
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, email, name, title, company, preset, updated_at
        FROM user_profiles
        ORDER BY updated_at DESC
    ''')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]


def get_analytics_overview():
    """Aggregate high-level analytics and usage statistics."""
    conn = get_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Total searches
    cursor.execute('SELECT COUNT(*) FROM searches')
    total_searches = cursor.fetchone()[0]

    # Unique domains queried
    cursor.execute('SELECT COUNT(DISTINCT domain) FROM searches')
    unique_domains = cursor.fetchone()[0]

    # Total outreach sequences drafted
    cursor.execute('SELECT COUNT(*) FROM outreach_sent')
    total_outreach = cursor.fetchone()[0]

    # Total registered profiles
    cursor.execute('SELECT COUNT(*) FROM user_profiles')
    total_users = cursor.fetchone()[0]

    # Total events logged
    cursor.execute('SELECT COUNT(*) FROM site_events')
    total_events = cursor.fetchone()[0]

    # Top queried domains
    cursor.execute('''
        SELECT domain, company_name, COUNT(*) as count
        FROM searches
        GROUP BY domain
        ORDER BY count DESC
        LIMIT 10
    ''')
    top_domains = [dict(row) for row in cursor.fetchall()]

    # Registered user profiles roster
    cursor.execute('''
        SELECT id, email, name, title, company, preset, updated_at
        FROM user_profiles
        ORDER BY updated_at DESC
        LIMIT 25
    ''')
    user_roster = [dict(row) for row in cursor.fetchall()]

    # Recent activity stream
    cursor.execute('''
        SELECT id, user_name, user_title, user_company, user_email, action, target_domain, details, timestamp
        FROM site_events
        ORDER BY timestamp DESC
        LIMIT 50
    ''')
    recent_events = [dict(row) for row in cursor.fetchall()]

    # Action counts breakdown
    cursor.execute('''
        SELECT action, COUNT(*) as count
        FROM site_events
        GROUP BY action
        ORDER BY count DESC
    ''')
    action_breakdown = [dict(row) for row in cursor.fetchall()]

    conn.close()
    return {
        "total_searches": total_searches,
        "unique_domains": unique_domains,
        "total_outreach": total_outreach,
        "total_users": total_users,
        "total_events": total_events,
        "top_domains": top_domains,
        "user_roster": user_roster,
        "recent_events": recent_events,
        "action_breakdown": action_breakdown
    }


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

