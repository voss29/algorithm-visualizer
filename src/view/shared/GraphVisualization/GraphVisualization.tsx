import React, { ReactElement, useEffect, useState } from 'react';
import mermaid from 'mermaid';
import { parseMermaidGraph, MermaidGraphParserConfig } from './mermaidGraphParser';
import './graphVisualization.css';


type Props = {
   parserConfig?: MermaidGraphParserConfig
};


function GraphVisualization(props: Props): ReactElement | null {
   const { parserConfig } = props;

   const [graphSVGString, setGraphSVGString] = useState('');

   useEffect(() => {
      async function renderSVG() {
         if (parserConfig) {
            const parsedGraphDefinition = parseMermaidGraph(parserConfig);
            const { svg } = await mermaid.render('graph', parsedGraphDefinition);
            setGraphSVGString(svg);
         }
      }
      renderSVG();
   }, []);

   if (parserConfig) {
      // TODO: find better solution
      // eslint-disable-next-line react/no-danger
      return <div dangerouslySetInnerHTML={{ __html: graphSVGString }} />;
   }

   return null;
}


export { GraphVisualization };
