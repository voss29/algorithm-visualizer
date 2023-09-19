import React, { ReactElement } from 'react';
import { AlgorithmCategory } from '../shared/MenuBar/menuBarTypes';
import { AlgorithmDescriptionPage } from '../pages/algorithmDescriptionPage/AlgorithmDescriptionPage';
import { MenuBar } from '../shared/MenuBar/MenuBar';
import './app.css';



function App(): ReactElement {

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
                     loadPage: () => console.log('loading page dijkstra')
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
         <AlgorithmDescriptionPage />
      </>
   );
}


export { App };
