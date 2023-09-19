import React, { ReactElement } from 'react';
import appIcon from '../../icons/appLogo.svg';
import './landingPage.css';


function LandingPage(): ReactElement {
   return (
      <div className="landingPage">
         <figure>
            <img src={appIcon} alt="Logo" width="150" height="150" draggable="false" />
            <figcaption>Algorithm Visualizer</figcaption>
         </figure>
      </div>
   );
}


export { LandingPage };
