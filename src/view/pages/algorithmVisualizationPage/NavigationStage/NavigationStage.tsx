import React, { ReactElement, useState } from 'react';
import { AlgorithmData, HighlightData } from '../../../../model/algorithms/algorithmTypes';
import { AlgorithmStage } from '../../../../model/algorithms/executionLog/AlgorithmStage';
import { AlgorithmStep } from '../../../../model/algorithms/executionLog/AlgorithmStep';
import arrowDownIcon from '../../../icons/arrowDownIcon.svg';
import arrowUpIcon from '../../../icons/arrowUpIcon.svg';
import './navigationStage.css';


type Props = {
   algorithmStage: AlgorithmStage<AlgorithmData, HighlightData>,
   setStageId: (stageId: number) => void,
   setStepId: (stepId: number) => void,
   isStageCompleted?: boolean,
   currentStepIndex?: number
};


function NavigationStage(props: Props): ReactElement {
   const {
      algorithmStage,
      setStageId,
      setStepId,
      isStageCompleted = false,
      currentStepIndex = -1
   } = props;

   const [isExtended, setIsExtended] = useState(currentStepIndex >= 0);


   function buildStatusStateClass() {
      const output = (isStageCompleted) ? 'statusCompleted' : 'statusPending';
      return output;
   }


   function buildImageSource() {
      const source = (isExtended) ? arrowUpIcon : arrowDownIcon;
      return source;
   }


   function buildStepContainer(): ReactElement | null {
      if (!isExtended) {
         return null;
      }

      let stepList: AlgorithmStep<AlgorithmData, HighlightData>[] = [];

      if (isStageCompleted) {
         stepList = algorithmStage.stepList;
      } else {
         stepList = algorithmStage.stepList.filter((step) => step.id <= currentStepIndex);
      }

      const elementList = stepList.map(
         (step, index) => (
            <button
               key={index}
               type="button"
               className="navigationStageStep"
               onClick={() => setStepId(step.id)}
            >
               {step.description}
            </button>
         )
      );
      return <section>{elementList}</section>;
   }


   function handleStageClick() {
      setIsExtended(!isExtended);
      setStageId(algorithmStage.id);
   }


   return (
      <>
         <section className="navigationStageContainer">
            <button
               type="button"
               className="navigationStage"
               onClick={handleStageClick}
            >
               <div className={`navigationStageStatus ${buildStatusStateClass()}`} />
               <div className="navigationStageName">{algorithmStage.name}</div>
               <img src={buildImageSource()} alt="" width="20" height="20" draggable="false" />
            </button>
         </section>
         { buildStepContainer() }
      </>
   );
}


export { NavigationStage };
