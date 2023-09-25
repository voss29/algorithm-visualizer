import { cloneDeep } from 'lodash';
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
      return cloneDeep(this.#stepList);
   }

   addStep(step: AlgorithmStep<Data, Highlight>) {
      this.#stepList.push(step);
   }

}


export { AlgorithmStage };
