/* eslint-disable no-console */
import React, { ReactElement, useState, useEffect } from 'react';
import { GraphGeneratorConfig } from '../../../model/dataGenerators/dataGeneratorTypes';
import { generateRandomGraph } from '../../../model/dataGenerators/graphGenerator';
import { GraphVisualization } from '../../shared/GraphVisualization/GraphVisualization';
import { MermaidGraphParserConfig } from '../../shared/GraphVisualization/mermaidGraphParser';
import './algorithmDescriptionPage.css';


function AlgorithmDescriptionPage(): ReactElement {

   const [mermaidParserConfig, setMermaidParserConfig] = useState<MermaidGraphParserConfig>();


   useEffect(() => {
      generateNewGraph();
   }, []);


   function generateNewGraph() {
      // TEMPORARY LOGGING FOR DEMONSTRATION
      console.log('======= Random Graph Generation =======');
      console.log('Files for random graph generation:');
      console.table({
         internalGraphRepresentation: './src/model/genericDataStructures/Graph.ts',
         randomGraphGenerator: './src/model/dataGenerators/graphGenerator.ts',
         mermaidParser: './src/view/shared/GraphVisualization/mermaidGraphParser.ts'
      });

      const graphConfig: GraphGeneratorConfig = {
         nodeAmount: { min: 5, max: 8 },
         edgesPerNode: { min: 1, max: 3 },
         edgeWeight: { min: 2, max: 10 },
         allowRecursiveEdges: true
      };
      console.log(' ');
      console.log(' ');

      console.log('Configuration for graph generator:');
      console.log(graphConfig);
      console.log(' ');
      console.log(' ');

      const generatedGraph = generateRandomGraph(graphConfig);

      console.log('Randomly generated graph:');
      console.log(generatedGraph);
      console.log(' ');
      console.log(' ');

      const parserConfig: MermaidGraphParserConfig = {
         graph: generatedGraph,
         direction: 'LR',
         nodeHighlightList: ['A', 'C', 'E'],
         edgeHighlightList: [0, 1, 2],
      };

      console.log('Configuration for mermaid parser:');
      console.log(parserConfig);
      console.log(' ');
      console.log(' ');

      setMermaidParserConfig(parserConfig);
   }


   function visualizeGraph(): ReactElement {
      if (mermaidParserConfig) {
         return <GraphVisualization parserConfig={mermaidParserConfig} />;
      }
      return <p>Failed to configure mermaid parser</p>;
   }


   return (
      <main className="algorithmDescriptionPage">
         <header>
            <h2>Dijkstra&apos;s Algorithm</h2>
         </header>
         <section>
            <h3>Input Data</h3>
            { visualizeGraph() }
         </section>
         <section>
            <h3>Output Data</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sint doloremque vero
            itaque accusamus, eligendi quaerat minus deserunt sed nihil quod placeat, iure nemo
            laudantium voluptates a atque voluptatum tempore! Ad nulla velit ratione quos doloremque
            tenetur magnam reprehenderit deleniti molestias sunt similique, perferendis accusamus a,
            quia, consequatur reiciendis praesentium doloribus voluptate officia veritatis
            repellendus provident? Voluptates labore autem officiis. Libero magni minus officiis ex
            dolorem iusto dicta a aliquid, consequatur consectetur sapiente accusantium veniam sit
            amet. Consequatur, doloremque nobis? Architecto iusto dignissimos recusandae quod
            numquam quis et eaque commodi. Perferendis reiciendis tempora aperiam nam voluptatibus
            neque perspiciatis fugit a deleniti. Unde saepe debitis ratione totam quidem consectetur
            molestias, nam facilis placeat laboriosam. Iste, itaque.
         </section>
         <section>
            <h3>Core Ideas</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sint doloremque vero
            itaque accusamus, eligendi quaerat minus deserunt sed nihil quod placeat, iure nemo
            laudantium voluptates a atque voluptatum tempore! Ad nulla velit ratione quos doloremque
            tenetur magnam reprehenderit deleniti molestias sunt similique, perferendis accusamus a,
            quia, consequatur reiciendis praesentium doloribus voluptate officia veritatis
            repellendus provident? Voluptates labore autem officiis. Libero magni minus officiis ex
            dolorem iusto dicta a aliquid, consequatur consectetur sapiente accusantium veniam sit
            amet. Consequatur, doloremque nobis? Architecto iusto dignissimos recusandae quod
            numquam quis et eaque commodi. Perferendis reiciendis tempora aperiam nam voluptatibus
            neque perspiciatis fugit a deleniti. Unde saepe debitis ratione totam quidem consectetur
            molestias, nam facilis placeat laboriosam. Iste, itaque. Totam numquam reiciendis hic
            cumque! Quisquam, et libero culpa vero ut animi minima odit ea temporibus fugit ducimus
            blanditiis? Odit cumque a expedita in amet, ea possimus. Ipsa eius, quae consequuntur
            mollitia perferendis vitae quo! Adipisci illum, libero deleniti quos dignissimos,
            aspernatur dolor accusamus reprehenderit exercitationem architecto cum quia mollitia
            distinctio. Fugiat omnis quasi recusandae quas sequi, doloribus, possimus laudantium
            asperiores earum dignissimos eveniet. Cupiditate. Fugit tempore quaerat, maiores
            explicabo sunt, necessitatibus cupiditate saepe nesciunt dolore molestias nemo
            quia at ab praesentium repellendus eligendi ratione nam quae, nulla magnam. Repellat
            veniam odio commodi quasi similique?
         </section>
         <section>
            <h3>Code</h3>
            <code>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia sint doloremque vero
            itaque accusamus, eligendi quaerat minus deserunt sed nihil quod placeat, iure nemo
            laudantium voluptates a atque voluptatum tempore! Ad nulla velit ratione quos doloremque
            tenetur magnam reprehenderit deleniti molestias sunt similique, perferendis accusamus a,
            quia, consequatur reiciendis praesentium doloribus voluptate officia veritatis
            repellendus provident? Voluptates labore autem officiis. Libero magni minus officiis ex
            dolorem iusto dicta a aliquid, consequatur consectetur sapiente accusantium veniam sit
            amet. Consequatur, doloremque nobis?
            </code>
         </section>
      </main>
   );
}


export { AlgorithmDescriptionPage };
