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
         const parsedGraphDefinition = parseMermaidGraph(parserConfig);
         const { svg } = await mermaid.render('graph', parsedGraphDefinition);
         setGraphSVGString(svg);
      }

      renderSVG();
   }, []);

   // eslint-disable-next-line react/no-danger
   return <div dangerouslySetInnerHTML={{ __html: graphSVGString }} />;
}


export { GraphVisualization };
