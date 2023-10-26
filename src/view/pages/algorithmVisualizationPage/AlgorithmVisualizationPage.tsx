/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useContext, useState } from 'react';
import { AlgorithmContext } from '../../app/AppContext';
import { NavigationStage } from './NavigationStage/NavigationStage';
import { GraphVisualization } from '../../shared/GraphVisualization/GraphVisualization';
import { ControlBar } from './ControlBar/ControlBar';


function AlgorithmVisualizationPage(): ReactElement {

   const algorithm = useContext(AlgorithmContext);

   const [stageId, setStageId] = useState(0);
   const [stepId, setStepId] = useState(0);
   const [speed, setSpeed] = useState(5_000);
   const [animationId, setAnimationId] = useState(-1);


   function startAnimation(durationInMilliseconds: number) {
      const intervalId = window.setInterval(
         () => {},
         durationInMilliseconds
      );
      setAnimationId(intervalId);
   }


   function pauseAnimation() {
      window.clearInterval(animationId);
   }


   function buildMermaidParserConfigForCurrentGraph() {
      const currentStep = algorithm?.executionLog[stageId].stepList[stepId];
      if (currentStep) {
         return algorithm.buildParserConfig(currentStep.data, currentStep.highlightData);
      }
      return undefined;
   }


   function buildStageList(): ReactElement[] | undefined {
      const stageList = algorithm?.executionLog
         .filter((stage) => stage.id <= stageId)
         .map((stage, index) => {
            const isStageCompleted = stage.id < stageId;
            const isStageActive = stage.id === stageId;
            const currentStepIndex = (isStageActive) ? stepId : -1;

            return (
               <NavigationStage
                  key={index}
                  algorithmStage={stage}
                  setStageId={setStageId}
                  setStepId={setStepId}
                  isStageCompleted={isStageCompleted}
                  currentStepIndex={currentStepIndex}
               />
            );
         });

      return stageList;
   }


   const stepAmount = 0 ?? algorithm?.executionLog[stageId].stepList.length;
   const isCurrentStageCompleted = stepId >= stepAmount;

   const stageAmount = 0 ?? algorithm?.executionLog.length;
   const isVisualizationFinished = stageId === stageAmount;

   if (isCurrentStageCompleted && !isVisualizationFinished) {
      setStageId(stageId + 1);
      setStepId(0);
   }

   if (isVisualizationFinished) {
      pauseAnimation();
   }


   return (
      <main className="algorithmVisualizationPage">
         <section>
            <h2>{`Visualization ${algorithm?.algorithmName}`}</h2>
            <GraphVisualization parserConfig={buildMermaidParserConfigForCurrentGraph()} />
            <ControlBar
               speed={speed}
               setSpeed={setSpeed}
               startAnimation={startAnimation}
               pauseAnimation={pauseAnimation}
            />
         </section>
         <nav>
            {buildStageList()}
         </nav>
      </main>
   );
}


export { AlgorithmVisualizationPage };
