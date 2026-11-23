# Research #001 — Why Software Is Slow

## From Big O to CPU Cache and Memory Latency

**Series:** Beyond Vibe Coding · Computer Science Research  
**Author:** Dong Hong  
**Status:** Initial research draft

This article connects algorithmic growth, memory locality, cache behavior, and processor execution to explain why implementations with the same Big O can run at different speeds.

- [Read the full research article](./article.md)
- [Experiment source code](./code/matrix_walk.cpp)
- [Visual guide: Memory hierarchy](./images/memory-hierarchy.svg)
- [Visual guide: Access patterns](./images/access-patterns.svg)

**Domains:** Computational Thinking · Computer Architecture · Memory Systems · Software Performance Engineering

> Big O helps us reason about how work grows. Memory locality helps us understand how efficiently the processor obtains data. Measurement connects both to real performance.
