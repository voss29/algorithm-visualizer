/* eslint-disable no-constant-condition */
import { generateRandomNodeList } from './nodeListGenerator';
import { generateRandomEdgeList } from './edgeListGenerator';
import { GraphGeneratorConfig } from './dataGeneratorTypes';
import { GraphInterface } from '../../genericDataStructures/graph/graphTypes';
import { Graph } from '../../genericDataStructures/graph/Graph';


function generateRandomGraph(config: GraphGeneratorConfig): GraphInterface {
   validateConfiguration(config);
   const nodeList = generateRandomNodeList(config);
   const edgeList = generateRandomEdgeList(config, nodeList);
   return new Graph(nodeList, edgeList);
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


export { generateRandomGraph, validateConfiguration };
