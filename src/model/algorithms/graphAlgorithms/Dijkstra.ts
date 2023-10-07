import { AlgorithmExecutor } from '../AlgorithmExecutor';
import { GraphInterface, GraphHighlightData } from '../../genericDataStructures/graph/graphTypes';
import { GraphGeneratorConfig } from '../../dataGenerators/graph/dataGeneratorTypes';
import { generateRandomGraph } from '../../dataGenerators/graph/graphGenerator';


class Dijkstra extends AlgorithmExecutor<GraphInterface, GraphHighlightData> {

   constructor(graph?: GraphInterface) {
      const name = 'Dijkstra Algorithm';
      const description = 'algorithm description';
      const codeExample = 'code example';

      super(name, description, codeExample);
      this.#initializeInputData(graph);
   }


   execute() {
      // TODO: implement algorithm
   }


   #initializeInputData(graph?: GraphInterface) {
      if (graph) {
         super.setInputData(graph);
      } else {
         const graphGeneratorConfig: GraphGeneratorConfig = {
            nodeAmount: { min: 6, max: 8 },
            edgesPerNode: { min: 1, max: 3 },
            edgeWeight: { min: 1, max: 10 },
            allowRecursiveEdges: false
         };
         const randomGraph = generateRandomGraph(graphGeneratorConfig);
         super.setInputData(randomGraph);
      }
   }

}


export { Dijkstra };
