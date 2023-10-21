import { assert } from 'chai';
import { Graph } from '../../../../src/model/genericDataStructures/graph/Graph';
import { Node, Edge } from '../../../../src/model/genericDataStructures/graph/graphTypes';
import { Dijkstra } from '../../../../src/model/algorithms/graphAlgorithms/Dijkstra';


describe('Dijkstra.execute()', () => {

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
      algorithm.execute(startNodeId);

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

      assert.equal(
         algorithm.executionLog[1].stepList[0].description,
         'Unvisited node A has been selected, because it has the minimum path cost of 0 of all unvisited nodes'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[1].description,
         'Found new shortest path to node B. Update predecessor node to A and pathCost to 5'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[2].description,
         'Found new shortest path to node C. Update predecessor node to A and pathCost to 6'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[3].description,
         'Found new shortest path to node E. Update predecessor node to A and pathCost to 4'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[4].description,
         'Marked node A as visited. List of visited nodes: [A]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[5].description,
         'Unvisited node E has been selected, because it has the minimum path cost of 4 of all unvisited nodes'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[6].description,
         'No new shortest path to node B found. The cost of a new path from node E to node B is 11, which is higher than the current path 5'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[7].description,
         'Found new shortest path to node D. Update predecessor node to E and pathCost to 7'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[8].description,
         'Marked node E as visited. List of visited nodes: [A, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[9].description,
         'Unvisited node B has been selected, because it has the minimum path cost of 5 of all unvisited nodes'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[10].description,
         'No new shortest path to node C found. The cost of a new path from node B to node C is 13, which is higher than the current path 6'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[11].description,
         'No new shortest path to node D found. The cost of a new path from node B to node D is 9, which is higher than the current path 7'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[12].description,
         'Marked node B as visited. List of visited nodes: [A, B, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[13].description,
         'Unvisited node C has been selected, because it has the minimum path cost of 6 of all unvisited nodes'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[14].description,
         'No new shortest path to node D found. The cost of a new path from node C to node D is 8, which is higher than the current path 7'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[15].description,
         'Marked node C as visited. List of visited nodes: [A, B, C, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[16].description,
         'Unvisited node D has been selected, because it has the minimum path cost of 7 of all unvisited nodes'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[17].description,
         'Marked node D as visited. List of visited nodes: [A, B, C, D, E]'
      );

      assert.equal(
         algorithm.executionLog[1].stepList[18].description,
         'All nodes have been visited. Algorithm terminated'
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
      const startNodeId = 'A';
      algorithm.execute(startNodeId);
      algorithm.calculateShortestPathTo('D');

      assert.equal(
         algorithm.executionLog[2].stepList[0].description,
         'Selected node D as end node of path from start node A. The cost of this path is 7'
      );

      assert.equal(
         algorithm.executionLog[2].stepList[1].description,
         'Backtracked path to node E'
      );


      assert.equal(
         algorithm.executionLog[2].stepList[2].description,
         'Backtracked path to node A'
      );

   });

});



