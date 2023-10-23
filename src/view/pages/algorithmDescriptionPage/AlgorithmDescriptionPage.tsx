/* eslint-disable no-case-declarations */
import React, { ReactElement, useContext } from 'react';
import { GraphVisualization } from '../../shared/GraphVisualization/GraphVisualization';
import { AlgorithmData } from '../../../model/algorithms/algorithmTypes';
import { GraphInterface } from '../../../model/genericDataStructures/graph/graphTypes';
import { AlgorithmContext } from '../../app/AppContext';
import './algorithmDescriptionPage.css';


function AlgorithmDescriptionPage(): ReactElement {

   const algorithm = useContext(AlgorithmContext);


   function buildVisualizationCompontent(data?: AlgorithmData | null): ReactElement | null {
      if (!data) {
         return null;
      }

      switch (algorithm?.algorithmType) {

         case 'graph':
            const config = algorithm.buildParserConfig(
               data as GraphInterface,
               { nodeHighlightList: ['A'], edgeHighlightList: [] }
            );
            return <GraphVisualization parserConfig={config} />;

         case 'sorting':
            return <p>Visualization of sorting algorithm is not implemented yet</p>;

         default:
            return null;

      }
   }


   return (
      <main className="algorithmDescriptionPage">
         <header>
            <h2>Dijkstra&apos;s Algorithm</h2>
         </header>
         <section>
            <h3>Input Data</h3>
            { buildVisualizationCompontent(algorithm?.inputData) }
         </section>
         <section>
            <h3>Output Data</h3>
            { buildVisualizationCompontent(algorithm?.outputData) }
         </section>
         <section>
            <h3>Core Ideas</h3>
            <p>{algorithm?.algorithmDescription}</p>
         </section>
         <section>
            <h3>Code</h3>
            <code>{algorithm?.codeExample}</code>
         </section>
      </main>
   );
}


export { AlgorithmDescriptionPage };
