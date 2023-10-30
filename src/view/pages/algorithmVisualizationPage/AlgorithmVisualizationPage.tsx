/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useContext, useState, useEffect, useRef } from 'react';
import { AlgorithmContext } from '../../app/AppContext';
import { NavigationStage } from './NavigationStage/NavigationStage';
import { GraphVisualization } from '../../shared/GraphVisualization/GraphVisualization';
import { ControlBar } from './ControlBar/ControlBar';


function useAsyncReference<T>(value: T) {
   const ref = useRef(value);
   const [, forceRerender] = useState(false);

   function updateState(state: T) {
      const isStateDifferent = !Object.is(ref.current, state);
      if (isStateDifferent) {
         ref.current = state;
         forceRerender((stateValue) => !stateValue);
      }
   }

   return { state: ref, setState: updateState };
}


function AlgorithmVisualizationPage(): ReactElement {

   const algorithm = useContext(AlgorithmContext);

   const { state: stageId, setState: setStageId } = useAsyncReference(0);
   const { state: stepId, setState: setStepId } = useAsyncReference(0);
   const speed = useRef(4_000);
   const animationId = useRef(0);


   useEffect(
      () => {
         startAnimation();
         const cleanUp = () => {
            window.clearInterval(animationId.current);
            animationId.current = 0;
         };
         return cleanUp;
      },
      []
   );


   function incrementStepId() {
      const stepAmount = algorithm?.executionLog[stageId.current].stepList.length ?? 0;
      const isCurrentStageCompleted = stepId.current === stepAmount;

      const stageAmount = algorithm?.executionLog.length ?? 0;
      const isFinalStage = stageId.current === stageAmount - 1;

      if (!isCurrentStageCompleted) {
         setStepId(stepId.current + 1);
         return;
      }

      if (isCurrentStageCompleted && !isFinalStage) {
         setStageId(stageId.current + 1);
         setStepId(0);
         return;
      }

      if (isCurrentStageCompleted && isFinalStage) {
         pauseAnimation();
      }
   }


   function startAnimation() {
      const id = window.setInterval(incrementStepId, speed.current);
      animationId.current = id;
   }


   function pauseAnimation() {
      window.clearInterval(animationId.current);
   }


   function buildMermaidParserConfigForCurrentGraph() {
      const currentStep = algorithm?.executionLog[stageId.current].stepList[stepId.current];
      if (currentStep) {
         return algorithm.buildParserConfig(currentStep.data, currentStep.highlightData);
      }
      return undefined;
   }


   function buildStageList(): ReactElement[] | undefined {
      const stageList = algorithm?.executionLog
         .filter((stage) => stage.id <= stageId.current)
         .map((stage, index) => {
            const isStageCompleted = stage.id < stageId.current;
            const isStageActive = stage.id === stageId.current;
            const currentStepIndex = (isStageActive) ? stepId.current : -1;

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


   return (
      <main className="algorithmVisualizationPage">
         <section>
            <h2>{`Visualization ${algorithm?.algorithmName}`}</h2>
            <GraphVisualization parserConfig={buildMermaidParserConfigForCurrentGraph()} />
            <ControlBar
               speed={speed}
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
