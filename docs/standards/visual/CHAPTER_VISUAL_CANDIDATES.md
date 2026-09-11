# BVC CHAPTER 13 VISUAL CANDIDATE MANIFEST

**Provenance:**
- Engine Version: SVOE V1.1 FINAL
- Canonical Standard: `/docs/standards/visual/BVC_MASTER_VISUAL_DESIGN_V1.0.md`
- Prompt-ID: `#000004`
- Prompt-Title: BVC MASTER VISUAL ENGINE — SVOE V1.1 FINAL / TEXT-ONLY PRESERVATION + CHAPTER 13 UPDATE
- Chapter Target: Chapter 13 (`13-tu-duy-paecs.md`)
- Chapter Visual Budget: Max 5 Approved Visuals

---

## Executive Summary & Visual Budget

| Total Code Blocks Scanned | Visual Candidates Identified | Approved Visuals | Preserved as TEXT_ONLY | Chapter Budget Utilization |
| :--- | :--- | :--- | :--- | :--- |
| 52 | 14 | **5** | 47 | **5 / 5 (100% - Fully Compliant)** |

---

## Approved Visuals (Max 5 Budget Allocation)

### 1. Candidate `V13-01`
- **Visual ID:** `V13-01`
- **Source Section:** *Tôi đã từng nghĩ model mạnh hơn sẽ giải quyết mọi thứ* (Line ~107)
- **Extracted Semantic Structure:**
  ```text
  AI Capability
  ≠
  Project Continuity
  ```
- **Semantic Class:** `SEMANTIC_CONTRAST`
- **Recommended Grammar:** `VG-COMPARISON`
- **Reason for Visualization:** Foundational philosophical thesis of Chapter 13. Visually crystallizes the distinction between raw model capability and long-term system continuity.
- **Confidence:** 0.98
- **Visual Value:** `HIGH`
- **Decision:** `APPROVED`

---

### 2. Candidate `V13-02`
- **Visual ID:** `V13-02`
- **Source Section:** *Engineering Method: Trọng tâm thực sự của project* (Line ~244)
- **Extracted Semantic Structure:**
  ```text
  Project
  ↓
  Engineering Method
  ↓
  Semantic Contract
  ↓
  Executor Adapter
  ↓
  AI Executor
  ```
- **Semantic Class:** `ARCHITECTURE`
- **Recommended Grammar:** `VG-ARCH-TOPDOWN`
- **Reason for Visualization:** Primary hierarchical architecture of the chapter. Clarifies the chain of delegation from Project down to AI Executor through rigid contracts.
- **Confidence:** 0.96
- **Visual Value:** `HIGH`
- **Decision:** `APPROVED`

---

### 3. Candidate `V13-03`
- **Visual ID:** `V13-03`
- **Source Section:** *State Compatibility trở thành cực kỳ quan trọng* (Line ~483)
- **Extracted Semantic Structure:**
  ```text
  Capability
  ↓
  State Compatibility
  ↓
  Verification
  ```
- **Semantic Class:** `FLOW`
- **Recommended Grammar:** `VG-FLOW`
- **Reason for Visualization:** Core evaluation pipeline demonstrating that capability without state compatibility and independent verification is insufficient.
- **Confidence:** 0.93
- **Visual Value:** `HIGH`
- **Decision:** `APPROVED`

---

### 4. Candidate `V13-04`
- **Visual ID:** `V13-04`
- **Source Section:** *Executor Adapter: Lớp cách ly giữa Method và Model* (Line ~666)
- **Extracted Semantic Structure:**
  ```text
  ENGINEERING METHOD
          │
          ↓
  SEMANTIC CONTRACT
          │
  ┌───────┼───────┐
  ↓       ↓       ↓
  Gemini Adapter  DeepSeek Adapter  Executor C
  ↓       ↓       ↓
  Gemini  DeepSeek  Executor C
  ```
- **Semantic Class:** `ARCHITECTURE`
- **Recommended Grammar:** `VG-ARCH-FANOUT`
- **Reason for Visualization:** Demonstrates polymorphic executor substitution: multiple AI models plugged into a single Semantic Contract via isolation adapters.
- **Confidence:** 0.97
- **Visual Value:** `HIGH`
- **Decision:** `APPROVED`

