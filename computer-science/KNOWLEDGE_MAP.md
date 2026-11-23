# The Computer Science Knowledge Map

**Beyond Vibe Coding · Dong Hong**

This map organizes the research program from foundational reasoning to complex computing systems. It is a learning and research map, not a claim that every topic has already been covered.

## 01 · Computational Thinking
**Scope:** Problem decomposition, abstraction, representation, algorithms, correctness, complexity, recursion, invariants.  
**Guiding questions:** How do we turn a real problem into a computable model? How do we know an algorithm is correct? How does input size change resource requirements?  
**Prerequisites:** Basic programming and mathematical reasoning.  
**Research path:** Computational models → problem decomposition → algorithm correctness → asymptotic analysis → complexity limits.  
**Applied lens:** Translate ambiguous product requirements into precise, testable computational tasks.

## 02 · Data Structures & Algorithms
**Scope:** Arrays, linked lists, stacks, queues, hash tables, heaps, trees, graphs, sorting, searching, dynamic programming, greedy algorithms.  
**Guiding questions:** How does a structure organize information? What operations does it make efficient or expensive?  
**Prerequisites:** Computational Thinking.  
**Research path:** Sequential structures → associative structures → trees and heaps → graphs → algorithmic strategies → complexity analysis.  
**Applied lens:** Choose structures based on workload, operation mix, memory layout, and correctness requirements.

## 03 · Computer Architecture
**Scope:** CPU, instruction set architecture, registers, execution pipelines, branch prediction, superscalar execution, SIMD, accelerators.  
**Guiding questions:** How does source code become machine instructions? How does a processor execute them?  
**Prerequisites:** Basic binary representation and programming.  
**Research path:** Data representation → machine instructions → datapath → pipeline → speculation → parallel execution.  
**Applied lens:** Understand instruction cost, dependencies, vectorization, and hardware-specific bottlenecks.

## 04 · Memory Systems
**Scope:** Registers, cache, cache lines, RAM, virtual memory, paging, TLB, locality, memory consistency.  
**Guiding questions:** Why can accessing data dominate computation? How do locality and working-set size influence performance?  
**Prerequisites:** Computer Architecture.  
**Research path:** Memory hierarchy → cache operation → locality → virtual memory → address translation → concurrency and coherence.  
**Applied lens:** Diagnose cache behavior, memory pressure, allocation patterns, and data layout.

## 05 · Operating Systems
**Scope:** Processes, threads, scheduling, system calls, synchronization, deadlocks, file systems, I/O.  
**Guiding questions:** How does an OS share hardware between programs? What happens during a context switch?  
**Prerequisites:** Computer Architecture and basic programming.  
**Research path:** Process model → threads → scheduling → synchronization → virtual memory → I/O and file systems.  
**Applied lens:** Reason about resource ownership, concurrency bugs, latency, and operational behavior.

## 06 · Programming Languages & Compilers
**Scope:** Lexing, parsing, AST, type systems, intermediate representations, optimization, code generation, runtime, garbage collection, JIT.  
**Guiding questions:** How does source text become executable behavior? What guarantees do language and type systems provide?  
**Prerequisites:** Programming and discrete structures.  
**Research path:** Language semantics → parsing → AST → type checking → IR → optimization → code generation → runtime.  
**Applied lens:** Understand build pipelines, runtime overhead, language trade-offs, and debugging.

## 07 · Storage & Databases
**Scope:** Storage engines, pages, row/column layouts, indexes, B-trees, transactions, isolation, query planning, logging, replication.  
**Guiding questions:** How do databases find, store, update, and protect data efficiently?  
**Prerequisites:** Data Structures & Algorithms and basic OS concepts.  
**Research path:** Storage fundamentals → indexing → query execution → transactions → concurrency control → recovery.  
**Applied lens:** Design schemas and indexes, explain query plans, and reason about data integrity.

## 08 · Networking & Internet
**Scope:** Layering, Ethernet, IP, routing, TCP, UDP, DNS, TLS, HTTP, congestion control, latency, bandwidth.  
**Guiding questions:** How does data travel between processes and machines? Where does network delay come from?  
**Prerequisites:** Binary representation and basic OS concepts.  
**Research path:** Layered models → addressing and routing → transport → naming → security → application protocols.  
**Applied lens:** Diagnose network latency, protocol behavior, reliability, and API performance.

## 09 · Distributed Systems
**Scope:** Partial failure, time, ordering, consistency, replication, partitioning, consensus, coordination, fault tolerance.  
**Guiding questions:** What changes when components communicate over a network and can fail independently?  
**Prerequisites:** Networking, databases, concurrency.  
**Research path:** Failure models → time and ordering → replication → consistency → consensus → distributed transactions.  
**Applied lens:** Make explicit trade-offs around availability, consistency, recovery, and operations.

## 10 · Software Performance Engineering
**Scope:** Measurement, profiling, benchmarking, latency distributions, throughput, utilization, queuing, optimization, observability.  
**Guiding questions:** Where is the bottleneck, and what evidence shows it?  
**Prerequisites:** Algorithms, architecture, memory, OS, databases, and networking.  
**Research path:** Performance models → instrumentation → profiling → bottleneck analysis → controlled optimization → regression prevention.  
**Applied lens:** Optimize the measured system bottleneck, not the code that merely looks expensive.

## 11 · Security Foundations
**Scope:** Security properties, threat modeling, cryptography, authentication, authorization, key management, secure protocols, secure design.  
**Guiding questions:** What are we protecting, from whom, and under which assumptions?  
**Prerequisites:** Basic systems and networking.  
**Research path:** Security principles → threat models → cryptographic building blocks → identity and access → protocol security → system design.  
**Applied lens:** Define trust boundaries, least privilege, secure defaults, and verifiable controls.

## 12 · AI & Modern Computing
**Scope:** Linear algebra, probability, machine learning, neural networks, embeddings, transformers, GPUs, inference, RAG, agents, evaluation, serving.  
**Guiding questions:** How do modern AI systems represent, compute, retrieve, generate, and get evaluated?  
**Prerequisites:** Depth varies; common foundations include linear algebra, probability, algorithms, architecture, and systems.  
**Research path:** ML foundations → neural computation → transformer architecture → inference → retrieval and agents → evaluation and production systems.  
**Applied lens:** Build AI applications with measurable quality, explicit costs, system constraints, and human ownership.

## Cross-Domain Connections

- Algorithm complexity ↔ data structure choice ↔ memory locality.
- CPU execution ↔ cache behavior ↔ parallelism.
- Operating systems ↔ virtual memory ↔ process isolation.
- Database indexes ↔ trees ↔ storage pages ↔ I/O latency.
- TCP ↔ congestion control ↔ application latency.
- Distributed consistency ↔ replication ↔ failure recovery.
- Compiler optimization ↔ instruction execution ↔ cache behavior.
- Transformer attention ↔ matrix multiplication ↔ GPU memory bandwidth.
- RAG retrieval ↔ information retrieval ↔ evaluation methodology.
- Agent workflows ↔ state machines ↔ distributed execution and observability.

## Research Selection Rules

1. Start with prerequisites when a topic depends on foundations.
2. Prefer a narrow, answerable question to a broad survey.
3. Separate conceptual explanation from implementation-specific behavior.
4. When discussing performance, define workload, hardware, runtime, and measurements.
5. For AI systems, distinguish model capability from application/system behavior.
6. Return to engineering consequences: correctness, performance, cost, reliability, security, and maintainability.

**AI is a tool. Engineering is our capability.**  
**BEYOND VIBE CODING — DONG HONG**