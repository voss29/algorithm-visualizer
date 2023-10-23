import { AlgorithmData, HighlightData, AlgorithmType } from './algorithmTypes';
import { AlgorithmStage } from './executionLog/AlgorithmStage';
import { AlgorithmStep } from './executionLog/AlgorithmStep';
import { Graph } from '../genericDataStructures/graph/Graph';
import { MermaidGraphParserConfig } from '../../view/shared/GraphVisualization/mermaidGraphParser';


abstract class AlgorithmExecutor<Data extends AlgorithmData, Highlight extends HighlightData> {

   #algorithmType: AlgorithmType;
   #algorithmName: string;
   #algorithmDescription: string;
   #codeExample: string;
   #inputData: Data | null;
   #outputData: Data | null;
   #executionLog: AlgorithmStage<Data, Highlight>[];


   constructor(type: AlgorithmType, name: string, description: string, codeExample: string) {
      this.#algorithmType = type;
      this.#algorithmName = name;
      this.#algorithmDescription = description;
      this.#codeExample = codeExample;
      this.#inputData = null;
      this.#outputData = null;
      this.#executionLog = [];
   }


   get algorithmType() {
      return this.#algorithmType;
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


   abstract buildParserConfig(data: Data, highlightData: Highlight): MermaidGraphParserConfig;


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
