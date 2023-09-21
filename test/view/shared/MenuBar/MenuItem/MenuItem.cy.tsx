import React from 'react';
import { MenuItem } from '../../../../../src/view/shared/MenuBar/MenuItem/MenuItem';
import { AlgorithmCategory } from '../../../../../src/view/shared/MenuBar/menuBarTypes';


describe('<MenuItem />', () => {


   let selectCategory: any;
   let loadPage: any;


   beforeEach(() => {
      selectCategory = { selectCategoryFn() {} };
      loadPage = { loadPageFn() {} };

      const category: AlgorithmCategory = {
         name: 'categoryName',
         isCategory: true,
         childList: [
            {
               name: 'subcategoryName',
               isCategory: true,
               childList: [{
                  name: 'optionName1',
                  isCategory: false,
                  loadPage: () => loadPage.loadPageFn()
               }]
            },
            {
               name: 'optionName2',
               isCategory: false,
               loadPage: () => loadPage.loadPageFn()
            }
         ]
      };

      cy.mount(
         <MenuItem
            category={category}
            selectCategory={() => selectCategory.selectCategoryFn()}
         />
      );
   });


   it('renders correctly', () => {
      const headerElement = cy.get('h3');
      headerElement.should('exist');
      headerElement.should('have.text', 'categoryName');

      const subCategoryElement = cy.get('.menuItemSubCategory');
      subCategoryElement.should('exist');
      subCategoryElement.should('have.text', 'subcategoryName');
      subCategoryElement.should('contain.html', 'img');

      const menuItemElement = cy.get('.menuItemOptionContainer > :nth-child(2)');
      menuItemElement.should('exist');
      menuItemElement.should('have.text', 'optionName2');
      menuItemElement.should('not.contain.html', 'img');
   });


   it('calls correct parameter functions when clicked', () => {
      cy.spy(selectCategory, 'selectCategoryFn').as('spySelectCategory');
      cy.spy(loadPage, 'loadPageFn').as('spyLoadPage');

      cy.get('.menuItemSubCategory').click();
      cy.get('@spySelectCategory').should('have.been.called');

      cy.get('.menuItemOptionContainer > :nth-child(2)').click();
      cy.get('@spyLoadPage').should('have.been.called');
   });

});
