/* eslint-disable no-param-reassign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-restricted-syntax */
import { AlgorithmExecutor } from '../AlgorithmExecutor';
import { GraphInterface, GraphHighlightData, Node, Edge } from '../../genericDataStructures/graph/graphTypes';
import { GraphGeneratorConfig } from '../../dataGenerators/graph/dataGeneratorTypes';
import { generateRandomGraph } from '../../dataGenerators/graph/graphGenerator';
import { Graph } from '../../genericDataStructures/graph/Graph';


type RoutingNode = { nodeId: string, predecessorNodeId: string, pathCost: number };


class Dijkstra extends AlgorithmExecutor<GraphInterface, GraphHighlightData> {


   #routingTable: RoutingNode[];
   #currentGraph: GraphInterface | null;
   #startNodeId: string;


   constructor(graph?: GraphInterface) {
      const name = 'Dijkstra Algorithm';
      const description = 'Phase 1: Add properties predecessorNode and pathCost to all nodes. Initialize the path cost of the start node with 0 and all other nodes with Infinity.\nPhase 2: Select the unvisited node with the currently lowest path cost. Check all neighboring nodes. If they can be reached for a lower cost via the selected node, update their path cost and their predecessor node property. Iterate until all nodes have been visited.';
      const codeExample = 'function Dijkstra(graph, startNode) {\n\n\t for (const node of graph.nodeList) {\n\t\tnode.predecessorNode = undefined;\n\t\tnode.pathCost = (node === startNode) ? 0 : Infinity;\n\t}\n\n\tconst unvisitedNodeList = [];\n\n\twhile (unvisitedNodeList.length < graph.nodeList.length) {\n\t\tconst minimumCostNode = graph.nodeList\n\t\t\t.filter((node) => !unvisitedNodeList.includes(node))\n\t\t\t.sort((node1, node2) => node1.pathCost - node2.pathCost)[0];\n\n\t\tfor (const neighborNode of minimumCostNode.neighborNodeList) {\n\t\t\tconst newPathCost = minimumCostNode.pathCost + distance(minimumCostNode, neighborNode);\n\t\t\tif (newPathCost < neighborNode.pathCost) {\n\t\t\t\tneighborNode.predecessorNode = minimumCostNode;\n\t\t\t\tneighborNode.pathCost = newPathCost;\n\t\t\t}\n\t\t}\n\n\t\tunvisitedNodeList.push(minimumCodeNode);\n\t}\n\n}';

      super(name, description, codeExample);
      this.#initializeInputData(graph);
      this.#routingTable = [];
      this.#currentGraph = super.inputData;
      this.#startNodeId = '';
   }


   execute(startNodeId: string) {
      this.#startNodeId = startNodeId;
      this.#executeInitialization();
      this.#executeAlgorithm();
   }


   calculateShortestPathTo(endNodeId: string) {
      let edgeHighlightList: number[] = [];
      let nodeHighlightList: string[] = [endNodeId];

      let currentNode = this.#routingTable.find((node) => node.nodeId === endNodeId);
      let totalPathCost = (currentNode?.pathCost) ? currentNode.pathCost : 0;

      if (!this.#currentGraph) { return; }

      super.addStage(
         'Calculate Shortest Path',
         'Calculate the shortest path via backtracking.'
      );

      super.addStepToCurrentStage(
         `Selected node ${endNodeId} as end node of path from start node ${this.#startNodeId}. The cost of this path is ${currentNode?.pathCost}`,
         this.#currentGraph,
         { nodeHighlightList, edgeHighlightList }
      );

      while (totalPathCost > 0) {

         if (!currentNode) { break; }

         const predecessorNodeId = currentNode.predecessorNodeId as string;

         const predecessorNode = this.#routingTable.find(
            (node) => node.nodeId === predecessorNodeId
         );

         if (!predecessorNodeId || !currentNode || predecessorNode?.pathCost === undefined) {
            break;
         }

         const currentEdgeCost = currentNode.pathCost - predecessorNode.pathCost;
         totalPathCost = predecessorNode.pathCost;

         const currentEdge = this.#currentGraph
            .getListOfEdgesBetween(predecessorNodeId, currentNode.nodeId)
            .filter((edge) => edge.weight === currentEdgeCost)[0];

         nodeHighlightList = [...nodeHighlightList, predecessorNodeId];
         edgeHighlightList = [...edgeHighlightList, currentEdge.id];

         currentNode = this.#routingTable.find((node) => node.nodeId === predecessorNodeId);

         super.addStepToCurrentStage(
            `Backtracked path to node ${predecessorNodeId}`,
            this.#currentGraph,
            { nodeHighlightList, edgeHighlightList }
         );
      }
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


   #executeInitialization() {
      super.addStage(
         'Graph Initialization',
         'Add and initialize the properties predecessor and pathCost for each node'
      );

      if (!super.inputData) {
         throw new Error('Property inputData is null');
      }

      this.#routingTable = super.inputData.nodeList.map((node) => {
         const pathCost = (node.id === this.#startNodeId) ? 0 : Infinity;
         return { nodeId: node.id, predecessorNodeId: '', pathCost };
      });

