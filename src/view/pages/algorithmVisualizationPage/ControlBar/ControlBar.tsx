/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ReactElement, MutableRefObject, useState } from 'react';
import playIcon from '../../../icons/playIcon.svg';
import pauseIcon from '../../../icons/pauseIcon.svg';


type Props = {
   speed: MutableRefObject<number>,
   startAnimation: (durationInMilliseconds: number) => void,
   pauseAnimation: () => void
};


function ControlBar(props: Props): ReactElement {

   const { speed, startAnimation, pauseAnimation } = props;
   const [isPaused, setIsPaused] = useState(false);

   const startClick = () => { startAnimation(speed.current); setIsPaused(false); };
   const pause = () => { pauseAnimation(); setIsPaused(true); };


   function buildPlayButton(): ReactElement {
      if (isPaused) {
         return (
            <button type="button" onClick={startClick}>
               <img src={playIcon} alt="Resume" width="20" height="20" />
            </button>
         );
      }
      return (
         <button type="button" onClick={pause}>
            <img src={pauseIcon} alt="Resume" width="20" height="20" />
         </button>
      );
   }


   return (
      <section className="controlBar">
         <label>
            <input
               type="range"
               name="speed"
               min="1"
               max="10"
               value={speed.current}
               onChange={(e) => { speed.current = Number.parseInt(e.target.value, 10); }}
            />
            Speed
         </label>
         { buildPlayButton() }
      </section>
   );
}


export { ControlBar };
