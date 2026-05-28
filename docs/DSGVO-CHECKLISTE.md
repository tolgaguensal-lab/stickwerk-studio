# DSGVO-Checkliste

**Projekt:** Stickwerk-Studio
**Stand:** 28. Mai 2026
**Status:** DSGVO-orientiert vorbereitet, finale rechtliche Prüfung erforderlich.

---

## 1. Erhobene personenbezogene Daten

### 1.1 Leads/Anfragen (Patch-Konfigurator)
| Datenfeld | Zweck | Rechtsgrundlage | Speicherdauer |
|-----------|-------|-----------------|---------------|
| Name | Kontaktaufnahme | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| E-Mail | Kontaktaufnahme | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Telefon (optional) | Kontaktaufnahme | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Unternehmen (optional) | Angebotserstellung | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Nachricht | Angebotserstellung | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Patch-Konfiguration | Preisberechnung | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Preisrange | Angebotserstellung | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |

### 1.2 Kontaktformular
| Datenfeld | Zweck | Rechtsgrundlage | Speicherdauer |
|-----------|-------|-----------------|---------------|
| Name | Kontaktaufnahme | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| E-Mail | Kontaktaufnahme | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Telefon (optional) | Kontaktaufnahme | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Betreff | Nachrichtenbearbeitung | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |
| Nachricht | Nachrichtenbearbeitung | Art. 6 Abs. 1 lit. b DSGVO | 3 Jahre |

### 1.3 Technische Daten
| Datenfeld | Zweck | Rechtsgrundlage | Speicherdauer |
|-----------|-------|-----------------|---------------|
| IP-Adresse (Server-Logs) | Sicherheit, Debugging | Art. 6 Abs. 1 lit. f DSGVO | 7 Tage |
| User-Agent (Server-Logs) | Sicherheit, Debugging | Art. 6 Abs. 1 lit. f DSGVO | 7 Tage |

---

## 2. Zweck der Verarbeitung

- **Kontaktaufnahme:** Bearbeitung von Anfragen und Erstellung von Angeboten
- **Vertragsanbahnung:** Vorbereitung von Geschäftsbeziehungen
- **Kommunikation:** Antwort auf Anfragen und Kontaktanliegen
- **Sicherheit:** Schutz vor Missbrauch und Sicherheitsvorfällen

---

## 3. Rechtsgrundlagen

- **Art. 6 Abs. 1 lit. b DSGVO:** Erfüllung von Vertragsanbahnung
- **Art. 6 Abs. 1 lit. f DSGVO:** Berechtigte Interessen (Sicherheit, Debugging)
- **Einwilligung:** Explizite Einwilligung durch Checkbox in Formularen

---

## 4. Speicherdauer

- **Leads/Anfragen:** 3 Jahre nach letzter Kontaktaufnahme
- **Kontaktformular:** 3 Jahre nach Nachricht
- **Server-Logs:** 7 Tage
- **Consent-Protokolle:** 3 Jahre

---

## 5. Löschkonzept

### 5.1 Automatische Löschung
- Leads nach 3 Jahren ohne Aktivität werden automatisch als `deleted_at` markiert
- Server-Logs nach 7 Tagen automatisch gelöscht

### 5.2 Manuelle Löschung
- Admin kann Leads im Dashboard löschen (Soft Delete)
- Vollständige Löschung auf Anfrage durch Datenbank-Admin

### 5.3 Löschung auf Anfrage
- Art. 17 DSGVO (Recht auf Löschung) wird innerhalb von 30 Tagen umgesetzt
- Löschung umfasst alle Tabellen mit personenbezogenen Daten

---

## 6. Auskunfts- und Exportkonzept

### 6.1 Auskunft (Art. 15 DSGVO)
- Anfrage an: [datenschutz@stickwerk-studio.de] (Platzhalter)
- Antwort innerhalb von 30 Tagen
- Umfang: Alle gespeicherten personenbezogenen Daten

### 6.2 Datenexport (Art. 20 DSGVO)
- Format: JSON oder CSV
- Umfang: Alle personenbezogenen Daten des Betroffenen
- Bereitstellung: Per E-Mail oder sicherem Download-Link

---

## 7. Berichtigung (Art. 16 DSGVO)

- Korrekturanfragen an: [datenschutz@stickwerk-studio.de] (Platzhalter)
- Umsetzung innerhalb von 30 Tagen
- Benachrichtigung über Korrektur an betroffene Person

---

## 8. Auftragsverarbeiter

### 8.1 Supabase
- **Anbieter:** Supabase, Inc.
- **EU-Region:** Ja (Frankfurt)
- **AV-Vertrag:** Erforderlich - muss mit Supabase abgeschlossen werden
- **DPA:** https://supabase.com/docs/guides/platform/compliance/dpa
- **Zweck:** Datenbankhosting und Authentifizierung

### 8.2 Vercel/Hosting
- **Anbieter:** [Hosting-Anbieter einfügen]
- **EU-Region:** Prüfen
- **AV-Vertrag:** Erforderlich

---

## 9. Technische und organisatorische Maßnahmen

### 9.1 Zugangsschutz
- Row Level Security (RLS) in Supabase aktiviert
- Admin-Bereich nur für authentifizierte Admins
- Service Role Key nur serverseitig

### 9.2 Verschlüsselung
- HTTPS/TLS für alle Verbindungen
- Verschlüsselung at rest in Supabase

### 9.3 Protokollierung
- Audit-Logs für Datenbankänderungen
- Server-Logs für Sicherheitsereignisse

---

## 10. Cookie-/Tracking-Hinweis

**Aktuell:** Keine Cookies oder Tracking-Tools verwendet.

Falls in ZukunftCookies eingesetzt werden:
- Einwilligungspflichtig (Cookie Consent)
- Technisch notwendige Cookies: Keine Einwilligung nötig
- Analyse/Marketing Cookies: Einwilligung erforderlich

---

## 11. Datenschutzseite

Die Datenschutzseite unter `/datenschutz` muss enthalten:
- Verantwortlicher
- Datenschutzbeauftragter (falls benannt)
- Erhobene Daten und Zwecke
- Rechtsgrundlagen
- Speicherdauer
- Betroffenenrechte
- Beschwerderecht
- Kontaktdaten

---

## 12. Sicherheitshinweise

- **Service Role Key:** Niemals im Frontend oder in Client-Komponenten
- **Supabase Anon Key:** Nur für public reads (falls gewünscht)
- **API Routes:** Validierung mit Zod
- **Fehlerbehandlung:** Keine Stacktraces an Client
- **Logging:** Keine personenbezogenen Daten in Logs

---

## 13. Offene Punkte

- [ ] AV-Vertrag mit Supabase abschließen
- [ ] Datenschutzbeauftragten benennen (falls erforderlich)
- [ ] Impressum aktualisieren
- [ ] Datenschutzerklärung finalisieren
- [ ] Cookie Consent einbauen (falls nötig)
- [ ] Finale rechtliche Prüfung durch Anwalt

---

## 14. Haftungsausschluss

Diese Checkliste dient als Grundlage und ersetzt keine rechtliche Beratung.

**DSGVO-orientiert vorbereitet, finale rechtliche Prüfung erforderlich.**
