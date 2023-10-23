import { assert } from 'chai';
import { Graph } from '../../../../src/model/genericDataStructures/graph/Graph';
import { Node, Edge } from '../../../../src/model/genericDataStructures/graph/graphTypes';
import { Dijkstra } from '../../../../src/model/algorithms/graphAlgorithms/Dijkstra';


describe('Dijkstra.constructor()', () => {

   const nodeList: Node[] = [
      { id: 'A', labelText: '' },
      { id: 'B', labelText: '' },
      { id: 'C', labelText: '' },
      { id: 'D', labelText: '' },
      { id: 'E', labelText: '' },
   ];

   const edgeList: Edge[] = [
      { startNode: 'A', endNode: 'B', isDirected: false, weight: 5 },
      { startNode: 'A', endNode: 'C', isDirected: false, weight: 6 },
      { startNode: 'A', endNode: 'E', isDirected: false, weight: 4 },
      { startNode: 'B', endNode: 'C', isDirected: false, weight: 8 },
      { startNode: 'B', endNode: 'D', isDirected: false, weight: 4 },
      { startNode: 'B', endNode: 'E', isDirected: false, weight: 7 },
      { startNode: 'C', endNode: 'D', isDirected: false, weight: 2 },
      { startNode: 'D', endNode: 'E', isDirected: false, weight: 3 },
   ];

   const graph = new Graph(nodeList, edgeList);
   const algorithm = new Dijkstra(graph);

   it('executes correctly', () => {
      const startNodeId = 'A';

      assert.equal(
         algorithm.executionLog[0].stepList[0].description,
         'The start node A is initialized with the path cost 0'
      );

      algorithm.executionLog[0].stepList[0].data.nodeList.forEach((node) => {
         if (node.id === startNodeId) {
            assert.equal(node.labelText, '"A\n{0}"');
         } else {
            assert.equal(node.labelText, '');
         }
      });

      assert.deepEqual(
         algorithm.executionLog[0].stepList[0].highlightData,
         { nodeHighlightList: ['A'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[0].stepList[1].description,
         'All other nodes are initialized with the path cost infinity'
      );

      algorithm.executionLog[0].stepList[1].data.nodeList.forEach((node) => {
         if (node.id === startNodeId) {
            assert.equal(node.labelText, '"A\n{0}"');
         } else {
            assert.equal(node.labelText, `"${node.id}\n{Infinity}"`);
         }
      });

      assert.deepEqual(
         algorithm.executionLog[0].stepList[1].highlightData,
         { nodeHighlightList: ['B', 'C', 'D', 'E'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[0].description,
         'Unvisited node A has been selected, because it has the minimum path cost of 0 of all unvisited nodes'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[0].data.nodeList[0].labelText,
         '"A\n{0}"'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[0].highlightData,
         { nodeHighlightList: ['A'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[1].description,
         'New shortest path from node A to node B found. Update properties B.predecessorNode to A and B.pathCost to 5.'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[1].data.nodeList[1].labelText,
         '"B\n{A, 5}"'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[1].highlightData,
         { nodeHighlightList: ['A', 'B'], edgeHighlightList: [0] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[2].description,
         'New shortest path from node A to node C found. Update properties C.predecessorNode to A and C.pathCost to 6.'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[2].data.nodeList[2].labelText,
         '"C\n{A, 6}"'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[2].highlightData,
         { nodeHighlightList: ['A', 'C'], edgeHighlightList: [1] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[3].description,
         'New shortest path from node A to node E found. Update properties E.predecessorNode to A and E.pathCost to 4.'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[3].data.nodeList[4].labelText,
         '"E\n{A, 4}"'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[3].highlightData,
         { nodeHighlightList: ['A', 'E'], edgeHighlightList: [2] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[4].description,
         'Marked node A as visited. List of visited nodes: [A]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[5].description,
         'Unvisited node E has been selected, because it has the minimum path cost of 4 of all unvisited nodes'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[5].highlightData,
         { nodeHighlightList: ['E'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[6].description,
         'No new shortest path from node A to node B found. The cost of the new path is 11 = 4 (path cost A to E) + 7 (path cost E to B). This is not lower than the current shortest path cost from A to B of 5.'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[6].highlightData,
         { nodeHighlightList: ['E', 'B'], edgeHighlightList: [5] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[7].description,
         'New shortest path from node A to node D found. Update properties D.predecessorNode to E and D.pathCost to 7.'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[7].data.nodeList[3].labelText,
         '"D\n{E, 7}"'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[7].highlightData,
         { nodeHighlightList: ['E', 'D'], edgeHighlightList: [7] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[8].description,
         'Marked node E as visited. List of visited nodes: [A, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[9].description,
         'Unvisited node B has been selected, because it has the minimum path cost of 5 of all unvisited nodes'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[9].highlightData,
         { nodeHighlightList: ['B'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[10].description,
         'No new shortest path from node A to node C found. The cost of the new path is 13 = 5 (path cost A to B) + 8 (path cost B to C). This is not lower than the current shortest path cost from A to C of 6.'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[10].highlightData,
         { nodeHighlightList: ['B', 'C'], edgeHighlightList: [3] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[11].description,
         'No new shortest path from node A to node D found. The cost of the new path is 9 = 5 (path cost A to B) + 4 (path cost B to D). This is not lower than the current shortest path cost from A to D of 7.'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[11].highlightData,
         { nodeHighlightList: ['B', 'D'], edgeHighlightList: [4] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[12].description,
         'Marked node B as visited. List of visited nodes: [A, B, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[13].description,
         'Unvisited node C has been selected, because it has the minimum path cost of 6 of all unvisited nodes'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[13].highlightData,
         { nodeHighlightList: ['C'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[14].description,
         'No new shortest path from node A to node D found. The cost of the new path is 8 = 6 (path cost A to C) + 2 (path cost C to D). This is not lower than the current shortest path cost from A to D of 7.'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[14].highlightData,
         { nodeHighlightList: ['C', 'D'], edgeHighlightList: [6] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[15].description,
         'Marked node C as visited. List of visited nodes: [A, B, C, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[16].description,
         'Unvisited node D has been selected, because it has the minimum path cost of 7 of all unvisited nodes'
      );

      assert.deepEqual(
         algorithm.executionLog[1].stepList[16].highlightData,
         { nodeHighlightList: ['D'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[1].stepList[17].description,
         'Marked node D as visited. List of visited nodes: [A, B, C, D, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[18].description,
         'All nodes have been visited. Algorithm terminated.'
      );

   });

});



describe('Dijkstra.calculateShortestPathTo()', () => {

   const nodeList: Node[] = [
      { id: 'A', labelText: '' },
      { id: 'B', labelText: '' },
      { id: 'C', labelText: '' },
      { id: 'D', labelText: '' },
      { id: 'E', labelText: '' },
   ];

   const edgeList: Edge[] = [
      { startNode: 'A', endNode: 'B', isDirected: false, weight: 5 },
      { startNode: 'A', endNode: 'C', isDirected: false, weight: 6 },
      { startNode: 'A', endNode: 'E', isDirected: false, weight: 4 },
      { startNode: 'B', endNode: 'C', isDirected: false, weight: 8 },
      { startNode: 'B', endNode: 'D', isDirected: false, weight: 4 },
      { startNode: 'B', endNode: 'E', isDirected: false, weight: 7 },
      { startNode: 'C', endNode: 'D', isDirected: false, weight: 2 },
      { startNode: 'D', endNode: 'E', isDirected: false, weight: 3 },
   ];

   const graph = new Graph(nodeList, edgeList);
   const algorithm = new Dijkstra(graph);

   it('executes correctly', () => {
      algorithm.calculateShortestPathTo('D');

      assert.equal(
         algorithm.executionLog[2].stepList[0].description,
         'Selected node D as end node of path from start node A. The cost of the shortest path from A to D is 7.',
      );

      assert.deepEqual(
         algorithm.executionLog[2].stepList[0].highlightData,
         { nodeHighlightList: ['D'], edgeHighlightList: [] }
      );

      assert.equal(
         algorithm.executionLog[2].stepList[1].description,
         'Backtracked path to node E'
      );

      assert.deepEqual(
         algorithm.executionLog[2].stepList[1].highlightData,
         { nodeHighlightList: ['D', 'E'], edgeHighlightList: [7] }
      );

      assert.equal(
         algorithm.executionLog[2].stepList[2].description,
         'Backtracked path to node A'
      );

      assert.deepEqual(
         algorithm.executionLog[2].stepList[2].highlightData,
         { nodeHighlightList: ['D', 'E', 'A'], edgeHighlightList: [7, 2] }
      );

   });

});



