import React, { ReactElement, useState } from 'react';
import { MenuItem } from './MenuItem/MenuItem';
import { AlgorithmCategory } from './menuBarTypes';
import appLogo from '../../icons/appLogo.svg';
import menuIcon from '../../icons/menuIcon.svg';
import backArrowIcon from '../../icons/backArrowIcon.svg';
import './menuBar.css';


type Props = {
   menuCategoryList: AlgorithmCategory[]
};


function MenuBar(props: Props): ReactElement {
   const { menuCategoryList } = props;

   const [isMenuBarExpanded, setIsMenuBarExpanded] = useState(false);
   const [selectedCategoryName, setSelectedCategoryName] = useState('');


   function generateMenuContent(): ReactElement[] | null {
      const selectCategory = (categoryName: string) => setSelectedCategoryName(categoryName);

      const renderMainMenu = selectedCategoryName === '';
      if (renderMainMenu) {
         return menuCategoryList.map((category, index) => (
            <MenuItem key={index} category={category} selectCategory={selectCategory} />
         ));
      }

      const selectedCategory = getSelectedCategory();
      const isValidSubcategory = selectedCategory && selectedCategory.isCategory;

      if (isValidSubcategory) {
         return ([
            <button
               type="button"
               key="1"
               className="menuBarSubMenuNavigation"
               onClick={() => setSelectedCategoryName('')}
            >
               <img src={backArrowIcon} alt="Back" width="40" height="40" draggable="false" />
               Main Menu
            </button>,
            <MenuItem key="2" category={selectedCategory} selectCategory={selectCategory} />
         ]);
      }

      return null;
   }


   function getSelectedCategory() {
      for (let i = 0; i < menuCategoryList.length; i++) {
         const topCategory = menuCategoryList[i];

         const subCategory = topCategory.childList.find(
            (subElement) => subElement.name === selectedCategoryName
         );

         if (subCategory) {
            return subCategory;
         }
      }
      return null;
   }


   return (
      <div
         className={`menuBar ${(isMenuBarExpanded) ? 'menuBarExpanded' : 'menuBarCollapsed'}`}
         onPointerEnter={() => setIsMenuBarExpanded(true)}
         onPointerLeave={() => setIsMenuBarExpanded(false)}
      >
         <header>
            <img src={appLogo} alt="Logo" width="40" height="40" draggable="false" />
            <h2>Algorithm Visualizer</h2>
         </header>
         <nav>{generateMenuContent()}</nav>
         <div className="menuIconContainer">
            <img src={menuIcon} alt="Menu" width="40" height="40" draggable="false" />
         </div>
         <aside />
      </div>
   );
}


export { MenuBar };
