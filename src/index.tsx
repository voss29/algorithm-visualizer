/* eslint-disable react/no-danger */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GraphGeneratorConfig } from './model/dataGenerators/dataGeneratorTypes';
import { generateRandomGraph } from './model/dataGenerators/graphGenerator';
import { GraphVisualization } from './view/components/Graph/GraphVisualization';
import { MermaidGraphParserConfig } from './view/components/Graph/mermaidGraphParser';


/*
const graphDefinition = `
   %%{ init: { 'flowchart': { 'curve': 'linear' } } }%%
   flowchart LR
      1((1))
      2((2))
      3((3))
      1 -- 3 --- 2
      1 -- 5 --- 3
      2 -- 4 --- 3
      classDef startNode fill:red,stroke:black,stroke-width:2px,font-weight:bold
      classDef pathNode fill:orange,stroke:black,stroke-width:2px,font-weight:bold
      class 1 startNode
      class 2,3 pathNode
      linkStyle 0,2 stroke:red,stroke-width:4px
   `;
*/

const graphConfig: GraphGeneratorConfig = {
   nodeAmount: { min: 5, max: 10 },
   edgesPerNode: { min: 1, max: 3 },
   edgeWeight: { min: 2, max: 10 },
   allowRecursiveEdges: false
};

const randomGraph = generateRandomGraph(graphConfig);

const mermaidParserConfig: MermaidGraphParserConfig = {
   graph: randomGraph,
   direction: 'LR',
   nodeHighlightList: ['A', 'C', 'E'],
   nodeHighlightStyle: 'fill:red,stroke:black,stroke-width:2px,font-weight:bold',
   edgeHighlightList: [1, 2, 3, 4, 5],
   edgeHighlightStyle: 'stroke:blue,stroke-width:4px'
};

const applicationContainer = document.getElementById('reactApp');

if (applicationContainer) {
   const root = createRoot(applicationContainer);
   root.render(
      <StrictMode>
         <GraphVisualization parserConfig={mermaidParserConfig} />
      </StrictMode>
   );
}
