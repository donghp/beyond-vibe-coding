# A1-01 — Screenshot Evidence Note

**Evidence ID:** A1-01  
**Evidence status:** OBSERVED — original screenshot supplied by the Human Owner and synchronized in the repository  
**Image:** [a1-01-gais-start-screen.png](../../../assets/screenshots/phase-a/a1-01-gais-start-screen.png)  
**Observed URL:** `aistudio.google.com/apps`

## Observed interface

- Google AI Studio header.
- EXPLORE: Playground, History.
- BUILD: New app (highlighted), My apps, Gallery.
- MANAGE: Dashboard, Documentation.
- Main heading: "Build your ideas with Gemini".
- Central prompt area: "Describe an app and let Gemini do the rest".
- Mode selector: "Default mode".
- The browser address bar shows `aistudio.google.com/apps`.

## What this evidence establishes

The actual supplied screenshot shows the GAIS Apps / Build starting screen. The **New app** entry is highlighted under **BUILD**, and the central prompt area is visible.

## Platform note

Google's Build mode documentation says web apps are the default. Android apps are selected separately from the platform picker. The visible **Default mode** control is not, by itself, evidence of an Android or WEB platform selection. Follow the platform controls actually shown by the current GAIS interface; do not infer a platform selection from the words "Default mode".

Reference: [Google AI Studio Build mode documentation](https://ai.google.dev/gemini-api/docs/aistudio-build-mode).

## What this evidence does not establish

It does not show that an app has been generated, that the scaffold exists, or that Preview, build, export, or deployment has been tested.

## Next action

Choose **New app**, then copy and run **BVCTM-PROMPT-0001 — Create the Initial BVC Task Management Web App Scaffold** in the visible prompt area. Capture the actual result as A1-02.
