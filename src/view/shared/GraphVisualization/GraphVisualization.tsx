/* eslint-disable no-console */
import React, { ReactElement, useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { parseMermaidGraph, MermaidGraphParserConfig } from './mermaidGraphParser';
import './graphVisualization.css';


type Props = {
   parserConfig: MermaidGraphParserConfig
};


function GraphVisualization(props: Props): ReactElement {
   const { parserConfig } = props;

   const [graphSVGString, setGraphSVGString] = useState('');

   useEffect(() => {
      async function renderSVG() {
         // TEMPORARY LOGGING FOR DEMONSTRATION

         const parsedGraphDefinition = parseMermaidGraph(parserConfig);

         console.log('Parsed markdown diagram definition:');
         console.log(parsedGraphDefinition);
         console.log(' ');
         console.log(' ');

         const { svg } = await mermaid.render('graph', parsedGraphDefinition);

         console.log('Graph rendered by mermaid js');
         setGraphSVGString(svg);
      }

      renderSVG();
   }, []);

   // TODO: find better solution
   // eslint-disable-next-line react/no-danger
   return <div dangerouslySetInnerHTML={{ __html: graphSVGString }} />;
}


export { GraphVisualization };
