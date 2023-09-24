/* eslint-disable @typescript-eslint/no-unused-vars */
import { assert } from 'chai';
import { AlgorithmStep } from '../../../../src/model/algorithms/executionLog/AlgorithmStep';
import { GraphInterface } from '../../../../src/model/genericDataStructures/graph/graphTypes';

describe('AlgorithmStep', () => {


   it('initiates correctly', () => {

      const graphMockup : GraphInterface = {
         nodeList: [],
         edgeList: [],
         getNeighborNodeListFor: (node) => [],
         getListOfEdgesBetween: (node1, node2) => []
      };

      type HighlightData = {
         nodeHighlightList: string[],
         edgeHighlightList: number[]
      };

      const highlightData: HighlightData = {
         nodeHighlightList: ['A', 'E'],
         edgeHighlightList: [2, 3, 6]
      };

      const step = new AlgorithmStep<GraphInterface, HighlightData>(2, 'step description', graphMockup, highlightData);

      assert.equal(step.id, 2);
      assert.equal(step.description, 'step description');
      assert.deepEqual(step.data, graphMockup);
      assert.deepEqual(step.highlightData, highlightData);
   });


});
