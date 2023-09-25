import { AlgorithmData, HighlightData } from '../algorithmTypes';


class AlgorithmStep<Data extends AlgorithmData, Highlight extends HighlightData> {

   #id: number;
   #description: string;
   #data: Data;
   #highlightData: Highlight;

   constructor(id: number, description: string, data: Data, highlightData: Highlight) {
      this.#id = id;
      this.#description = description;
      this.#data = data;
      this.#highlightData = highlightData;
   }

   get id() {
      return this.#id;
   }

   get description() {
      return this.#description;
   }

   get data() {
      return this.#data;
   }

   get highlightData() {
      return this.#highlightData;
   }

}


export { AlgorithmStep };
