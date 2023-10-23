/* eslint-disable no-case-declarations */
import React, { ReactElement } from 'react';
import { LandingPage } from '../pages/landingPage/LandingPage';
import { AlgorithmData, HighlightData } from '../../model/algorithms/algorithmTypes';
import { AlgorithmExecutor } from '../../model/algorithms/AlgorithmExecutor';
import { Dijkstra } from '../../model/algorithms/graphAlgorithms/Dijkstra';
import { AlgorithmDescriptionPage } from '../pages/algorithmDescriptionPage/AlgorithmDescriptionPage';


type Algorithm = AlgorithmExecutor<AlgorithmData, HighlightData> | undefined;


class AppRouting {

   #componentRoutingMap = new Map<string, ReactElement>();
   #setAlgorithm: (a: Algorithm) => void;


   constructor(setAlgorithm: (a: Algorithm) => void) {
      this.#setAlgorithm = setAlgorithm;
      this.#componentRoutingMap.set('#landingPage', <LandingPage />);
      this.#componentRoutingMap.set('#dijkstraOverview', <AlgorithmDescriptionPage setPage={this.setPage} />);
   }


   setPage(pageId: string) {
      window.location.assign(`${window.location.origin}${window.location.pathname}${pageId}`);
      window.location.reload();
   }


   getPage(): ReactElement | undefined {
      if (window.location.hash === '') {
         this.setPage('#landingPage');
      }
      const pageId = window.location.hash;
      this.#routeAlgorithm(pageId);
      const pageCompontent = this.#componentRoutingMap.get(pageId);
      return pageCompontent;
   }


   #routeAlgorithm(pageId: string) {
      switch (pageId) {

         case '#dijkstraOverview':
            const algorithm = new Dijkstra();
            algorithm.execute();
            this.#setAlgorithm(algorithm);
            break;

         default:
            this.#setAlgorithm(undefined);

      }
   }

}

export { AppRouting };
