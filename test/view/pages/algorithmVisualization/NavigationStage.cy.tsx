import React from 'react';
import { NavigationStage } from '../../../../src/view/pages/algorithmVisualizationPage/NavigationStage/NavigationStage';
import { AlgorithmStage } from '../../../../src/model/algorithms/executionLog/AlgorithmStage';
import { AlgorithmStep } from '../../../../src/model/algorithms/executionLog/AlgorithmStep';
import { AlgorithmData, HighlightData } from '../../../../src/model/algorithms/algorithmTypes';
import { GraphInterface, GraphHighlightData } from '../../../../src/model/genericDataStructures/graph/graphTypes';


describe('<NavigationStage />', () => {

   it('renders', () => {
      const algorithmStage = new AlgorithmStage<AlgorithmData, HighlightData>(0, 'stageName', 'stageDescription');
      const step1 = new AlgorithmStep<GraphInterface, GraphHighlightData>(
         0,
         'step1',
         {
            nodeList: [{ id: 'A', labelText: 'A' }],
            edgeList: [{ id: 3, startNode: 'A', endNode: 'B' }],
            getListOfEdgesBetween: (a: string, b: string) => [
               { id: 1, startNode: a, endNode: b }
            ],
            getNeighborNodeListFor: (node: string) => [node]
         },
         { nodeHighlightList: ['A'], edgeHighlightList: [1] }
      );

      algorithmStage.addStep(step1);

      cy.mount(
         <NavigationStage
            algorithmStage={algorithmStage}
            isStageCompleted
            currentStepIndex={-1}
         />
      );
   });

});
