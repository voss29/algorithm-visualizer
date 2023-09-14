/* eslint-disable react/no-danger */
import React, { useState, useEffect, ReactElement } from 'react';
import mermaid from 'mermaid';


type Props = {
   mermaidGraphDefinition: string
};


function Test(props: Props): ReactElement {
   const { mermaidGraphDefinition } = props;
   const [svgString, setSVGString] = useState('');


   useEffect(() => {
      const parseSVG = async () => {
         const { svg } = await mermaid.render('graph', mermaidGraphDefinition);
         setSVGString(svg);
      };
      parseSVG();
   }, []);


   return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
}


export { Test };
