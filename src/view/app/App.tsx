import React, { ReactElement, useState, useEffect } from 'react';
import { AlgorithmCategory } from '../shared/MenuBar/menuBarTypes';
import { MenuBar } from '../shared/MenuBar/MenuBar';
import { AlgorithmExecutor } from '../../model/algorithms/AlgorithmExecutor';
import { AlgorithmData, HighlightData } from '../../model/algorithms/algorithmTypes';
import { AlgorithmContext } from './AppContext';
import { AppRouting } from './AppRouting';
import './app.css';

type Algorithm = AlgorithmExecutor<AlgorithmData, HighlightData> | undefined;


function App(): ReactElement {

   const [algorithm, setAlgorithm] = useState<Algorithm>();
   const [page, setPage] = useState<ReactElement>();

   const appRouter = new AppRouting(setAlgorithm);

   useEffect(() => setPage(appRouter.getPage()), []);

   const menuData: AlgorithmCategory[] = [
      {
         name: 'Graph Algorithms',
         isCategory: true,
         childList: [
            {
               name: 'Single Shortest Path',
               isCategory: true,
               childList: [
                  {
                     name: 'Dijkstra',
                     isCategory: false,
                     loadPage: () => appRouter.setPage('#dijkstraOverview')
                  }
               ]
            }
         ]
      },
      {
         name: 'Sorting Algorithms',
         isCategory: true,
         childList: []
      }
   ];

   return (
      <>
         <MenuBar menuCategoryList={menuData} />
         <AlgorithmContext.Provider value={algorithm}>
            { page }
         </AlgorithmContext.Provider>
      </>
   );
}


export { App };