      let modifiedNodeList = super.inputData.nodeList.map((node) => {
         const labelText = (node.id === this.#startNodeId) ? this.#createLabelText(node.id, '', 0) : '';
         return { id: node.id, labelText };
      });

      this.#currentGraph = new Graph(modifiedNodeList, super.inputData.edgeList);

      super.addStepToCurrentStage(
         `The start node ${this.#startNodeId} is initialized with the path cost 0`,
         this.#currentGraph,
         { nodeHighlightList: [this.#startNodeId], edgeHighlightList: [] }
      );

      modifiedNodeList = modifiedNodeList.map((node) => {
         if (node.id !== this.#startNodeId) {
            return { id: node.id, labelText: this.#createLabelText(node.id, '', Infinity) };
         }
         return { id: node.id, labelText: node.labelText };
      });

      this.#currentGraph = new Graph(modifiedNodeList, super.inputData.edgeList);

      const nodeHighlightList = super.inputData.nodeList
         .filter((node) => node.id !== this.#startNodeId)
         .map((node) => node.id);

      super.addStepToCurrentStage(
         'All other nodes are initialized with the path cost infinity',
         this.#currentGraph,
         { nodeHighlightList, edgeHighlightList: [] }
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

         const selectedNode = this.#findUnvisitedNodeWithLowestCost(visitedNodeIdList);
         if (!selectedNode) { break; }

         const unvisitedNeighborIdList = this.#currentGraph
            .getNeighborNodeListFor(selectedNode.nodeId)
            .filter((nodeId) => !visitedNodeIdList.includes(nodeId));

         for (const neighborId of unvisitedNeighborIdList) {

            const edgeList = this.#currentGraph.getListOfEdgesBetween(
               selectedNode.nodeId,
               neighborId
            );

            const neighborRoutingNode = this.#routingTable.find(
               (node) => node.nodeId === neighborId
            );

            for (const edge of edgeList) {
               this.#checkEdgeForNewShortestPath(edge, selectedNode, neighborRoutingNode);
            }

         }

         visitedNodeIdList.push(selectedNode.nodeId);

         super.addStepToCurrentStage(
            `Marked node ${selectedNode.nodeId} as visited. List of visited nodes: [${visitedNodeIdList.sort().join(', ')}]`,
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


   #findUnvisitedNodeWithLowestCost(visitedNodeIdList: string[]) {
      const unvisitedNodeIdList = this.#routingTable
         .filter((node) => !visitedNodeIdList.includes(node.nodeId))
         .sort((node1, node2) => node1.pathCost - node2.pathCost);

      if (unvisitedNodeIdList.length === 0 || !this.#currentGraph) {
         return false;
      }

      const selectedNode = unvisitedNodeIdList[0];

      super.addStepToCurrentStage(
         `Unvisited node ${selectedNode.nodeId} has been selected, because it has the minimum path cost of ${selectedNode.pathCost} of all unvisited nodes`,
         this.#currentGraph,
         { nodeHighlightList: [selectedNode.nodeId], edgeHighlightList: [] }
      );

      return selectedNode;
   }


   #checkEdgeForNewShortestPath(
      edge: { id: number } & Edge,
      selectedNode: RoutingNode,
      neighborRoutingNode?: RoutingNode,
   ) {
      if (!this.#currentGraph || !edge.weight || !neighborRoutingNode) {
         return;
      }

      const currentNodeList: Node[] = this.#currentGraph.nodeList;

      const currentNeighbor = currentNodeList.find(
         (node) => node.id === neighborRoutingNode.nodeId
      );

      if (!currentNeighbor) {
         return;
      }

      let stageDescription = '';
      const edgeWeight = (edge.weight) ? edge.weight : 0;
      const newPathCost = selectedNode.pathCost + edgeWeight;
      const isShorterPath = newPathCost < neighborRoutingNode.pathCost;

      if (isShorterPath) {
         neighborRoutingNode.pathCost = newPathCost;
         neighborRoutingNode.predecessorNodeId = selectedNode.nodeId;

         currentNeighbor.labelText = this.#createLabelText(
            currentNeighbor.id,
            selectedNode.nodeId,
            newPathCost
         );

         this.#currentGraph = new Graph(currentNodeList, this.#currentGraph.edgeList);

         stageDescription = `Found new shortest path to node ${currentNeighbor.id}. Update predecessor node to ${selectedNode.nodeId} and pathCost to ${newPathCost}`;
      } else {
         stageDescription = `No new shortest path to node ${currentNeighbor.id} found. The cost of a new path from node ${selectedNode.nodeId} to node ${currentNeighbor.id} is ${newPathCost}, which is higher than the current path ${neighborRoutingNode.pathCost}`;
      }

      super.addStepToCurrentStage(
         stageDescription,
         this.#currentGraph,
         {
            nodeHighlightList: [selectedNode.nodeId, currentNeighbor.id],
            edgeHighlightList: [edge.id]
         }
      );
   }


   #createLabelText(nodeId: string, predecessorId: string = '', pathCost: number = Infinity) {
      if (predecessorId) {
         return `"${nodeId}\n{${predecessorId}, ${pathCost}}"`;
      }
      return `"${nodeId}\n{${pathCost}}"`;
   }

}


export { Dijkstra };
