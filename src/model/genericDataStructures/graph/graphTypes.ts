type Edge<NodeType> = {
   startNode: NodeType,
   endNode: NodeType,
   isDirected?: boolean,
   weight?: number
};


interface GraphInterface<Node extends string | number> {
   readonly nodeList: Node[],
   readonly edgeList: ({ id: number } & Edge<Node>)[],
   getNeighborNodeListFor: (node: Node) => Node[],
   getListOfEdgesBetween: (node1: Node, node2: Node) => ({ id: number } & Edge<Node>)[]
}


export { Edge, GraphInterface };
