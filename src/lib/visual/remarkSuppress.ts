
export function remarkSuppressDuplicateIdentity() {
  return (tree: any, file: any) => {
    const nodesToRemove: number[] = [];
    
    // Look for heading matching chapter title.
    const expectedTitle = (file?.data?.astro?.frontmatter?.title || '').toLowerCase().replace(/[\u200B-\u200D\uFEFF\s]/g, '').trim();
    const expectedSubtitle = (file?.data?.astro?.frontmatter?.subtitle || '').toLowerCase().replace(/[\u200B-\u200D\uFEFF\s]/g, '').trim();
    
    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      
      // Skip and preserve HTML comments (do not stop scanning)
      if (node.type === 'html' && node.value.trim().startsWith('<!--')) {
        continue;
      }

      if (node.type === 'heading' || node.type === 'paragraph') {
        const rawText = getNodeText(node);
        const normalizedText = rawText.toLowerCase().replace(/[\u200B-\u200D\uFEFF\s]/g, '').trim();
        
        if (normalizedText) {
          let isMatch = false;
          
          if (normalizedText.startsWith('chương')) {
            isMatch = true;
          } else if (expectedTitle && normalizedText.includes(expectedTitle)) {
            isMatch = true;
          } else if (expectedSubtitle && normalizedText.includes(expectedSubtitle)) {
            isMatch = true;
          }

          if (isMatch) {
            nodesToRemove.push(i);
          } else {
            // Found a text node that DOES NOT match identity -> Genuine content starts
            break;
          }
        }
      } else {
         // Found something else (list, thematic break, etc.) -> genuine content starts
         break;
      }
    }
    
    // Remove nodes in reverse order
    for (let i = nodesToRemove.length - 1; i >= 0; i--) {
      tree.children.splice(nodesToRemove[i], 1);
    }
  };
}

function getNodeText(node: any): string {
  let text = '';
  if (node.value) {
    text += node.value;
  }
  if (node.children) {
    node.children.forEach((child: any) => {
      text += getNodeText(child);
    });
  }
  return text;
}
