// The page template owns the single H1. Preserve imported article text while
// demoting any legacy Markdown H1 headings to H2 in the rendered HTML.
export default function remarkDemoteH1() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'heading' && node.depth === 1) node.depth = 2;
      if (node.children) node.children.forEach(visit);
    };
    visit(tree);
  };
}
