import { cloneDeep } from 'lodash';
import { Edge, GraphInterface } from './graphTypes';


class Graph implements GraphInterface {

   #nodeList: string[];
   #edgeList: ({ id: number } & Edge)[];


   constructor(nodeList: string[], edgeList: Edge[] = []) {
      this.#validateInputNodeList(nodeList);
      this.#nodeList = cloneDeep(nodeList);

      this.#validateInputEdgeList(edgeList);
      const indexedEdgeList = this.#indexEdgeList(edgeList);
      this.#edgeList = cloneDeep(indexedEdgeList);
   }


   get nodeList() {
      return cloneDeep(this.#nodeList);
   }


   get edgeList() {
      return cloneDeep(this.#edgeList);
   }


   getNeighborNodeListFor(node: string) {
      if (this.#isNodeUnknown([node])) {
         throw new Error(`Node ${node} does not exist`);
      }

      const neighborNodeSet = new Set<string>();

      this.#edgeList.forEach((edge) => {
         const isStartNode = node === edge.startNode;
         const isEndNodeOfUndirectedEdge = !edge.isDirected && node === edge.endNode;

         if (isStartNode) {
            neighborNodeSet.add(edge.endNode);
         }

         if (isEndNodeOfUndirectedEdge) {
            neighborNodeSet.add(edge.startNode);
         }
      });

      return [...neighborNodeSet];
   }


   getListOfEdgesBetween(node1: string, node2: string) {
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


   #validateInputNodeList(nodeList: string[]) {
      if (!nodeList) {
         throw new Error('Parameter nodeList is missing');
      }

      if (!Array.isArray(nodeList)) {
         throw new TypeError('Parameter nodeList must be an array');
      }

      if (nodeList.length === 0) {
         throw new RangeError('Parameter nodeList must contain at least one node');
      }

      const containsDuplicateValues = new Set(nodeList).size !== nodeList.length;
      if (containsDuplicateValues) {
         throw new Error('Parameter nodeList contains duplicate values');
      }
   }


   #validateInputEdgeList(edgeList: Edge[]) {
      if (!Array.isArray(edgeList)) {
         throw new Error('Parameter edgeList must be an array');
      }

      if (this.#containsEdgeListUnknownNodes(edgeList)) {
         throw new Error('Parameter edgeList contains nodes that are not included in the nodeList');
      }
   }


   #indexEdgeList(edgeList: Edge[]) {
      return edgeList.map((element, index) => ({ id: index, ...element }));
   }


   #containsEdgeListUnknownNodes(edgeList: Edge[]) {
      for (let i = 0; i < edgeList.length; i++) {
         const edge = edgeList[i];
         if (this.#isNodeUnknown([edge.startNode, edge.endNode])) {
            return true;
         }
      }

      return false;
   }


   #isNodeUnknown(nodeCandidateList: string[]) {
      for (let i = 0; i < nodeCandidateList.length; i++) {
         const isNodeCandidateUnknown = !this.#nodeList.includes(nodeCandidateList[i]);
         if (isNodeCandidateUnknown) {
            return true;
         }
      }
      return false;
   }

}


export { Edge, Graph };
