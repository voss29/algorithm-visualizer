import React, { ReactElement } from 'react';
import { AlgorithmCategory } from '../menuBarTypes';
import arrowRightIcon from '../../../icons/arrowRightIcon.svg';
import './menuItem.css';


type Props = {
   category: AlgorithmCategory,
   selectCategory: (categoryName: string) => void
};


function MenuItem(itemData: Props): ReactElement {
   const { category, selectCategory } = itemData;


   function buildSubItemList(): ReactElement[] {
      return category.childList.map((child, index) => {

         const { isCategory, name } = child;
         const className = (isCategory) ? 'menuItemSubCategory' : '';
         const clickHandler = (isCategory) ? () => selectCategory(name) : child.loadPage;

         return (
            <button type="button" key={index} className={className} onClick={clickHandler}>
               {name}
               {(isCategory) ? <img src={arrowRightIcon} alt=">" width="20" height="20" draggable="false" /> : null}
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
