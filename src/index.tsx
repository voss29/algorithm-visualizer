/* eslint-disable react/no-danger */
// import React, { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './view/app/App';

const applicationContainer = document.getElementById('reactApp');

if (applicationContainer) {
   const root = createRoot(applicationContainer);

   // TODO: Reactivate after demonstration

   // Deactivated because strict mode causes react to run the setup twice which will interfere
   // with the temporary logging of the graph generation

   // root.render(<StrictMode><App /></StrictMode>);

   root.render(<App />);
}
