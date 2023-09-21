import React, { ReactElement } from 'react';
import './algorithmDescriptionPage.css';


function AlgorithmDescriptionPage(): ReactElement {

   return (
      <main className="algorithmDescriptionPage">
         <header>
            <h2>Dijkstra&apos;s Algorithm</h2>
         </header>
         <section>
            <h3>Input Data</h3>
         </section>
         <section>
            <h3>Output Data</h3>
         </section>
         <section>
            <h3>Core Ideas</h3>
         </section>
         <section>
            <h3>Code</h3>
            <code>
               Code
            </code>
         </section>
      </main>
   );
}


export { AlgorithmDescriptionPage };
