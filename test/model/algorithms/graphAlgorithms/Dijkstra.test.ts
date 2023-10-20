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

   });

});



