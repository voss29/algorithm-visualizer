import { assert } from 'chai';
import { GraphGeneratorConfig } from '../../../src/model/dataGenerators/graph/dataGeneratorTypes';
import {
   generateRandomEdgeAmountList,
   generateRandomEdgePairList,
   addRandomWeight,
   addRandomDirection
} from '../../../src/model/dataGenerators/graph/edgeListGenerator';



function generateValidConfiguration(): GraphGeneratorConfig {
   return {
      nodeAmount: { min: 2, max: 7 },
      edgesPerNode: { min: 2, max: 4 },
      edgeWeight: { min: 1, max: 10 },
      allowRecursiveEdges: true
   };
}



describe('generateRandomEdgeAmountMap()', () => {

   it('generates edge amount map according to config', () => {
      const config = generateValidConfiguration();
      const result = generateRandomEdgeAmountList(config, [
         { id: 'A', labelText: 'A' },
         { id: 'B', labelText: 'B' },
         { id: 'C', labelText: 'C' }
      ]);
      assert.equal(result.length, 3);
      assert.equal(result[0].node, 'A');
      assert.equal(result[1].node, 'B');
      assert.equal(result[2].node, 'C');
      assert.isAbove(result[0].edgeAmount, config.edgesPerNode.min - 1);
      assert.isAbove(result[1].edgeAmount, config.edgesPerNode.min - 1);
      assert.isAbove(result[2].edgeAmount, config.edgesPerNode.min - 1);
      assert.isBelow(result[0].edgeAmount, config.edgesPerNode.max + 1);
      assert.isBelow(result[1].edgeAmount, config.edgesPerNode.max + 1);
      assert.isBelow(result[2].edgeAmount, config.edgesPerNode.max + 1);
      const totalEdgeAmount = result[0].edgeAmount + result[1].edgeAmount + result[2].edgeAmount;
      const isEdgeTotalEven = totalEdgeAmount % 2 === 0;
      assert.equal(isEdgeTotalEven, true);
   });

});



describe('generateRandomEdgePairList()', () => {

   it('generates random node pair list according to config with connected graph', () => {
      const config = generateValidConfiguration();
      config.allowUnconnectedGraph = true;

      const edgeAmountList = [
         { node: 'A', edgeAmount: 3 },
         { node: 'B', edgeAmount: 3 },
         { node: 'C', edgeAmount: 4 },
         { node: 'D', edgeAmount: 2 },
         { node: 'E', edgeAmount: 4 }
      ];

      const nodePairList = generateRandomEdgePairList(config, edgeAmountList);
      const connectedNodeList = new Set<string>();

      nodePairList.forEach((node) => {
         connectedNodeList.add(node.startNode);
         connectedNodeList.add(node.endNode);
      });

      assert.equal(connectedNodeList.has('A'), true);
      assert.equal(connectedNodeList.has('B'), true);
      assert.equal(connectedNodeList.has('C'), true);
      assert.equal(connectedNodeList.has('D'), true);
      assert.equal(connectedNodeList.has('E'), true);
   });


   it('generates random node pair list according to config with recursive edges', () => {
      const config = generateValidConfiguration();
      const edgeAmountList = [
         { node: 'A', edgeAmount: 3 },
         { node: 'B', edgeAmount: 3 },
         { node: 'C', edgeAmount: 4 }
      ];
      let nodePairList = generateRandomEdgePairList(config, edgeAmountList);
      assert.equal(nodePairList.length, 5);

      const resultEdgeAmountMap = new Map();
      resultEdgeAmountMap.set('A', 0);
      resultEdgeAmountMap.set('B', 0);
      resultEdgeAmountMap.set('C', 0);

      nodePairList.forEach((pair) => {
         resultEdgeAmountMap.set(pair.startNode, resultEdgeAmountMap.get(pair.startNode) + 1);
         resultEdgeAmountMap.set(pair.endNode, resultEdgeAmountMap.get(pair.endNode) + 1);
      });

      assert.equal(resultEdgeAmountMap.get('A'), 3);
      assert.equal(resultEdgeAmountMap.get('B'), 3);
      assert.equal(resultEdgeAmountMap.get('C'), 4);

      const edgeAmountListWithForcedRecursivePair = [
         { node: 'A', edgeAmount: 5 },
         { node: 'B', edgeAmount: 1 },
      ];

      nodePairList = generateRandomEdgePairList(config, edgeAmountListWithForcedRecursivePair);
      const amountRecursivePairs = nodePairList.filter(
         (pair) => pair.startNode === pair.endNode
      ).length;
      assert.equal(amountRecursivePairs, 2);
   });


   it('generates random node pair list according to config without recursive edges', () => {
      const config = generateValidConfiguration();
      config.allowRecursiveEdges = false;
      const edgeAmountList = [
         { node: 'A', edgeAmount: 3 },
         { node: 'B', edgeAmount: 3 },
         { node: 'C', edgeAmount: 4 }
      ];
      const nodePairList = generateRandomEdgePairList(config, edgeAmountList);
      assert.equal(nodePairList.length, 5);

      const resultEdgeAmountMap = new Map();
      resultEdgeAmountMap.set('A', 0);
      resultEdgeAmountMap.set('B', 0);
      resultEdgeAmountMap.set('C', 0);

      nodePairList.forEach((pair) => {
         resultEdgeAmountMap.set(pair.startNode, resultEdgeAmountMap.get(pair.startNode) + 1);
         resultEdgeAmountMap.set(pair.endNode, resultEdgeAmountMap.get(pair.endNode) + 1);
      });

      assert.equal(resultEdgeAmountMap.get('A'), 3);
      assert.equal(resultEdgeAmountMap.get('B'), 3);
      assert.equal(resultEdgeAmountMap.get('C'), 4);

      nodePairList.forEach((pair) => {
         assert.notEqual(pair.startNode, pair.endNode);
      });
   });


   it('generates random node pair list according to config without forcing connected graph', () => {
      const config = generateValidConfiguration();
      config.allowUnconnectedGraph = false;

      const edgeAmountList = [
         { node: 'A', edgeAmount: 3 },
         { node: 'B', edgeAmount: 3 },
         { node: 'C', edgeAmount: 4 }
      ];

      const nodePairList = generateRandomEdgePairList(config, edgeAmountList);
      assert.equal(nodePairList.length, 5);

      const resultEdgeAmountMap = new Map();
      resultEdgeAmountMap.set('A', 0);
      resultEdgeAmountMap.set('B', 0);
      resultEdgeAmountMap.set('C', 0);

      nodePairList.forEach((pair) => {
         resultEdgeAmountMap.set(pair.startNode, resultEdgeAmountMap.get(pair.startNode) + 1);
         resultEdgeAmountMap.set(pair.endNode, resultEdgeAmountMap.get(pair.endNode) + 1);
      });

      assert.equal(resultEdgeAmountMap.get('A'), 3);
      assert.equal(resultEdgeAmountMap.get('B'), 3);
      assert.equal(resultEdgeAmountMap.get('C'), 4);
   });

});



