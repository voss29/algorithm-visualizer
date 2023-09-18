type GraphGeneratorConfig = {
   nodeAmount: { min: number, max: number },
   edgesPerNode: { min: number, max: number }
   edgeWeight?: { min: number, max: number },
   allowRecursiveEdges?: boolean,
   isDirected?: 'yes' | 'mixed'
};


export { GraphGeneratorConfig };
