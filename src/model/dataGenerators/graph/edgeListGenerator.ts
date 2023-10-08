/* eslint-disable no-constant-condition */
import { GraphGeneratorConfig } from './dataGeneratorTypes';
import { getRandomIntegerBetweenInclusive } from './randomIntegerGenerator';
import { Edge, Node } from '../../genericDataStructures/graph/graphTypes';


function generateRandomEdgeList(config: GraphGeneratorConfig, nodeList: Node[]) {
   const randomEdgeAmountList = generateRandomEdgeAmountList(config, nodeList);
   let randomEdgeList = generateRandomEdgePairList(config, randomEdgeAmountList);
   randomEdgeList = addRandomWeight(config, randomEdgeList);
   randomEdgeList = addRandomDirection(config, randomEdgeList);
   return randomEdgeList;
}


type EdgeAmount = { node: string, edgeAmount: number };


function generateRandomEdgeAmountList(config: GraphGeneratorConfig, nodeList: Node[]) {
   const { edgesPerNode } = config;
   const randomEdgeAmountList: EdgeAmount[] = [];
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


function generateRandomEdgePairList(config: GraphGeneratorConfig, edgeAmountMap: EdgeAmount[]) {
   const { allowRecursiveEdges = false, allowUnconnectedGraph } = config;

   let nodePairList: Edge[] = [];

   if (!allowUnconnectedGraph) {
      nodePairList = generateMinimalConnectedEdgeList(edgeAmountMap);
   }

   while (true) {
      // sort in descending order
      edgeAmountMap.sort((element1, element2) => element2.edgeAmount - element1.edgeAmount);

      const currentNode = edgeAmountMap[0];
      let availablePairList = generateAvailableNodeList(edgeAmountMap, allowRecursiveEdges);

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


function generateMinimalConnectedEdgeList(edgeAmountMap: EdgeAmount[]) {
   const edgeList: Edge[] = [];

   for (let i = 0; i < edgeAmountMap.length - 1; i++) {
      const startNode = edgeAmountMap[i];
      const endNode = edgeAmountMap[i + 1];
      startNode.edgeAmount--;
      endNode.edgeAmount--;
      edgeList.push({ startNode: startNode.node, endNode: endNode.node });
   }

   return edgeList;
}


function generateAvailableNodeList(edgeAmountMap: EdgeAmount[], allowRecursiveEdges: boolean) {
   const currentNode = edgeAmountMap[0];

   const availablePairList = edgeAmountMap.filter((node) => {
      const isCurrentNodeSelectable = allowRecursiveEdges && currentNode.edgeAmount > 1;
      const isNotCurrentNode = node.node !== currentNode.node;
      const hasFreeEdges = node.edgeAmount > 0;
      return (isCurrentNodeSelectable || isNotCurrentNode) && hasFreeEdges;
   });

   return availablePairList;
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


export {
   generateRandomEdgeList,
   generateRandomEdgeAmountList,
   generateRandomEdgePairList,
   generateAvailableNodeList,
   generateMinimalConnectedEdgeList,
   addRandomWeight,
   addRandomDirection
};