describe('addRandomWeight()', () => {

   it('adds random weight to all edges if config demands a weighted graph', () => {
      const config = generateValidConfiguration();
      const edgePairList = [
         { startNode: 'A', endNode: 'B' },
         { startNode: 'B', endNode: 'C' },
      ];
      const result = addRandomWeight(config, edgePairList);

      result.forEach((edge) => {
         assert.property(edge, 'startNode');
         assert.property(edge, 'endNode');
         assert.property(edge, 'weight');
         if (edge.weight && config.edgeWeight) {
            assert.isAbove(edge.weight, config.edgeWeight.min - 1);
            assert.isBelow(edge.weight, config.edgeWeight.max + 1);
         }
      });

      assert.equal(edgePairList[0].startNode, 'A');
      assert.equal(edgePairList[0].endNode, 'B');
      assert.equal(edgePairList[1].startNode, 'B');
      assert.equal(edgePairList[1].endNode, 'C');
   });


   it('does not add weight to edges if config is forbidding a weighted graph', () => {
      const config = generateValidConfiguration();
      config.edgeWeight = undefined;
      const edgePairList = [
         { startNode: 'A', endNode: 'B' },
         { startNode: 'B', endNode: 'C' },
      ];
      const result = addRandomWeight(config, edgePairList);
      assert.deepEqual(result, edgePairList);
   });

});



describe('addRandomDirection()', () => {

   let config: GraphGeneratorConfig;


   beforeEach(() => {
      config = generateValidConfiguration();
   });


   it('adds direction to all edges if config specifies direction: "yes"', () => {
      config.isDirected = 'yes';
      const edgeList = [
         { startNode: 'A', endNode: 'B' },
         { startNode: 'B', endNode: 'C' },
      ];
      const result = addRandomDirection(config, edgeList);

      result.forEach((edge) => {
         assert.property(edge, 'startNode');
         assert.property(edge, 'endNode');
         assert.property(edge, 'isDirected');
         if (edge.isDirected) {
            assert.equal(edge.isDirected, true);
         }
      });

      assert.equal(result[0].startNode, 'A');
      assert.equal(result[0].endNode, 'B');
      assert.equal(result[1].startNode, 'B');
      assert.equal(result[1].endNode, 'C');
   });


   it('adds direction property randomly to edges if config specifies direction: "mixed"', () => {
      config.isDirected = 'mixed';
      const edgeList = new Array(500).fill({ startNode: 'A', endNode: 'B' });
      const result = addRandomDirection(config, edgeList);

      result.forEach((edge) => {
         assert.property(edge, 'startNode');
         assert.property(edge, 'endNode');
         assert.equal(edge.startNode, 'A');
         assert.equal(edge.endNode, 'B');
      });

      const someEdgesAreDirected = result.filter((edge) => edge.isDirected).length > 0;
      const someEdgesAreUndirected = result.filter((edge) => !edge.isDirected).length > 0;
      assert.equal(someEdgesAreDirected, true);
      assert.equal(someEdgesAreUndirected, true);
   });


   it('does not add direction property if config does not specify direction', () => {
      const edgeList = [
         { startNode: 'A', endNode: 'B' },
         { startNode: 'B', endNode: 'C' },
      ];
      const result = addRandomDirection(config, edgeList);
      assert.deepEqual(result[0], { startNode: 'A', endNode: 'B' });
      assert.deepEqual(result[1], { startNode: 'B', endNode: 'C' });
   });

});
