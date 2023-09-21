import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './view/app/App';

const applicationContainer = document.getElementById('reactApp');

if (applicationContainer) {
   const root = createRoot(applicationContainer);
   root.render(<StrictMode><App /></StrictMode>);
}
