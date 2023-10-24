import React, { ReactElement, useState } from 'react';
import { AlgorithmData, HighlightData } from '../../../../model/algorithms/algorithmTypes';
import { AlgorithmStage } from '../../../../model/algorithms/executionLog/AlgorithmStage';
import { AlgorithmStep } from '../../../../model/algorithms/executionLog/AlgorithmStep';


type Props = {
   algorithmStage: AlgorithmStage<AlgorithmData, HighlightData>,
   isStageCompleted?: boolean,
   currentStepIndex?: number
};


function NavigationStage(props: Props): ReactElement {
   const { algorithmStage, isStageCompleted = false, currentStepIndex = -1 } = props;
   const [isExtended, setIsExtended] = useState(currentStepIndex >= 0);


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

      const elementList = stepList.map((step) => <p>{step.description}</p>);
      return <section>{elementList}</section>;
   }


   return (
      <>
         <section className="navigationStageContainer">
            <button
               type="button"
               className="navigationStage"
               onClick={() => setIsExtended(!isExtended)}
            >
               <div className="navigationStageStatus" />
               <div>{algorithmStage.name}</div>
            </button>
         </section>
         { buildStepContainer() }
      </>


   );
}


export { NavigationStage };
