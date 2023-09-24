type Edge = {
   startNode: string,
   endNode: string,
   isDirected?: boolean,
   weight?: number
};


interface GraphInterface {
   readonly nodeList: string[],
   readonly edgeList: ({ id: number } & Edge)[],
   getNeighborNodeListFor: (node: string) => string[],
   getListOfEdgesBetween: (node1: string, node2: string) => ({ id: number } & Edge)[]
}


type GraphHighlightData = {
   nodeHighlightList: string[],
   edgeHighlightList: number[]
};


export { Edge, GraphInterface, GraphHighlightData };
