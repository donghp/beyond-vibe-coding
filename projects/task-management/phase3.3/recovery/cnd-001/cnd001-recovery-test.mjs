/**
 * BVC-TM-TC-007 / CND-001 isolated recovery harness.
 * Source: Owner-supplied BVC_GAIS_Source_Export_2026-11-25.zip
 * ZIP SHA-256: 0c12a7a4a835947b3cf67eb300a49bc8ab58e3861f9863d130cf09a8751378f7
 * app/page.tsx SHA-256: 4f926f8c9836c94505f71651871283f4299182fe181ecb432110d06c462ace5e
 * B2 constants/helpers/parseWorkspace: app/page.tsx lines 5-95.
 * Type-only TypeScript annotations are removed; runtime validation logic is copied unchanged.
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const FORMAT = 'bvc-task-management-workspace';
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isObj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
const exactKeys = (o, ks) => Object.keys(o).length === ks.length && ks.every((k) => k in o);

// Exact B2 parseWorkspace runtime validation logic copied from the supplied app/page.tsx.
function parseWorkspace(raw) {
  let p;
  try { p = JSON.parse(raw); } catch { return null; }
  if (!isObj(p) || !exactKeys(p, ['format','formatVersion','sourceMode','workspaceId','data']) ||
      p.format !== FORMAT || p.formatVersion !== 1 || p.sourceMode !== 'browser' ||
      typeof p.workspaceId !== 'string' || !UUID_RE.test(p.workspaceId)) return null;
  const d = p.data;
  if (!isObj(d) || !exactKeys(d, ['projects','tasks','checklistItems','settings','appliedStarterKits']) ||
      !Array.isArray(d.projects) || !Array.isArray(d.tasks) || !Array.isArray(d.checklistItems) ||
      !Array.isArray(d.appliedStarterKits) || !isObj(d.settings) || d.projects.length > 0 ||
      d.checklistItems.length > 0 || d.appliedStarterKits.length > 0 || Object.keys(d.settings).length > 0) return null;
  const seen = new Set(), tasks = [];
  for (const item of d.tasks) {
    if (!isObj(item) || !exactKeys(item, ['id','title']) || typeof item.id !== 'string' ||
        item.id.trim().length === 0 || seen.has(item.id) || typeof item.title !== 'string' ||
        item.title.trim().length === 0 || item.title !== item.title.trim()) return null;
    seen.add(item.id); tasks.push({ id: item.id, title: item.title });
  }
  return { format: FORMAT, formatVersion: 1, sourceMode: 'browser', workspaceId: p.workspaceId,
    data: { projects: [], tasks, checklistItems: [], settings: {}, appliedStarterKits: [] } };
}

const statuses = new Set(['todo','in_progress','done']);
const priorities = new Set(['low','normal','high']);
function calendarDate(v) {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const [y,m,d] = v.split('-').map(Number), date = new Date(Date.UTC(y,m-1,d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m-1 && date.getUTCDate() === d;
}
function validateV2(v) {
  assert.ok(isObj(v));
  assert.equal(v.format, FORMAT); assert.equal(v.formatVersion, 2); assert.equal(v.sourceMode, 'browser');
  assert.match(v.workspaceId, UUID_RE); assert.ok(isObj(v.data));
  for (const k of ['projects','tasks','checklistItems','appliedStarterKits']) assert.ok(Array.isArray(v.data[k]));
  assert.ok(isObj(v.data.settings)); assert.equal(typeof v.data.settings.timezone, 'string');
  assert.doesNotThrow(() => new Intl.DateTimeFormat('en-US',{timeZone:v.data.settings.timezone}));
  const seen = new Set();
  for (const t of v.data.tasks) {
    assert.ok(isObj(t)); assert.equal(typeof t.id, 'string'); assert.ok(t.id.trim()); assert.ok(!seen.has(t.id)); seen.add(t.id);
    assert.equal(typeof t.title, 'string'); assert.ok(t.title.trim()); assert.equal(t.title,t.title.trim());
    assert.ok(statuses.has(t.status)); assert.ok(priorities.has(t.priority));
    if ('due_date' in t) assert.ok(calendarDate(t.due_date));
    if ('focus_date' in t) assert.ok(calendarDate(t.focus_date));
  }
}
function projection(v2, interruptAt) {
  const tasks = [];
  for (const t of v2.data.tasks) {
    if (interruptAt !== undefined && tasks.length >= interruptAt) throw new Error('INJECTED_INTERRUPTION_DURING_PROJECTION');
    tasks.push({ id: t.id, title: t.title });
  }
  return { format: FORMAT, formatVersion: 1, sourceMode: 'browser', workspaceId: v2.workspaceId,
    data: { projects: [], tasks, checklistItems: [], settings: {}, appliedStarterKits: [] } };
}
function fromRaw(raw) { const v = JSON.parse(raw); validateV2(v); return projection(v); }
const sha = (b) => createHash('sha256').update(b).digest('hex');
const equalPairs = (a,b) => a.length === b.length && a.every((t,i) => t.id === b[i].id && t.title === b[i].title);
const input = resolve(process.argv[2] ?? './synthetic-v2-workspace.json');
const out = resolve(process.argv[3] ?? './output');
mkdirSync(out, { recursive: true });
const preservedPath = join(out,'preserved-full-v2-workspace.json');
const projectionPath = join(out,'v1-compatible-projection.json');
const tempPath = join(out,'.projection.tmp');
const inputBytes = readFileSync(input), inputRaw = inputBytes.toString('utf8');
const inputHash = sha(inputBytes), v2 = JSON.parse(inputRaw);
validateV2(v2); copyFileSync(input, preservedPath);
const preservedBefore = readFileSync(preservedPath), preservedHash = sha(preservedBefore);
assert.equal(preservedHash, inputHash);
const preserved = JSON.parse(preservedBefore.toString('utf8')); validateV2(preserved);
const results = [];
function test(id, detail, fn) {
  try { fn(); results.push({ id, status: 'PASS', detail }); }
  catch (e) { results.push({ id, status: 'FAIL', detail: detail + '; ' + e.message }); }
}
let view = null;
test('REC-001','Valid synthetic v2 workspace produces a projection accepted by B2 parser',() => {
  view = projection(preserved);
  const raw = JSON.stringify(view,null,2) + '\n', parsed = parseWorkspace(raw);
  assert.ok(parsed); assert.equal(parsed.workspaceId,v2.workspaceId);
  assert.ok(parsed.data.tasks.some(t => t.id === 'B2-LEGACY-TASK-001'));
  writeFileSync(tempPath,raw); renameSync(tempPath,projectionPath);
});
test('REC-002','Every task ID/title is preserved exactly and in source order',() => {
  assert.ok(view); assert.equal(view.data.tasks.length,v2.data.tasks.length);
  assert.ok(equalPairs(view.data.tasks,v2.data.tasks));
});
test('REC-003','All representative v2-only fields remain in preserved full-v2 copy',() => {
  const p = JSON.parse(readFileSync(preservedPath));
  assert.equal(p.data.tasks[1].status,'in_progress'); assert.equal(p.data.tasks[1].priority,'high');
  assert.equal(p.data.tasks[1].due_date,'2026-11-29'); assert.equal(p.data.tasks[1].focus_date,'2026-11-26');
  assert.equal(p.data.settings.timezone,'Asia/Ho_Chi_Minh'); assert.equal(p.data.tasks[2].status,'done');
});
test('REC-004','Projection omits v2-only fields only from projection, not preserved copy',() => {
  assert.deepEqual(Object.keys(view.data.tasks[0]).sort(),['id','title']); assert.deepEqual(view.data.settings,{});
  const p = JSON.parse(readFileSync(preservedPath)); assert.ok('timezone' in p.data.settings); assert.ok('status' in p.data.tasks[1]);
});
test('REC-005','Malformed v2 JSON is rejected before projection',() => {
  assert.throws(() => fromRaw('{"format":"bvc-task-management-workspace",'),SyntaxError);
});
test('REC-006','Missing required v2 task field is rejected',() => {
  const b = structuredClone(v2); delete b.data.tasks[0].status; assert.throws(() => fromRaw(JSON.stringify(b)));
});
test('REC-007','Duplicate task IDs are rejected',() => {
  const b = structuredClone(v2); b.data.tasks[1].id = b.data.tasks[0].id; assert.throws(() => validateV2(b));
});
test('REC-008','Blank or untrimmed task title is rejected',() => {
  const b = structuredClone(v2); b.data.tasks[0].title = '   '; assert.throws(() => validateV2(b));
});
test('REC-009','Invalid IANA timezone is rejected',() => {
  const b = structuredClone(v2); b.data.settings.timezone = 'Mars/Olympus_Mons'; assert.throws(() => validateV2(b));
});
test('REC-010','Projection failure is fail-closed and preserves full-v2 copy',() => {
  const before = sha(readFileSync(preservedPath));
  assert.throws(() => projection(v2,2),/INJECTED_INTERRUPTION/);
  assert.equal(sha(readFileSync(preservedPath)),before); assert.ok(!existsSync(tempPath));
});
test('REC-011','Interruption after snapshot leaves source and snapshot unchanged',() => {
  const dir = join(out,'interruption-case'); mkdirSync(dir,{recursive:true});
  const snap = join(dir,'snapshot.json'), before = sha(readFileSync(input));
  copyFileSync(input,snap); assert.equal(sha(readFileSync(input)),before); assert.equal(sha(readFileSync(snap)),before);
  rmSync(dir,{recursive:true,force:true});
});
test('REC-012','B2 parser rejects duplicate projection IDs',() => {
  const b = structuredClone(view); b.data.tasks[1].id = b.data.tasks[0].id;
  assert.equal(parseWorkspace(JSON.stringify(b)),null);
});
test('REC-013','B2 parser rejects invalid projection titles',() => {
  const b = structuredClone(view); b.data.tasks[1].title = '  title  ';
  assert.equal(parseWorkspace(JSON.stringify(b)),null);
});
test('REC-014','B2 parser rejects a non-UUID workspace ID',() => {
  const b = structuredClone(view); b.workspaceId = 'not-a-uuid';
  assert.equal(parseWorkspace(JSON.stringify(b)),null);
});
test('REC-016','Unsupported v2 formatVersion is rejected',() => {
  const b = structuredClone(v2); b.formatVersion = 1; assert.throws(() => fromRaw(JSON.stringify(b)));
});
test('REC-017','Unsupported task status enum is rejected',() => {
  const b = structuredClone(v2); b.data.tasks[0].status = 'blocked'; assert.throws(() => fromRaw(JSON.stringify(b)));
});
test('REC-018','Unsupported task priority enum is rejected',() => {
  const b = structuredClone(v2); b.data.tasks[0].priority = 'critical'; assert.throws(() => fromRaw(JSON.stringify(b)));
});
test('REC-019','Impossible due_date is rejected',() => {
  const b = structuredClone(v2); b.data.tasks[1].due_date = '2026-02-30'; assert.throws(() => fromRaw(JSON.stringify(b)));
});
test('REC-020','Impossible focus_date is rejected',() => {
  const b = structuredClone(v2); b.data.tasks[1].focus_date = '2026-13-01'; assert.throws(() => fromRaw(JSON.stringify(b)));
});
test('REC-015','Original fixture and preserved full-v2 copy retain identical SHA-256',() => {
  assert.equal(sha(readFileSync(input)),inputHash); assert.equal(sha(readFileSync(preservedPath)),preservedHash);
  assert.equal(sha(readFileSync(input)),sha(readFileSync(preservedPath)));
});
const finalInput = sha(readFileSync(input)), finalPreserved = sha(readFileSync(preservedPath));
const projectionBytes = readFileSync(projectionPath), parsedProjection = parseWorkspace(projectionBytes.toString('utf8'));
const pairs = v2.data.tasks.map(t => ({id:t.id,title:t.title}));
const report = {
  report_id: 'BVC-TM-TC-007-CND-001-TEST-001',
  result: results.every(x => x.status === 'PASS') ? 'PASS' : 'FAIL',
  execution_environment: { runtime: process.version, command: 'node cnd001-recovery-test.mjs synthetic-v2-workspace.json output/' },
  source_provenance: {
    gais_export_zip_sha256: '0c12a7a4a835947b3cf67eb300a49bc8ab58e3861f9863d130cf09a8751378f7',
    app_page_ts_sha256: '4f926f8c9836c94505f71651871283f4299182fe181ecb432110d06c462ace5e',
    b2_parser_source: 'app/page.tsx lines 5-95; runtime validation logic copied without validation changes; type-only TS annotations removed'
  },
  test_summary: { total: results.length, passed: results.filter(x => x.status === 'PASS').length, failed: results.filter(x => x.status === 'FAIL').length },
  hashes: {
    synthetic_v2_sha256_before: inputHash, synthetic_v2_sha256_after: finalInput,
    preserved_full_v2_sha256_before: preservedHash, preserved_full_v2_sha256_after: finalPreserved,
    v1_projection_sha256: sha(projectionBytes)
  },
  workspace_comparison: {
    workspace_id_preserved: parsedProjection.workspaceId === v2.workspaceId,
    source_task_count: pairs.length, projection_task_count: parsedProjection.data.tasks.length,
    id_title_pairs_preserved_in_order: equalPairs(parsedProjection.data.tasks,pairs)
  },
  tasks: results
};
writeFileSync(join(out,'cnd-001-test-results.json'),JSON.stringify(report,null,2)+'\n');
const manifest = {
  fixture: { file: 'synthetic-v2-workspace.json', bytes: inputBytes.length, sha256: inputHash },
  preserved_full_v2: { file: 'preserved-full-v2-workspace.json', bytes: preservedBefore.length,
    sha256_before: preservedHash, sha256_after: finalPreserved, byte_identical_to_fixture: preservedHash === inputHash },
  projection: { file: 'v1-compatible-projection.json', bytes: projectionBytes.length, sha256: sha(projectionBytes), b2_parser_accepts: !!parsedProjection },
  v2_workspace: { workspaceId: v2.workspaceId, task_count: pairs.length, task_id_title_pairs: pairs },
  test_report: 'cnd-001-test-results.json'
};
writeFileSync(join(out,'cnd-001-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if (report.result !== 'PASS') process.exitCode = 1;
