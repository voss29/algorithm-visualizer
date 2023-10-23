/* eslint-disable @typescript-eslint/no-unused-vars */
import { assert } from 'chai';
import { AlgorithmExecutor } from '../../../src/model/algorithms/AlgorithmExecutor';
import { AlgorithmData, HighlightData, AlgorithmType } from '../../../src/model/algorithms/algorithmTypes';
import { MermaidGraphParserConfig } from '../../../src/view/shared/GraphVisualization/mermaidGraphParser';


class Algorithm extends AlgorithmExecutor<AlgorithmData, HighlightData> {

   constructor(type: AlgorithmType, name: string, description: string, codeExample: string) {
      super(type, name, description, codeExample);

      this.setInputData({
         nodeList: [{ id: 'A', labelText: 'A' }, { id: 'B', labelText: 'B' }],
         edgeList: [{ id: 0, startNode: 'A', endNode: 'B' }],
         getNeighborNodeListFor: (node) => ['Test'],
         getListOfEdgesBetween: (node1, node2) => []
      });

      this.setOutputData({
         nodeList: [
            { id: 'A', labelText: 'A' },
            { id: 'B', labelText: 'B' },
            { id: 'C', labelText: 'C' }
         ],
         edgeList: [{ id: 0, startNode: 'A', endNode: 'B', isDirected: true, weight: 5 }],
         getNeighborNodeListFor: (node) => ['Test'],
         getListOfEdgesBetween: (node1, node2) => []
      });
   }

   buildParserConfig(data: AlgorithmData, highlightData: HighlightData): MermaidGraphParserConfig {
      return { graph: data, direction: 'LR' };
   }


   addStageWrapper(name: string, description: string) {
      this.addStage(name, description);
   }

   addStepToCurrentStageWrapper() {
      if (this.inputData) {
         this.addStepToCurrentStage(
            'step description',
            this.inputData,
            { nodeHighlightList: ['A', 'B'], edgeHighlightList: [1, 4, 5] }
         );
      }
   }


   execute() {
      this.addStage('stage name', 'stage description');
      if (this.inputData) {
         this.addStepToCurrentStage(
            'step description',
            this.inputData,
            { nodeHighlightList: ['A', 'B'], edgeHighlightList: [1, 4, 5] }
         );
      }
   }

}


describe('AlgorithmExecutor', () => {

   it('instantiates correctly', () => {
      const algorithm = new Algorithm('graph', 'algorithm name', 'algorithm description', 'code');
      assert.equal(algorithm.algorithmName, 'algorithm name');
      assert.equal(algorithm.algorithmDescription, 'algorithm description');
      assert.equal(algorithm.codeExample, 'code');

      assert.deepEqual(algorithm.inputData?.nodeList, [
         { id: 'A', labelText: 'A' },
         { id: 'B', labelText: 'B' }
      ]);
      assert.deepEqual(algorithm.inputData?.edgeList, [{ id: 0, startNode: 'A', endNode: 'B' }]);

      assert.deepEqual(algorithm.outputData?.nodeList, [
         { id: 'A', labelText: 'A' },
         { id: 'B', labelText: 'B' },
         { id: 'C', labelText: 'C' }
      ]);
      assert.deepEqual(algorithm.outputData?.edgeList, [{ id: 0, startNode: 'A', endNode: 'B', isDirected: true, weight: 5 }]);

      assert.deepEqual(algorithm.executionLog, []);
   });


   it('getter for inputData returns clone', () => {
      const algorithm = new Algorithm('graph', 'algorithm name', 'algorithm description', 'code');

      const cloneInputData = algorithm.inputData;
      assert.notEqual(algorithm.inputData?.nodeList, cloneInputData?.nodeList);
      assert.deepEqual(algorithm.inputData?.nodeList, cloneInputData?.nodeList);
      assert.notEqual(algorithm.inputData?.edgeList, cloneInputData?.edgeList);
      assert.deepEqual(algorithm.inputData?.edgeList, cloneInputData?.edgeList);
   });


   it('getter for outputData returns clone', () => {
      const algorithm = new Algorithm('graph', 'algorithm name', 'algorithm description', 'code');

      const cloneOutputData = algorithm.outputData;
      assert.notEqual(algorithm.outputData?.nodeList, cloneOutputData?.nodeList);
      assert.deepEqual(algorithm.outputData?.nodeList, cloneOutputData?.nodeList);
      assert.notEqual(algorithm.outputData?.edgeList, cloneOutputData?.edgeList);
      assert.deepEqual(algorithm.outputData?.edgeList, cloneOutputData?.edgeList);
   });


   it('getter for executionLog returns clone', () => {
      const algorithm = new Algorithm('graph', 'algorithm name', 'algorithm description', 'code');
      algorithm.execute();

      const cloneExecutionLog = algorithm.executionLog;
      assert.notEqual(algorithm.executionLog, cloneExecutionLog);
      assert.deepEqual(algorithm.executionLog, cloneExecutionLog);
      assert.notEqual(algorithm.executionLog[0].stepList, cloneExecutionLog[0].stepList);
      assert.deepEqual(algorithm.executionLog[0].stepList, cloneExecutionLog[0].stepList);
   });


   it('method addStage() adds a new stage to execution log', () => {
      const algorithm = new Algorithm('graph', 'algorithm name', 'algorithm description', 'code');
      assert.equal(algorithm.executionLog.length, 0);

      algorithm.addStageWrapper('stage name', 'stage description');
      assert.equal(algorithm.executionLog.length, 1);
      assert.equal(algorithm.executionLog[0].id, 0);
      assert.equal(algorithm.executionLog[0].name, 'stage name');
      assert.equal(algorithm.executionLog[0].description, 'stage description');
      assert.deepEqual(algorithm.executionLog[0].stepList, []);
   });


   it('method addStepToCurrentStage() adds a new step to current stage', () => {
      const algorithm = new Algorithm('graph', 'algorithm name', 'algorithm description', 'code');

      algorithm.addStageWrapper('stage name', 'stage description');
      algorithm.addStepToCurrentStageWrapper();

      assert.deepEqual(algorithm.executionLog[0].stepList.length, 1);

      const lastStep = algorithm.executionLog[0].stepList[0];
      assert.equal(lastStep.id, 0);
      assert.equal(lastStep.description, 'step description');
      assert.deepEqual(lastStep.data.nodeList, [
         { id: 'A', labelText: 'A' },
         { id: 'B', labelText: 'B' }
      ]);
      assert.deepEqual(lastStep.data.edgeList, [{ id: 0, startNode: 'A', endNode: 'B' }]);
      assert.deepEqual(lastStep.highlightData, { nodeHighlightList: ['A', 'B'], edgeHighlightList: [1, 4, 5] });
   });

});
