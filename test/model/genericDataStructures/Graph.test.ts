import { assert, expect } from 'chai';
import { Graph, Edge } from '../../../src/model/genericDataStructures/graph/Graph';


const nodeList = ['A', 'B', 'C'];

const edgeList: Edge<string>[] = [
   { startNode: 'A', endNode: 'B', weight: 2 },
   { startNode: 'C', endNode: 'A', weight: 24 },
   { startNode: 'B', endNode: 'C', weight: 6 },
   { startNode: 'B', endNode: 'A', weight: 5 }
];



describe('Graph.constructor', () => {


   it('throws an error for missing parameter nodeList', () => {
      const missingParameter = undefined as unknown;
      expect(
         () => new Graph<string>(missingParameter as string[], edgeList)
      ).to.throw(Error, 'Parameter nodeList is missing');
   });


   it('throws an error if parameter nodeList is not an array', () => {
      const nonArrayParameter = 'notAnArray' as unknown;
      expect(
         () => new Graph<string>(nonArrayParameter as string[], edgeList)
      ).to.throw(Error, 'Parameter nodeList must be an array');
   });


   it('throws an error for empty nodeList', () => {
      const emptyNodeList: string[] = [];
      expect(
         () => new Graph<string>(emptyNodeList, edgeList)
      ).to.throw(Error, 'Parameter nodeList must contain at least one node');
   });


   it('throws an error if parameter edgeList is not an array', () => {
      const nonArrayParameter = 'notAnArray' as unknown;
      expect(
         () => new Graph<string>(nodeList, nonArrayParameter as Edge<string>[])
      ).to.throw(Error, 'Parameter edgeList must be an array');
   });


   it('throws an error if edgeList contains nodes that are not inside the nodeList', () => {
      const edgeListWithUnknownNode = [
         ...edgeList,
         { startNode: 'B', endNode: 'X', weight: 2 },
      ];
      expect(
         () => new Graph<string>(nodeList, edgeListWithUnknownNode)
      ).to.throw(Error, 'Parameter edgeList contains nodes that are not included in the nodeList');
   });


   it('instantiates graph object from valid nodeList and edgeList', () => {
      expect(() => new Graph<string>(nodeList, edgeList)).not.to.throw(Error);
   });


   it('removes duplicates from node list during instantiation', () => {
      const duplicateNodeList = ['A', 'B', 'C', 'B', 'D', 'A'];
      const expectedNodeList = ['A', 'B', 'C', 'D'];
      const graph = new Graph<string>(duplicateNodeList, edgeList);
      assert.deepEqual(graph.nodeList, expectedNodeList);
   });


   it('initializes property nodeList with clone of parameter to ensure immutability', () => {
      const mutableNodeList = ['A', 'B', 'C'];
      const graph = new Graph<string>(mutableNodeList, edgeList);
      assert.deepEqual(graph.nodeList, mutableNodeList);
      mutableNodeList.push('D');
      assert.notDeepEqual(graph.nodeList, mutableNodeList);
   });


   it('initializes property edgeList with clone of parameter to ensure immutability', () => {
      const mutableEdgeList: Edge<string>[] = [
         { startNode: 'A', endNode: 'B', weight: 2 },
         { startNode: 'C', endNode: 'A', weight: 24 },
         { startNode: 'B', endNode: 'C', weight: 6 },
         { startNode: 'B', endNode: 'A', weight: 5 }
      ];
      const graph = new Graph<string>(nodeList, mutableEdgeList);
      mutableEdgeList[0].weight = 200;
      assert.equal(graph.edgeList[0].weight, 2);
   });


   it('correctly initializes and enumerates property edgeList', () => {
      let graph = new Graph<string>(nodeList, edgeList);
      const expectedEdgeList = [
         { id: 0, startNode: 'A', endNode: 'B', weight: 2 },
         { id: 1, startNode: 'C', endNode: 'A', weight: 24 },
         { id: 2, startNode: 'B', endNode: 'C', weight: 6 },
         { id: 3, startNode: 'B', endNode: 'A', weight: 5 }
      ];
      assert.deepEqual(graph.edgeList, expectedEdgeList);

      const newEdgeList = [
         { startNode: 'B', endNode: 'A', isDirected: true, weight: 3 },
         { startNode: 'B', endNode: 'C', weight: 6 }
      ];
      graph = new Graph<string>(nodeList, newEdgeList);
      const expectedEdgeList2 = [
         { id: 0, startNode: 'B', endNode: 'A', isDirected: true, weight: 3 },
         { id: 1, startNode: 'B', endNode: 'C', weight: 6 }
      ];
      assert.deepEqual(graph.edgeList, expectedEdgeList2);
   });

});



describe('Graph.nodeList', () => {

   it('returns clone of nodeList to ensure graph is immutable', () => {
      const graph = new Graph<string>(nodeList, edgeList);
      const receivedNodeList = graph.nodeList;
      assert.notEqual(receivedNodeList, nodeList);
      assert.deepEqual(receivedNodeList, nodeList);
      receivedNodeList.push('F');
      assert.notDeepEqual(receivedNodeList, nodeList);
   });

});



