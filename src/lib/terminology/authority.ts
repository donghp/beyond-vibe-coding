import terms from '../../data/glossary/terms.json';
import categories from '../../data/glossary/categories.json';

export const BVC_TERMINOLOGY_VERSION = "1.0";

export interface VisualSemantics {
  colorRole: 'structure' | 'active-flow' | 'verified' | 'warning' | 'critical';
  diagramRoles: string[];
}

export interface GlossaryTerm {
  id: string;
  canonicalTerm: string;
  shortDefinition: string;
  definition: string;
  example?: string;
  whyItMatters?: string;
  category: string;
  status: 'proposed' | 'reviewed' | 'canonical' | 'deprecated' | 'rejected';
  aliases: string[];
  relatedTerms: string[];
  chapters: string[];
  visualSemantics?: VisualSemantics;
  contrastsWith?: string[];
}

export interface GlossaryCategory {
  id: string;
  name: string;
  description: string;
}

export function getAllTerms(): GlossaryTerm[] {
  return terms as GlossaryTerm[];
}

export function getAllCategories(): GlossaryCategory[] {
  return categories as GlossaryCategory[];
}

export function getTermById(id: string): GlossaryTerm | undefined {
  return getAllTerms().find(t => t.id === id);
}

export function getTermsByCategory(categoryId: string): GlossaryTerm[] {
  const category = getAllCategories().find(c => c.id === categoryId);
  if (!category) return [];
  return getAllTerms().filter(t => t.category === category.name);
}

export function resolveVisualSemantics(termId: string): VisualSemantics | undefined {
  const term = getTermById(termId);
  return term?.visualSemantics;
}

/**
 * Searches for a term by ID, canonical name, or alias.
 */
export function searchTerms(query: string): GlossaryTerm[] {
  const q = query.toLowerCase();
  return getAllTerms().filter(t => 
    t.id.toLowerCase().includes(q) ||
    t.canonicalTerm.toLowerCase().includes(q) ||
    t.aliases.some(a => a.toLowerCase().includes(q))
  );
}

/**
 * Validates the terminology registry for common errors.
 */
export function validateRegistry() {
  const ids = new Set();
  const errors: string[] = [];

  getAllTerms().forEach(t => {
    if (ids.has(t.id)) {
      errors.push(`Duplicate ID: ${t.id}`);
    }
    ids.add(t.id);

    // Validate related terms exist
    t.relatedTerms.forEach(relatedId => {
      if (!getTermById(relatedId)) {
        errors.push(`Term ${t.id} references non-existent related term: ${relatedId}`);
      }
    });
  });

  return {
    valid: errors.length === 0,
    errors
  };
}
