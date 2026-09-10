export function remarkBvcDiagram() {
  return (tree: any) => {
    function traverse(node: any) {
      if (node.type === 'code' && node.lang === 'text') {
        const content = node.value || '';
        
        // Check if it looks like a diagram or flow (contains structural characters)
        // A simple flow usually contains downward arrows or box drawing characters.
        // We'll also just catch all `text` blocks that aren't empty, since in this book,
        // `text` blocks are used for process chains and ASCII architecture.
        if (content.includes('↓') || content.includes('┌') || content.includes('│') || content.trim().length > 0) {
          node.type = 'html';
          node.value = `<div class="bvc-visual-placeholder" data-type="text-diagram" data-id="">${escapeHtml(content)}</div>`;
          delete node.lang;
        }
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    }
    traverse(tree);
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
