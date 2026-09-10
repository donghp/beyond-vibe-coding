export function remarkBvcVisual() {
  return (tree: any) => {
    function traverse(node: any) {
      if (node.type === 'containerDirective' && node.name === 'bvc-visual') {
        const type = node.attributes?.type || '';
        const id = node.attributes?.id || '';
        const content = getNodeText(node);

        node.type = 'html';
        node.value = `<div class="bvc-visual-placeholder" data-type="${type}" data-id="${id}">${escapeHtml(content)}</div>`;
        node.children = [];
        return;
      }

      if (node.children) {
        node.children.forEach(traverse);
      }
    }

    traverse(tree);
  };
}

function getNodeText(node: any): string {
  let text = '';
  if (node.value) {
    text += node.value;
  }
  if (node.children) {
    node.children.forEach((child: any) => {
      if (child.type === 'text') {
        text += child.value;
      } else if (child.type === 'paragraph') {
        text += getNodeText(child) + '\n';
      } else if (child.type === 'break') {
        text += '\n';
      } else {
        text += getNodeText(child);
      }
    });
  }
  return text;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
