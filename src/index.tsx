/* eslint-disable react/no-danger */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Test } from './Test';
import './styleTest.css';


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


const applicationContainer = document.getElementById('reactApp');

if (applicationContainer) {
   const root = createRoot(applicationContainer);
   root.render(
      <StrictMode>
         <Test mermaidGraphDefinition={graphDefinition} />
      </StrictMode>
   );
}
