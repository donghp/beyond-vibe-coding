
# BVC Task Management — Security & Environment Design v0.1

**Document ID:** BVC-TM-SEC-001  
**Phase:** 3.2  
**Version:** 0.1.1  
**Status:** Product Owner Accepted — Phase 3.2 Security Design Baseline; implementation verification deferred to Phase 3.3  
**Parent baseline:** BVC-TM-PD-001 Product Definition v0.2.0  
**Date:** 2026-11-04

## 1. Purpose

Define the minimum security boundary for Beginner, Intermediate and Advanced.

Security requirements become more sophisticated as the learner adds hosted identity, database access and public deployment.

This document defines design requirements. It does not claim that RLS, secret scanning, deployment controls or runtime security tests have already been implemented or passed.

## 2. Security by learning level

| Area | Beginner | Intermediate | Advanced |
|---|---|---|---|
| App runtime | GAIS Preview | GAIS Preview | Localhost + selected hosting provider |
| User identity | None | Supabase Auth | Supabase Auth |
| Persistence | Browser JSON workspace (`localStorage`) | Supabase PostgreSQL | Supabase PostgreSQL |
| Data isolation | Browser profile boundary | `user_id` + RLS | `user_id` + RLS + environment separation |
| Secrets | No application secret required | Public Supabase key only in client | Environment variables; privileged keys server-only |
| Deployment | GAIS Preview | Preview / learning test | Hosting Preview + Production |
| Test emphasis | Validation and backup integrity | Auth and RLS tests | Security, deployment, migration and rollback |

## 3. Authentication model

- Beginner does not require sign-in.
- Intermediate and Advanced use Supabase Auth.
- Each authenticated account owns its own personal workspace.
- This does not introduce team workspaces, invitations, shared tasks or role-based collaboration.
- Email/password or magic-link authentication may be selected for implementation; the method and recovery flow remain OPEN under canonical decision DR-019 in the [Phase 3 Product / UX Decision Register](../../../governance/PHASE3_PRODUCT_UX_DECISION_REGISTER_V0.1.md).
- Do not select or implement an Auth method until the Product Owner records the DR-019 decision before the first Intermediate Auth task.
- Do not create a custom password table or store passwords in application data.

## 4. RLS requirements

Supabase documents that tables in exposed schemas without RLS can be readable or writable by roles with applicable grants.

Enable RLS on every exposed application table and verify grants and policies together before allowing authenticated users to access the data.

Mandatory design rules:

1. Enable RLS on `user_settings`, `projects`, `tasks`, `task_checklist_items` and `applied_starter_kits`.
2. Use `authenticated` as the normal client role for personal data.
3. Every owner-scoped row carries `user_id`.
4. SELECT policy permits only `user_id = auth.uid()`.
5. INSERT policy uses `WITH CHECK (user_id = auth.uid())`.
6. UPDATE policy applies both `USING (user_id = auth.uid())` and `WITH CHECK (user_id = auth.uid())`.
7. DELETE policy permits only `user_id = auth.uid()`.
8. Child-row policies must prove that the referenced parent belongs to the same authenticated user.
9. Project references must not allow a user to attach their task to another user's project.
10. Do not assume policies remove broad table grants; review table privileges explicitly.

Illustrative pattern only (adapt and test per table):

```sql
alter table public.tasks enable row level security;

create policy "tasks_select_own"
on public.tasks
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "tasks_insert_own"
on public.tasks
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "tasks_update_own"
on public.tasks
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "tasks_delete_own"
on public.tasks
for delete
to authenticated
using (user_id = (select auth.uid()));
```

This snippet is an illustrative policy pattern. It is not a complete migration and is not evidence that any RLS policy has been applied or tested.

## 5. Key and secret management

### Browser-safe configuration

The frontend may contain:

- Supabase project URL.
- Supabase publishable/anon key intended for browser clients.

These values are not substitutes for authorization. RLS must enforce data access.

### Server-only secrets

Never commit or bundle:

- Supabase `service_role` key or secret key.
- Database password or privileged connection string.
- Vercel token.
- GitHub personal access token.
- Any third-party API secret.

If future server-side code needs a privileged key, store it only in the platform's server-side environment or secret manager and expose a narrowly scoped endpoint. Do not route privileged operations through client code.

### Repository hygiene

- Commit `.env.example` with variable names and safe placeholders only.
- Ignore `.env`, `.env.local`, `.env.*.local` and secret files.
- Rotate any credential accidentally committed; deleting the file in a later commit is not sufficient.
- Use synthetic data in public issues, screenshots, tests and learning labs.
- Verify the final client bundle and repository history for accidental secret exposure before release.

## 6. Environments

Recommended separation:

| Environment | Purpose | Database |
|---|---|---|
| GAIS Preview / Beginner | Build and test browser persistence | None |
| Intermediate practice | Teach Auth/schema/RLS | Supabase practice project |
| Advanced Local | Local code test | Supabase development project or approved local Supabase stack |
| Hosting Preview | Validate proposed changes before release | Development/test Supabase project |
| Hosting Production | Live personal non-commercial app | Production Supabase project |

A separate production project is preferred when plan limits and budget allow.

If readers use one Supabase Free project for learning, the guide must clearly warn them not to treat it as robust staging/production separation.

## 7. Privacy and data handling

- Tell users which data is browser-local and which is stored in Supabase.
- Beginner data does not leave the browser through the application's persistence layer.
- Intermediate/Advanced data is transmitted to Supabase over HTTPS and associated with the signed-in account.
- Collect only data required for task management.
- Do not include personal, customer or confidential records in public sample datasets.
- Exported JSON backups may contain personal work information; warn users to store them securely.
- Do not claim that the Supabase Free plan provides downloadable automatic database backups.
- Do not claim that browser-local data is automatically synchronized or cloud-backed up.

## 8. Backup and recovery

- Provide application-level JSON export/import across all levels.
- Validate backup before import and require confirmation before replacement.
- For Supabase Free, user data export is a practical portable backup; it is not a substitute for provider-managed disaster recovery.
- Before upgrading to commercial use, define a backup schedule, retention, recovery point objective (RPO) and recovery time objective (RTO).
- Test restore, not merely export.
- Record actual backup and restore verification evidence during implementation.

## 9. Required security verification

The following checks are required before release. They are design acceptance requirements, not completed test results.

- User A cannot SELECT User B's tasks/projects.
- User A cannot INSERT a task with User B's `user_id`.
- User A cannot UPDATE a row to change its `user_id`.
- User A cannot DELETE User B's rows.
- A user cannot attach a task to a project owned by another user.
- A user cannot access another user's checklist items or settings.
- Unauthenticated access is denied for personal data tables.
- No service-role key appears in browser bundles, source maps, Git history or client logs.
- Invalid import does not corrupt existing records.
- Logs and error messages do not disclose secrets or unnecessary personal data.

## 10. References

- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase production checklist: https://supabase.com/docs/guides/deployment/going-into-prod
- Google AI Studio secrets and Build mode: https://ai.google.dev/gemini-api/docs/aistudio-build-mode

---

**BEYOND VIBE CODING — Build & Learn**  
*Build something useful. Use it every day. Learn by doing.*
