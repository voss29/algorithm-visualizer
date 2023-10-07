/* eslint-disable no-constant-condition */
import { GraphGeneratorConfig } from './dataGeneratorTypes';
import { Node, Edge, GraphInterface } from '../genericDataStructures/graph/graphTypes';
import { Graph } from '../genericDataStructures/graph/Graph';


function generateRandomGraph(config: GraphGeneratorConfig): GraphInterface {
   validateConfiguration(config);
   const nodeList = generateRandomNodeList(config);
   const edgeList = generateRandomEdgeList(config, nodeList);
   return new Graph(nodeList, edgeList);
}


function generateRandomNodeList(config: GraphGeneratorConfig) {
   const { nodeAmount } = config;
   const randomNodeAmount = getRandomIntegerBetweenInclusive(nodeAmount.min, nodeAmount.max);
   const randomNodeIdList = generateAlphabeticalCharacterList(randomNodeAmount);
   return randomNodeIdList.map((id) => ({ id, labelText: id }));
}


function generateAlphabeticalCharacterList(characterAmount: number) {
   const characterList: string[] = [];
   let utfCodeUppercaseCharacter = 65; // represents character 'A'

   for (let i = 0; i < characterAmount; i++) {
      characterList.push(String.fromCharCode(utfCodeUppercaseCharacter));
      utfCodeUppercaseCharacter++;
   }

   return characterList;
}


function generateRandomEdgeList(config: GraphGeneratorConfig, nodeList: Node[]) {
   const randomEdgeAmountList = generateRandomEdgeAmountList(config, nodeList);
   let randomEdgeList = generateRandomEdgePairList(config, randomEdgeAmountList);
   randomEdgeList = addRandomWeight(config, randomEdgeList);
   randomEdgeList = addRandomDirection(config, randomEdgeList);
   return randomEdgeList;
}


type EdgeAmountMap = { node: string, edgeAmount: number }[];


function generateRandomEdgeAmountList(config: GraphGeneratorConfig, nodeList: Node[]) {
   const { edgesPerNode } = config;
   const randomEdgeAmountList: EdgeAmountMap = [];
   let edgeTotal = 0;

   nodeList.forEach((node) => {
      const edgeAmount = getRandomIntegerBetweenInclusive(edgesPerNode.min, edgesPerNode.max);
      randomEdgeAmountList.push({ node: node.id, edgeAmount });
      edgeTotal += edgeAmount;
   });

   const isEdgeTotalOdd = edgeTotal % 2 > 0;
   if (isEdgeTotalOdd) {
      const lastElement = randomEdgeAmountList[randomEdgeAmountList.length - 1];
      lastElement.edgeAmount += (lastElement.edgeAmount < edgesPerNode.max) ? 1 : -1;
   }

   return randomEdgeAmountList;
}


function generateRandomEdgePairList(config: GraphGeneratorConfig, edgeAmountMap : EdgeAmountMap) {
   const { allowRecursiveEdges, allowUnconnectedGraph } = config;

   const nodePairList: Edge[] = [];

   if (!allowUnconnectedGraph) {
      for (let i = 0; i < edgeAmountMap.length - 1; i++) {
         const startNode = edgeAmountMap[i];
         const endNode = edgeAmountMap[i + 1];
         startNode.edgeAmount--;
         endNode.edgeAmount--;
         nodePairList.push({ startNode: startNode.node, endNode: endNode.node });
      }
   }

   while (true) {
      // sort in descending order
      edgeAmountMap.sort((element1, element2) => element2.edgeAmount - element1.edgeAmount);

      const currentNode = edgeAmountMap[0];

      let availablePairList = edgeAmountMap.filter((node) => {
         const isCurrentNodeSelectable = allowRecursiveEdges && currentNode.edgeAmount > 1;
         const isNotCurrentNode = node.node !== currentNode.node;
         const hasFreeEdges = node.edgeAmount > 0;
         return (isCurrentNodeSelectable || isNotCurrentNode) && hasFreeEdges;
      });

      if (availablePairList.length === 0) {
         break;
      }

      let maximumIndex = 0;
      if (availablePairList.length > 1) {
         const isRecursive = allowRecursiveEdges && getRandomIntegerBetweenInclusive(0, 4) === 0;
         maximumIndex = (isRecursive) ? 0 : 1;
      }

      const freeEdgeMaximum = availablePairList[maximumIndex].edgeAmount;

      availablePairList = availablePairList.filter(
         (node) => node.edgeAmount === freeEdgeMaximum
      );

      const pairIndex = getRandomIntegerBetweenInclusive(0, availablePairList.length - 1);
      const selectedPairNode = availablePairList[pairIndex];

      currentNode.edgeAmount--;
      selectedPairNode.edgeAmount--;

      nodePairList.push({ startNode: currentNode.node, endNode: selectedPairNode.node });
   }

   return nodePairList;
}


