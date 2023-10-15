/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { AlgorithmExecutor } from '../AlgorithmExecutor';
import { GraphInterface, GraphHighlightData, Node } from '../../genericDataStructures/graph/graphTypes';
import { GraphGeneratorConfig } from '../../dataGenerators/graph/dataGeneratorTypes';
import { generateRandomGraph } from '../../dataGenerators/graph/graphGenerator';
import { Graph } from '../../genericDataStructures/graph/Graph';


type RoutingNode = { nodeId: string, predecessorNodeId: string, pathCost: number };


class Dijkstra extends AlgorithmExecutor<GraphInterface, GraphHighlightData> {


   #routingTable: RoutingNode[];
   #currentGraph: GraphInterface | null;


   constructor(graph?: GraphInterface) {
      const name = 'Dijkstra Algorithm';
      const description = 'algorithm description';
      const codeExample = 'code example';

      super(name, description, codeExample);
      this.#initializeInputData(graph);
      this.#routingTable = [];
      this.#currentGraph = super.inputData;
   }


   execute(startNodeId: string) {
      this.#executeInitialization(startNodeId);
      this.#executeAlgorithm();
   }


   #initializeInputData(graph?: GraphInterface) {
      if (graph) {
         super.setInputData(graph);
      } else {
         const graphGeneratorConfig: GraphGeneratorConfig = {
            nodeAmount: { min: 6, max: 8 },
            edgesPerNode: { min: 3, max: 5 },
            edgeWeight: { min: 1, max: 10 },
            allowRecursiveEdges: false,
            allowUnconnectedGraph: false
         };
         const randomGraph = generateRandomGraph(graphGeneratorConfig);
         super.setInputData(randomGraph);
      }
   }


   #executeInitialization(startNodeId: string) {

      super.addStage(
         'Graph Initialization',
         'Add and initialize the properties predecessor and pathCost for each node'
      );

      if (!super.inputData) {
         throw new Error('Property inputData is null');
      }

      this.#routingTable = super.inputData.nodeList.map((node) => {
         const pathCost = (node.id === startNodeId) ? 0 : Infinity;
         return { nodeId: node.id, predecessorNodeId: '', pathCost };
      });

      let modifiedNodeList = super.inputData.nodeList.map((node) => {
         const labelText = (node.id === startNodeId) ? this.#createLabelText(node.id, '', 0) : '';
         return { id: node.id, labelText };
      });

      this.#currentGraph = new Graph(modifiedNodeList, super.inputData.edgeList);

      super.addStepToCurrentStage(
         `The start node ${startNodeId} is initialized with the path cost 0`,
         this.#currentGraph,
         { nodeHighlightList: [startNodeId], edgeHighlightList: [] }
      );

      modifiedNodeList = modifiedNodeList.map((node) => {
         if (node.id !== startNodeId) {
            return { id: node.id, labelText: this.#createLabelText(node.id, '', Infinity) };
         }
         return { id: node.id, labelText: node.labelText };
      });

      this.#currentGraph = new Graph(modifiedNodeList, super.inputData.edgeList);

      const nodeHighlightList = super.inputData.nodeList.filter((node) => node.id !== startNodeId);
      const nodeIdList = nodeHighlightList.map((node) => node.id);

      super.addStepToCurrentStage(
         'All other nodes are initialized with the path cost infinity',
         this.#currentGraph,
         { nodeHighlightList: nodeIdList, edgeHighlightList: [] }
      );

   }


   #executeAlgorithm() {

      super.addStage(
         'Search Shortest Path',
         'Select the unvisited node with the currently lowest path cost. Check all neighboring nodes. If they can be reached for a lower cost via the selected node, update their path cost and their predecessor node property. Iterate until all nodes have been visited.'
      );

      if (!this.#currentGraph) {
         throw new Error('Property currentGraph is null');
      }

      const visitedNodeIdList : string[] = [];

      while (true) {
         const unvisitedNodeIdList = this.#routingTable
            .filter((node) => !visitedNodeIdList.includes(node.nodeId))
            .sort((node1, node2) => node1.pathCost - node2.pathCost);

         if (unvisitedNodeIdList.length === 0) {
            break;
         }

         const currentNode = unvisitedNodeIdList[0];

         super.addStepToCurrentStage(
            `Unvisited node ${currentNode.nodeId} has been selected, because it has the minimum path cost of ${currentNode.pathCost} of all unvisited nodes`,
            this.#currentGraph,
            { nodeHighlightList: [currentNode.nodeId], edgeHighlightList: [] }
         );

         const neighborIdList = this.#currentGraph.getNeighborNodeListFor(currentNode.nodeId);

         for (const neighborId of neighborIdList) {

            const edgeList = this.#currentGraph.getListOfEdgesBetween(
               currentNode.nodeId,
               neighborId
            );

            const neighborRoutingNode = this.#routingTable.find(
               (node) => node.nodeId === neighborId
            );

            for (const edge of edgeList) {

               const currentNodeList: Node[] = this.#currentGraph.nodeList;

               const currentNeighbor = currentNodeList.find(
                  (node) => node.id === neighborId
               );

               if (!edge.weight || !neighborRoutingNode || !currentNeighbor) {
                  continue;
               }

               let stageDescription = '';
               const edgeWeight = (edge.weight) ? edge.weight : 0;
               const newPathCost = currentNode.pathCost + edgeWeight;
               const isShorterPath = newPathCost < neighborRoutingNode.pathCost;

               if (isShorterPath) {
                  neighborRoutingNode.pathCost = newPathCost;
                  neighborRoutingNode.predecessorNodeId = currentNode.nodeId;

                  currentNeighbor.labelText = this.#createLabelText(
                     currentNeighbor.id,
                     currentNode.nodeId,
                     newPathCost
                  );

                  this.#currentGraph = new Graph(currentNodeList, this.#currentGraph.edgeList);

                  stageDescription = `Found new shortest path to node ${currentNeighbor.id}. Update predecessor node to ${currentNode.nodeId} and pathCost to ${newPathCost}`;
               } else {
                  stageDescription = `No new shortest path to node ${currentNeighbor.id} found. The cost of a new path from node ${currentNode.nodeId} to node ${currentNeighbor.id} is ${newPathCost}, which is higher than the current path ${neighborRoutingNode.pathCost}`;
               }

               super.addStepToCurrentStage(
                  stageDescription,
                  this.#currentGraph,
                  {
                     nodeHighlightList: [currentNode.nodeId, currentNeighbor.id],
                     edgeHighlightList: [edge.id]
                  }
               );

            }

         }

         visitedNodeIdList.push(currentNode.nodeId);

         super.addStepToCurrentStage(
            `Marked node ${currentNode.nodeId} as visited. List of visited nodes: [${visitedNodeIdList.sort().join(', ')}]`,
            this.#currentGraph,
            { nodeHighlightList: [], edgeHighlightList: [] }
         );

      }

      super.addStepToCurrentStage(
         'All nodes have been visited. Algorithm terminated',
         this.#currentGraph,
         { nodeHighlightList: [], edgeHighlightList: [] }
      );

      super.setOutputData(this.#currentGraph);
   }


   #createLabelText(nodeId: string, predecessorId: string = '', pathCost: number = Infinity) {
      if (predecessorId) {
         return `"${nodeId}\n{${predecessorId}, ${pathCost}}"`;
      }
      return `"${nodeId}\n{${pathCost}}"`;
   }

}


export { Dijkstra };
