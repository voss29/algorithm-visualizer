import { AlgorithmData, HighlightData } from './algorithmTypes';
import { AlgorithmStage } from './executionLog/AlgorithmStage';
import { AlgorithmStep } from './executionLog/AlgorithmStep';
import { Graph } from '../genericDataStructures/graph/Graph';


abstract class AlgorithmExecutor<Data extends AlgorithmData, Highlight extends HighlightData> {

   #algorithmName: string;
   #algorithmDescription: string;
   #codeExample: string;
   #inputData: Data | null;
   #outputData: Data | null;
   #executionLog: AlgorithmStage<Data, Highlight>[];


   constructor(name: string, description: string, codeExample: string) {
      this.#algorithmName = name;
      this.#algorithmDescription = description;
      this.#codeExample = codeExample;
      this.#inputData = null;
      this.#outputData = null;
      this.#executionLog = [];
   }


   get algorithmName() {
      return this.#algorithmName;
   }


   get algorithmDescription() {
      return this.#algorithmDescription;
   }


   get codeExample() {
      return this.#codeExample;
   }


   get inputData() {
      if (this.#inputData?.nodeList) {
         return new Graph(this.#inputData?.nodeList, this.#inputData?.edgeList);
      }
      return null;
   }


   get outputData() {
      if (this.#outputData?.nodeList) {
         return new Graph(this.#outputData?.nodeList, this.#outputData?.edgeList);
      }
      return null;
   }


   get executionLog() {
      const executionLogClone = this.#executionLog.map((stage) => {
         const { id, name, description, stepList } = stage;
         const stageClone = new AlgorithmStage(id, name, description);
         stepList.forEach((step) => stageClone.addStep(step));
         return stageClone;
      });
      return executionLogClone;
   }


   protected setInputData(data: Data) {
      this.#inputData = data;
   }


   protected setOutputData(data: Data) {
      this.#outputData = data;
   }


   abstract execute(input?: any): void;


   protected addStage(name: string, description: string) {
      const stageId = this.#executionLog.length;
      const stage = new AlgorithmStage<Data, Highlight>(stageId, name, description);
      this.#executionLog.push(stage);
   }


   protected addStepToCurrentStage(description: string, data: Data, highlightData: Highlight) {
      const currentStage = this.#executionLog[this.#executionLog.length - 1];
      const stepId = currentStage.stepList.length;
      const step = new AlgorithmStep(stepId, description, data, highlightData);
      currentStage.addStep(step);
   }

}


export { AlgorithmExecutor };
