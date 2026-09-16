# Data Model: RegulatoryDocument

```yaml
entity: RegulatoryDocument
type: repository-native schema
status: active
version: 1.0.0
```

## Description
Represents a legal instrument or regulatory document issued by a competent authority (Law, Decree, Decision, Circular).

## Schema Fields
- `document_id` (string): Unique identifier (e.g. `QD-42-2026`)
- `title` (string): Official Vietnamese title of the document
- `document_class` (enum): `law` | `decree` | `decision` | `circular` | `national-standard` | `international-standard` | `guidance`
- `issuing_authority` (string): Competent authority (e.g. `Thủ tướng Chính phủ`)
- `issued_date` (string, ISO 8601): Date of signing
- `effective_date` (string, ISO 8601): Date of taking legal effect
- `expiry_date` (string, ISO 8601 | null): Expiration date or `null` if active
- `file_path` (string): Relative path to source Markdown document
- `relationships` (array): List of amendment/supersession relationships
  - `type` (enum): `AMENDS` | `AMENDED_BY` | `SUPERSEDES` | `SUPERSEDED_BY` | `REFERENCES`
  - `target_document_id` (string)
