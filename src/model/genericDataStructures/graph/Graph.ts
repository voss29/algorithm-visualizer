import { cloneDeep } from 'lodash';
import { Node, Edge, GraphInterface } from './graphTypes';


type EdgeList = ({ id: number } & Edge)[];


class Graph implements GraphInterface {

   #nodeList: Node[];
   #edgeList: EdgeList;


   constructor(nodeList: Node[], edgeList: Edge[] | EdgeList = []) {
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


   getNeighborNodeListFor(nodeId: string) {
      if (this.#isNodeUnknown([nodeId])) {
         throw new Error(`Node ${nodeId} does not exist`);
      }

      const neighborNodeSet = new Set<string>();

      this.#edgeList.forEach((edge) => {
         const isStartNode = nodeId === edge.startNode;
         const isEndNodeOfUndirectedEdge = !edge.isDirected && nodeId === edge.endNode;

         if (isStartNode) {
            neighborNodeSet.add(edge.endNode);
         }

         if (isEndNodeOfUndirectedEdge) {
            neighborNodeSet.add(edge.startNode);
         }
      });

      return [...neighborNodeSet];
   }


   getListOfEdgesBetween(nodeId1: string, nodeId2: string) {
      if (this.#isNodeUnknown([nodeId1])) {
         throw new Error(`Node ${nodeId1} does not exist`);
      }

      if (this.#isNodeUnknown([nodeId2])) {
         throw new Error(`Node ${nodeId2} does not exist`);
      }

      const resultList = this.#edgeList.filter(
         (edge) => {
            const isEdgeBetweenAB = edge.startNode === nodeId1 && edge.endNode === nodeId2;
            const isEdgeBetweenBA = edge.startNode === nodeId2 && edge.endNode === nodeId1;
            return isEdgeBetweenAB || (!edge.isDirected && isEdgeBetweenBA);
         }
      );

      return cloneDeep(resultList);
   }


   #validateInputNodeList(nodeList: Node[]) {
      if (!nodeList) {
         throw new Error('Parameter nodeList is missing');
      }

      if (!Array.isArray(nodeList)) {
         throw new TypeError('Parameter nodeList must be an array');
      }

      if (nodeList.length === 0) {
         throw new RangeError('Parameter nodeList must contain at least one node');
      }

      if (this.#containsDuplicateNodeIds(nodeList)) {
         throw new Error('Parameter nodeList contains duplicate values');
      }
   }


   #containsDuplicateNodeIds(nodeList: Node[]) {
      const nodeIdList = nodeList.map((node) => node.id);
      const containsDuplicateValues = new Set(nodeIdList).size !== nodeList.length;
      return containsDuplicateValues;
   }


   #validateInputEdgeList(edgeList: Edge[]) {
      if (!Array.isArray(edgeList)) {
         throw new Error('Parameter edgeList must be an array');
      }

      if (this.#containsEdgeListUnknownNodes(edgeList)) {
         throw new Error('Parameter edgeList contains nodes that are not included in the nodeList');
      }
   }


   #indexEdgeList(edgeList: Edge[] | EdgeList): EdgeList {
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


   #isNodeUnknown(nodeCandidateIdList: string[]) {
      for (let i = 0; i < nodeCandidateIdList.length; i++) {
         const currentNodeCandidateId = nodeCandidateIdList[i];
         const isNodeCandidateUnknown = !this.#nodeList.find(
            (node) => node.id === currentNodeCandidateId
         );
         // const isNodeCandidateUnknown = !this.#nodeList.includes(nodeCandidateIdList[i]);
         if (isNodeCandidateUnknown) {
            return true;
         }
      }
      return false;
   }

}


export { Edge, Graph };