---

### 5. Candidate `V13-05`
- **Visual ID:** `V13-05`
- **Source Section:** *Quyền hạn thuộc về ai?* (Line ~941)
- **Extracted Semantic Structure:**
  ```text
  DISCOVERY
  ↓
  PROPOSAL
  ↓
  AUTHORIZED EXECUTION
  ↓
  VERIFICATION
  ↓
  STATE UPDATE
  ```
- **Semantic Class:** `FLOW`
- **Recommended Grammar:** `VG-FLOW`
- **Reason for Visualization:** The 5-stage controlled autonomy lifecycle governing multi-executor proposals transitioning into authorized state updates.
- **Confidence:** 0.94
- **Visual Value:** `HIGH`
- **Decision:** `APPROVED`

---

## Suppressed / Rejected Candidates (Preserved as TEXT_ONLY)

### Candidate `V13-06` (Specification Block)
- **Visual ID:** `V13-06`
- **Source Section:** *Độc lập với Model nghĩa là gì?* (Line ~754)
- **Content Snippet:** `engineering_method: id: ENERIX-EM version: "1.2" commit: af82d1...`
- **Semantic Class:** `SPECIFICATION`
- **Recommended Grammar:** `VG-SPEC`
- **Suppression Reason:** Rule 2.A & Rule 12: Engineering Method spec blocks default to TEXT_ONLY to prevent visual clutter; code representation is cleaner and more readable.
- **Visual Value:** `LOW`
- **Decision:** `TEXT_ONLY`

### Candidate `V13-07` (Operational Permission List)
- **Visual ID:** `V13-07`
- **Source Section:** *Quyền hạn thuộc về ai?* (Line ~1030)
- **Content Snippet:** `Process Engine \n Allowed: - inspect files - modify implementation - run tests...`
- **Semantic Class:** `SPECIFICATION`
- **Recommended Grammar:** `VG-SPEC`
- **Suppression Reason:** Rule 2.B & Rule 12: Operational permission lists are natural reading text; converting to card/boxes reduces reading rhythm.
- **Visual Value:** `LOW`
- **Decision:** `TEXT_ONLY`

### Candidate `V13-08` (Short Executor Sequence)
- **Visual ID:** `V13-08`
- **Source Section:** *Executor Profile: Chọn AI theo bài toán* (Line ~840)
- **Content Snippet:** `Executor A → Analyze \n Executor B → Implement...`
- **Semantic Class:** `FLOW`
- **Recommended Grammar:** `VG-FLOW`
- **Suppression Reason:** Rule 2.C & Rule 12: Short executor sequence lacking comprehensive architectural depth; visual budget allocated to V13-04.
- **Visual Value:** `LOW`
- **Decision:** `TEXT_ONLY`

### Candidate `V13-09` (State Snapshot Fragment)
- **Visual ID:** `V13-09`
- **Source Section:** *State Compatibility trở thành cực kỳ quan trọng* (Line ~539)
- **Content Snippet:** `Current State: \n DATABASE MIGRATION = IMPLEMENTED \n DATABASE`
- **Semantic Class:** `SEMANTIC_STATE`
- **Recommended Grammar:** `VG-STATE`
- **Suppression Reason:** Chapter visual budget capped at 5; prioritized core structural architectures (V13-01 to V13-05).
- **Visual Value:** `MEDIUM`
- **Decision:** `TEXT_ONLY`

### Candidates `V13-10` to `V13-14` (Trivial 2-element transitions)
- **Content Snippets:** `RUN-010 Gemini`, `Prompt ↓ Interface`, `One Method ↓ Multiple Executors`, `Capability ↓ Verification`
- **Semantic Class:** `FLOW`
- **Suppression Reason:** Rule 21: Low-value visual suppression. Trivial 2-line transitions add no architectural comprehension.
- **Visual Value:** `LOW`
- **Decision:** `TEXT_ONLY`
