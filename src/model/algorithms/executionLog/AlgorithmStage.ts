import { AlgorithmData, HighlightData } from '../algorithmTypes';
import { AlgorithmStep } from './AlgorithmStep';


class AlgorithmStage<Data extends AlgorithmData, Highlight extends HighlightData> {

   #id: number;
   #name: string;
   #description: string;
   #stepList: AlgorithmStep<Data, Highlight>[];

   constructor(id: number, name: string, description: string) {
      this.#id = id;
      this.#name = name;
      this.#description = description;
      this.#stepList = [];
   }

   get id() {
      return this.#id;
   }

   get name() {
      return this.#name;
   }

   get description() {
      return this.#description;
   }

   get stepList() {
      const cloneList = this.#stepList.map((step) => {
         const { id, description, data, highlightData } = step;
         return new AlgorithmStep(id, description, data, highlightData);
      });
      return cloneList;
   }

   addStep(step: AlgorithmStep<Data, Highlight>) {
      this.#stepList.push(step);
   }

}


export { AlgorithmStage };