function addRandomWeight(config: GraphGeneratorConfig, edgeList: Edge[]) {
   const { edgeWeight } = config;

   if (!edgeWeight) {
      return edgeList;
   }

   const weightedEdgeList = edgeList.map((edge) => {
      const randomEdgeWeight = getRandomIntegerBetweenInclusive(edgeWeight.min, edgeWeight.max);
      return { ...edge, weight: randomEdgeWeight };
   });

   return weightedEdgeList;
}


function addRandomDirection(config: GraphGeneratorConfig, edgeList: Edge[]) {
   const { isDirected } = config;

   switch (isDirected) {
      case 'yes':
         return edgeList.map((edge) => ({ ...edge, isDirected: true }));

      case 'mixed':
         return edgeList.map((edge) => {
            const isEdgeDirected = getRandomIntegerBetweenInclusive(1, 2) === 1;
            return { ...edge, isDirected: isEdgeDirected };
         });

      default:
         return edgeList;
   }
}


function validateConfiguration(config: GraphGeneratorConfig) {
   const {
      nodeAmount,
      edgesPerNode,
      edgeWeight,
      allowRecursiveEdges,
      allowUnconnectedGraph
   } = config;

   if (!Number.isInteger(nodeAmount.min)) {
      throw new TypeError('Argument nodeAmount.min must be an integer');
   }

   if (!Number.isInteger(nodeAmount.max)) {
      throw new TypeError('Argument nodeAmount.max must be an integer');
   }

   if (edgeWeight && !Number.isInteger(edgeWeight.min)) {
      throw new TypeError('Argument edgeWeight.min must be an integer');
   }

   if (edgeWeight && !Number.isInteger(edgeWeight.max)) {
      throw new TypeError('Argument edgeWeight.max must be an integer');
   }

   if (!Number.isInteger(edgesPerNode.min)) {
      throw new TypeError('Argument edgesPerNode.min must be an integer');
   }

   if (!Number.isInteger(edgesPerNode.max)) {
      throw new TypeError('Argument edgesPerNode.max must be an integer');
   }

   if (allowRecursiveEdges && typeof allowRecursiveEdges !== 'boolean') {
      throw new TypeError('Argument allowRecursiveEdges must be a boolean');
   }

   if (nodeAmount.min < 1) {
      throw new RangeError('Argument nodeAmount.min must be positive');
   }

   if (nodeAmount.max < 1) {
      throw new RangeError('Argument nodeAmount.max must be positive');
   }

   if (nodeAmount.min > nodeAmount.max) {
      throw new RangeError(
         `nodeAmount.min ${nodeAmount.min} is greater than nodeAmount.max ${nodeAmount.max}`
      );
   }

   if (edgesPerNode && edgesPerNode.min > edgesPerNode.max) {
      throw new RangeError(
         `edgesPerNode.min ${edgesPerNode.min} is greater than edgesPerNode.max ${edgesPerNode.max}`
      );
   }

   if (edgeWeight && edgeWeight.min > edgeWeight.max) {
      throw new RangeError(
         `edgeWeight.min ${edgeWeight.min} is greater than edgeWeight.max ${edgeWeight.max}`
      );
   }

   const mayRecursiveEdgesBeNecessary = edgesPerNode.max >= (nodeAmount.min - 1) * edgesPerNode.min;
   if (!allowRecursiveEdges && mayRecursiveEdgesBeNecessary) {
      throw new RangeError(
         `Configuration specifies that recursive edges are forbidden but graph may be forced to 
         generate recursive edges due to edgesPerNode.max = ${edgesPerNode.max} exceeding the lowest
         possible edge total of all other nodes (nodeAmount.min - 1) * edgesPerNode.min = 
         ${(nodeAmount.min - 1) * edgesPerNode.min}`
      );
   }

   if (!allowUnconnectedGraph && edgesPerNode.min < 2) {
      throw new RangeError(
         `Configuration forbids the generation of unconnected graph. Therefore the minimum
         of edges per node must be greater than 1.`
      );
   }
}


function getRandomIntegerBetweenInclusive(min: number, max: number) {
   return Math.floor(min + (max - min + 1) * Math.random());
}


export {
   generateRandomGraph,
   validateConfiguration,
   getRandomIntegerBetweenInclusive,
   generateAlphabeticalCharacterList,
   generateRandomEdgePairList,
   generateRandomEdgeAmountList,
   addRandomWeight,
   addRandomDirection
};
