/* eslint-disable no-restricted-syntax */
import { cloneDeep } from 'lodash';
import { Edge, GraphInterface } from './graphTypes';


class Graph<Node extends string | number> implements GraphInterface<Node> {

   #nodeList: Node[];
   #edgeList: ({ id: number } & Edge<Node>)[];


   constructor(nodeList: Node[], edgeList: Edge<Node>[] = []) {
      if (!nodeList) {
         throw new Error('Parameter nodeList is missing');
      }

      if (!Array.isArray(nodeList)) {
         throw new Error('Parameter nodeList must be an array');
      }

      if (nodeList.length === 0) {
         throw new Error('Parameter nodeList must contain at least one node');
      }

      this.#nodeList = this.#initializeNodeList(nodeList);

      if (!Array.isArray(edgeList)) {
         throw new Error('Parameter edgeList must be an array');
      }

      if (this.#containsEdgeListUnknownNodes(edgeList)) {
         throw new Error('Parameter edgeList contains nodes that are not included in the nodeList');
      }

      this.#edgeList = this.#initializeEdgeList(edgeList);
   }


   get nodeList() {
      return cloneDeep(this.#nodeList);
   }


   get edgeList() {
      return cloneDeep(this.#edgeList);
   }


   getNeighborNodeListFor(node: Node) {
      if (this.#isNodeUnknown([node])) {
         throw new Error(`Node ${node} does not exist`);
      }

      const neighborNodeSet = new Set<Node>();

      for (const edge of this.#edgeList) {
         const isStartNode = node === edge.startNode;
         const isEndNodeOfUndirectedEdge = !edge.isDirected && node === edge.endNode;

         if (isStartNode) {
            neighborNodeSet.add(edge.endNode);
         }

         if (isEndNodeOfUndirectedEdge) {
            neighborNodeSet.add(edge.startNode);
         }
      }

      return [...neighborNodeSet];
   }


   getListOfEdgesBetween(node1: Node, node2: Node) {
      if (this.#isNodeUnknown([node1])) {
         throw new Error(`Node ${node1} does not exist`);
      }

      if (this.#isNodeUnknown([node2])) {
         throw new Error(`Node ${node2} does not exist`);
      }

      const resultList = this.#edgeList.filter(
         (edge) => {
            const isEdgeBetweenAB = edge.startNode === node1 && edge.endNode === node2;
            const isEdgeBetweenBA = edge.startNode === node2 && edge.endNode === node1;
            return isEdgeBetweenAB || (!edge.isDirected && isEdgeBetweenBA);
         }
      );

      return cloneDeep(resultList);
   }


   #containsEdgeListUnknownNodes(edgeList: Edge<Node>[]) {
      for (const edge of edgeList) {
         if (this.#isNodeUnknown([edge.startNode, edge.endNode])) {
            return true;
         }
      }
      return false;
   }


   #initializeNodeList(nodeList: Node[]) {
      const listWithoutDuplicates = [...new Set(nodeList)];
      return cloneDeep(listWithoutDuplicates);
   }


   #initializeEdgeList(edgeList: Edge<Node>[]) {
      const indexedEdgeList = edgeList.map((element, index) => ({ id: index, ...element }));
      return cloneDeep(indexedEdgeList);
   }


   #isNodeUnknown(nodeList: Node[]) {
      for (const node of nodeList) {
         if (!this.#nodeList.includes(node)) {
            return true;
         }
      }
      return false;
   }

}


export { Edge, Graph };
