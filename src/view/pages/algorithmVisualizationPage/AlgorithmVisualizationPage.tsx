/* eslint-disable react/jsx-no-bind */
import React, { ReactElement, useContext, useState, useEffect, useRef } from 'react';
import { AlgorithmContext } from '../../app/AppContext';
import { NavigationStage } from './NavigationStage/NavigationStage';
import { GraphVisualization } from '../../shared/GraphVisualization/GraphVisualization';
import { ControlBar } from './ControlBar/ControlBar';


function AlgorithmVisualizationPage(): ReactElement {

   const algorithm = useContext(AlgorithmContext);

   const [stageId, setStageId] = useState(0);
   const [stepId, setStepId] = useState(0);
   const [speed, setSpeed] = useState(5_000);
   const [animationId, setAnimationId] = useState(0);

   const refStageId = useRef(stageId);
   const refStepId = useRef(stepId);
   const refSpeed = useRef(speed);
   const refAnimationId = useRef(animationId);


   useEffect(
      () => {
         startAnimation();
         const cleanUp = () => {
            window.clearInterval(refAnimationId.current);
            setAnimationId(0);
            refAnimationId.current = 0;
         };
         return cleanUp;
      },
      []
   );


   function incrementStepId() {
      const stepAmount = 0 ?? algorithm?.executionLog[refStageId.current].stepList.length;
      const isCurrentStageCompleted = refStepId.current >= stepAmount;

      const stageAmount = 0 ?? algorithm?.executionLog.length;
      const isVisualizationFinished = refStageId.current === stageAmount;

      if (isVisualizationFinished) {
         pauseAnimation();
         return;
      }

      if (!isCurrentStageCompleted) {
         setStepId((id) => id + 1);
         refStepId.current += 1;
         return;
      }

      if (isCurrentStageCompleted && !isVisualizationFinished) {
         setStageId((id) => id + 1);
         refStageId.current += 1;
         setStepId(0);
         refStepId.current = 0;
      }
   }


   function startAnimation() {
      const id = window.setInterval(incrementStepId, refSpeed.current);
      setAnimationId(id);
      refAnimationId.current = id;
   }


   function pauseAnimation() {
      window.clearInterval(refAnimationId.current);
   }


   function buildMermaidParserConfigForCurrentGraph() {
      const currentStep = algorithm?.executionLog[refStageId.current].stepList[refStageId.current];
      if (currentStep) {
         return algorithm.buildParserConfig(currentStep.data, currentStep.highlightData);
      }
      return undefined;
   }


   function buildStageList(): ReactElement[] | undefined {
      const stageList = algorithm?.executionLog
         .filter((stage) => stage.id <= refStageId.current)
         .map((stage, index) => {
            const isStageCompleted = stage.id < refStageId.current;
            const isStageActive = stage.id === refStageId.current;
            const currentStepIndex = (isStageActive) ? refStepId.current : -1;

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