describe('Graph.edgeList', () => {

   it('returns clone of edgeList to ensure graph is immutable', () => {
      const graph = new Graph<string>(nodeList, edgeList);
      const receivedEdgeList = graph.edgeList;
      const expectedEdgeList = [
         { id: 0, startNode: 'A', endNode: 'B', weight: 2 },
         { id: 1, startNode: 'C', endNode: 'A', weight: 24 },
         { id: 2, startNode: 'B', endNode: 'C', weight: 6 },
         { id: 3, startNode: 'B', endNode: 'A', weight: 5 }
      ];
      assert.notEqual(receivedEdgeList, expectedEdgeList);
      assert.deepEqual(receivedEdgeList, expectedEdgeList);
      receivedEdgeList.push({ id: 3, startNode: 'C', endNode: 'B', weight: 4 });
      assert.notDeepEqual(receivedEdgeList, graph.edgeList);
   });

});



describe('Graph.getNeighborNodeListFor()', () => {

   let graph: Graph<string>;


   beforeEach(() => {
      graph = new Graph<string>(nodeList, edgeList);
   });


   it('throws an error for parameters that are not known in the nodeList', () => {
      expect(() => graph.getNeighborNodeListFor('Z')).to.throw(Error, 'Node Z does not exist');
   });


   it('returns correct list of neighboring nodes', () => {
      assert.deepEqual(graph.getNeighborNodeListFor('A'), ['B', 'C']);
      assert.deepEqual(graph.getNeighborNodeListFor('B'), ['A', 'C']);

      const directedEdgeList = [
         { startNode: 'A', endNode: 'B', isDirected: false },
         { startNode: 'B', endNode: 'C', isDirected: true },
         { startNode: 'C', endNode: 'A', isDirected: true }
      ];
      const directedGraph = new Graph<string>(nodeList, directedEdgeList);
      assert.deepEqual(directedGraph.getNeighborNodeListFor('A'), ['B']);
      assert.deepEqual(directedGraph.getNeighborNodeListFor('B'), ['A', 'C']);
      assert.deepEqual(directedGraph.getNeighborNodeListFor('C'), ['A']);
   });


   it('returns empty list for nodes with no neighbors', () => {
      const newNodeList = ['A', 'B', 'C', 'D'];
      const newGraph = new Graph<string>(newNodeList, edgeList);
      const neighborList = newGraph.getNeighborNodeListFor('D');
      assert.deepEqual(neighborList, []);
      assert.equal(neighborList.length, 0);
   });

});



describe('Graph.getListOfEdgesBetween()', () => {

   let graph: Graph<string>;


   beforeEach(() => {
      graph = new Graph<string>(nodeList, edgeList);
   });


   it('throws an error for parameters that are not known in the nodeList', () => {
      expect(() => graph.getListOfEdgesBetween('Z', 'A')).to.throw(Error, 'Node Z does not exist');
      expect(() => graph.getListOfEdgesBetween('A', 'Z')).to.throw(Error, 'Node Z does not exist');
      expect(() => graph.getListOfEdgesBetween('M', 'P')).to.throw(Error, 'Node M does not exist');
   });


   it('returns correct list of edges between two nodes', () => {
      assert.deepEqual(
         graph.getListOfEdgesBetween('B', 'C'),
         [{ id: 2, startNode: 'B', endNode: 'C', weight: 6 }]
      );
      assert.deepEqual(
         graph.getListOfEdgesBetween('C', 'B'),
         [{ id: 2, startNode: 'B', endNode: 'C', weight: 6 }]
      );

      assert.deepEqual(
         graph.getListOfEdgesBetween('A', 'B'),
         [
            { id: 0, startNode: 'A', endNode: 'B', weight: 2 },
            { id: 3, startNode: 'B', endNode: 'A', weight: 5 }
         ]
      );

      const directedEdgeList = [
         { startNode: 'A', endNode: 'B', isDirected: false },
         { startNode: 'B', endNode: 'C', isDirected: true },
         { startNode: 'C', endNode: 'A', isDirected: true }
      ];
      const directedGraph = new Graph<string>(nodeList, directedEdgeList);

      assert.deepEqual(
         directedGraph.getListOfEdgesBetween('B', 'C'),
         [{ id: 1, startNode: 'B', endNode: 'C', isDirected: true }]
      );

      assert.deepEqual(
         directedGraph.getListOfEdgesBetween('C', 'B'),
         []
      );
   });


   it('returns empty list if no edge exists between specified nodes', () => {
      const resultList = graph.getListOfEdgesBetween('B', 'B');
      assert.deepEqual(resultList, []);
      assert.equal(resultList.length, 0);
   });


   it('returns clone of edge to ensure graph is immutable', () => {
      const resultList = graph.getListOfEdgesBetween('B', 'C');
      assert.deepEqual(resultList[0], graph.edgeList[resultList[0].id]);

      resultList[0].weight = 123;
      assert.notDeepEqual(resultList[0], graph.edgeList[resultList[0].id]);
   });

});
