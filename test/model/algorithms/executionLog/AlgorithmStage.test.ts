/* eslint-disable @typescript-eslint/no-unused-vars */
import { assert } from 'chai';
import { AlgorithmStage } from '../../../../src/model/algorithms/executionLog/AlgorithmStage';
import { AlgorithmData, HighlightData } from '../../../../src/model/algorithms/algorithmTypes';
import { AlgorithmStep } from '../../../../src/model/algorithms/executionLog/AlgorithmStep';


describe('AlgorithmStage', () => {

   let stage: AlgorithmStage<AlgorithmData, HighlightData>;


   beforeEach(() => {
      stage = new AlgorithmStage(1, 'stage 1', 'stage description');
   });


   it('initiates correctly', () => {
      assert.equal(stage.id, 1);
      assert.equal(stage.name, 'stage 1');
      assert.equal(stage.description, 'stage description');
      assert.deepEqual(stage.stepList, []);
   });


   it('getter stepList returns clone to ensure immutability', () => {
      const currentData: AlgorithmData = {
         nodeList: [],
         edgeList: [],
         getNeighborNodeListFor: (node) => [],
         getListOfEdgesBetween: (node1, node2) => []
      };

      const hightlightData: HighlightData = {
         nodeHighlightList: ['A', 'V'],
         edgeHighlightList: [2, 3, 6]
      };

      const result = stage.stepList;
      result.push(new AlgorithmStep(0, 'step description', currentData, hightlightData));
      assert.deepEqual(stage.stepList, []);
   });


   it('add step to stepList via method addStep()', () => {
      const currentData: AlgorithmData = {
         nodeList: [],
         edgeList: [],
         getNeighborNodeListFor: (node) => [],
         getListOfEdgesBetween: (node1, node2) => []
      };

      const hightlightData: HighlightData = {
         nodeHighlightList: ['A', 'V'],
         edgeHighlightList: [2, 3, 6]
      };

      assert.equal(stage.stepList.length, 0);
      stage.addStep(new AlgorithmStep(0, 'step description', currentData, hightlightData));
      assert.equal(stage.stepList.length, 1);

      const firstStep = stage.stepList[0];
      assert.equal(firstStep.id, 0);
      assert.equal(firstStep.description, 'step description');
      assert.deepEqual(firstStep.data, currentData);
      assert.deepEqual(firstStep.highlightData, hightlightData);
   });

});
