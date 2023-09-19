import React, { ReactElement } from 'react';
import { AlgorithmCategory } from '../menuBarTypes';
import './menuItem.css';


type Props = {
   category: AlgorithmCategory,
   selectCategory: (categoryName: string) => void
};


function MenuItem(itemData: Props): ReactElement {
   const { category, selectCategory } = itemData;


   function buildSubItemList(): ReactElement[] {
      return category.childList.map((child) => {

         const { isCategory, name } = child;
         const className = (isCategory) ? 'menuItemSubCategory' : '';
         const clickHandler = (isCategory) ? () => selectCategory(name) : child.loadPage;
         const buttonText = `${name}${(isCategory) ? '>' : ''}`; // TODO: Replace with css ::after element

         return (
            <button type="button" className={className} onClick={clickHandler}>
               {buttonText}
            </button>
         );
      });
   }


   return (
      <div className="menuItemContainer">
         <h3>{category.name}</h3>
         <hr />
         <div className="menuItemOptionContainer">
            { buildSubItemList() }
         </div>
      </div>
   );

}


export { MenuItem };
