import fs from 'fs';
import path from 'path';
import { getAllTerms } from './authority';

export interface DriftFinding {
  chapter: string;
  term: string;
  variant: string;
  line: number;
  context: string;
}

/**
 * Scans all chapters for terminology drift.
 * Looks for variants/aliases used instead of canonical terms.
 */
export function scanForDrift(chaptersPath: string): DriftFinding[] {
  const findings: DriftFinding[] = [];
  const terms = getAllTerms();
  
  if (!fs.existsSync(chaptersPath)) return [];

  const files = fs.readdirSync(chaptersPath).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    const content = fs.readFileSync(path.join(chaptersPath, file), 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, lineIdx) => {
      terms.forEach(term => {
        // Check for aliases (excluding the canonical term itself)
        term.aliases.forEach(alias => {
          if (alias.length < 3) return; // Skip very short aliases to avoid noise
          
          // Case-insensitive search for alias
          const regex = new RegExp(`\\b${alias}\\b`, 'gi');
          let match;
          while ((match = regex.exec(line)) !== null) {
            // If the match is not already the canonical term
            if (match[0].toLowerCase() !== term.canonicalTerm.toLowerCase()) {
              findings.push({
                chapter: file,
                term: term.canonicalTerm,
                variant: match[0],
                line: lineIdx + 1,
                context: line.trim()
              });
            }
          }
        });
      });
    });
  });

  return findings;
}

/**
 * Validates terminology usage in the corpus.
 */
export function generateDriftReport(chaptersPath: string) {
  const findings = scanForDrift(chaptersPath);
  
  if (findings.length === 0) {
    return "TERM DRIFT: NONE DETECTED";
  }

  let report = "TERM DRIFT DETECTED\n\n";
  findings.forEach(f => {
    report += `Chapter: ${f.chapter}\n`;
    report += `Canonical Term: ${f.term}\n`;
    report += `Variant Found: ${f.variant}\n`;
    report += `Location: Line ${f.line}\n`;
    report += `Context: "${f.context}"\n`;
    report += `Suggested Action: Review and potentially replace with canonical term.\n`;
    report += `--------------------------------------------------\n`;
  });

  return report;
}
