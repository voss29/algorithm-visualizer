/* eslint-disable no-restricted-syntax */
import { AlgorithmExecutor } from '../AlgorithmExecutor';
import { GraphInterface, GraphHighlightData } from '../../genericDataStructures/graph/graphTypes';
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
      this.#routingTable = [];
      this.#currentGraph = super.inputData;
      this.#initializeInputData(graph);
   }


   execute(startNodeId: string) {
      this.#executeInitialization(startNodeId);
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
         const labelText = (node.id === startNodeId) ? 'predecessor: ""\npathCost: 0' : '';
         return { id: node.id, labelText };
      });

      this.#currentGraph = new Graph(modifiedNodeList, super.inputData.edgeList);

      super.addStepToCurrentStage(
         `The start node ${startNodeId} is initialized with the path cost 0`,
         this.#currentGraph,
         { nodeHighlightList: [startNodeId], edgeHighlightList: [] }
      );

      modifiedNodeList = modifiedNodeList.map((node) => {
         const labelText = (node.id !== startNodeId) ? 'predecessor: ""\npathCost: Infinity' : node.labelText;
         return { id: node.id, labelText };
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
         'Description'
      );

      if (!this.#currentGraph) {
         throw new Error('Property currentGraph is null');
      }

      const visitedNodeIdList : string[] = [];

      while (true) {
         const unvisitedNodeIdList = this.#routingTable.filter(
            (node) => !visitedNodeIdList.includes(node.nodeId)
         );

         if (unvisitedNodeIdList.length === 0) {
            break;
         }

         unvisitedNodeIdList.sort((node1, node2) => node1.pathCost - node2.pathCost);
         const currentNode = unvisitedNodeIdList[0];

         super.addStepToCurrentStage(
            `Unvisited node ${currentNode.nodeId} has been selected, because
            it has the minimum path cost of ${currentNode.pathCost}`,
            this.#currentGraph,
            { nodeHighlightList: [currentNode.nodeId], edgeHighlightList: [] }
         );

         const currentNodeId = currentNode.nodeId;
         const neighborIdList = this.#currentGraph.getNeighborNodeListFor(currentNodeId);

         for (const neighborId of neighborIdList) {
            const edgeList = this.#currentGraph.getListOfEdgesBetween(currentNodeId, neighborId);
            const neighborRoutingNode = this.#routingTable.find(
               (node) => node.nodeId === neighborId
            );

            for (const edge of edgeList) {
               if (!edge.weight || !neighborRoutingNode) {
                  break;
               }
               const newPathCost = currentNode.pathCost + (edge.weight) ? edge.weight : 0;
               const isShorterPath = newPathCost < neighborRoutingNode.pathCost;

               if (isShorterPath) {
                  neighborRoutingNode.pathCost = newPathCost;
                  neighborRoutingNode.predecessorNodeId = currentNodeId;

                  const currentNodeElement = this.#currentGraph.nodeList.find(
                     (node) => node.id === neighborId
                  );

                  if (currentNodeElement) {
                     currentNodeElement.labelText = `predecessor: ${currentNodeId}
                     pathCost: ${newPathCost}`;
                  }

                  super.addStepToCurrentStage(
                     `Found new shortest path to node ${currentNodeElement?.id}. Update predecessor
                     node to ${currentNode.nodeId} and pathCost to ${newPathCost}`,
                     this.#currentGraph,
                     {
                        nodeHighlightList: [currentNodeElement?.id],
                        edgeHighlightList: [edge.id] }
                  );
               }

            }

         }

      }

   }


   #initializeInputData(graph?: GraphInterface) {
      if (graph) {
         super.setInputData(graph);
      } else {
         const graphGeneratorConfig: GraphGeneratorConfig = {
            nodeAmount: { min: 6, max: 8 },
            edgesPerNode: { min: 2, max: 3 },
            edgeWeight: { min: 1, max: 10 },
            allowRecursiveEdges: false,
            allowUnconnectedGraph: false
         };
         const randomGraph = generateRandomGraph(graphGeneratorConfig);
         super.setInputData(randomGraph);
      }
   }

}


export { Dijkstra };
