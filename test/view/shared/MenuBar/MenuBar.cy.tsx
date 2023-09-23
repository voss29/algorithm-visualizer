import React from 'react';
import { MenuBar } from '../../../../src/view/shared/MenuBar/MenuBar';
import { AlgorithmCategory } from '../../../../src/view/shared/MenuBar/menuBarTypes';


describe('<MenuBar />', () => {

   let menuCategoryList: AlgorithmCategory[];


   beforeEach(() => {
      menuCategoryList = [
         {
            name: 'categoryName1',
            isCategory: true,
            childList: [
               {
                  name: 'subcategoryName1.1',
                  isCategory: true,
                  childList: [{
                     name: 'optionName1.1',
                     isCategory: false,
                     loadPage: () => {}
                  }]
               },
               {
                  name: 'optionName1.2',
                  isCategory: false,
                  loadPage: () => {}
               }
            ]
         }
      ];
   });


   it('renders initial menu correctly', () => {
      cy.mount(<MenuBar menuCategoryList={menuCategoryList} />);

      const menuContainer = cy.get('.menuBar');
      menuContainer.should('exist');
      menuContainer.should('have.class', 'menuBarCollapsed');

      const header = cy.get('header');
      header.should('exist');
      header.should('not.be.visible');
      header.should('contain.html', 'img');
      header.should('contain.html', 'h2');
      cy.get('header > h2').should('contain.text', 'Algorithm Visualizer');

      const menuIcon = cy.get('.menuIconContainer > img');
      menuIcon.should('exist');
      menuIcon.should('be.visible');

      const sideBar = cy.get('aside');
      sideBar.should('exist');
      sideBar.should('be.visible');

      const nav = cy.get('nav');
      nav.should('exist');
      nav.should('not.be.visible');

      const menuItem = cy.get('.menuItemContainer');
      menuItem.should('exist');
      menuItem.should('not.be.visible');
      menuItem.should('contain.html', 'h3');
      cy.get('.menuItemContainer > h3').should('have.text', 'categoryName1');

      const menuOptions = cy.get('.menuItemOptionContainer');
      menuOptions.should('exist');
      menuOptions.should('not.be.visible');

      const menuOption1 = cy.get('.menuItemOptionContainer > :nth-child(1)');
      menuOption1.should('exist');
      menuOption1.should('not.be.visible');
      menuOption1.should('have.class', 'menuItemSubCategory');
      menuOption1.should('contain.text', 'subcategoryName1.1');

      const menuOption2 = cy.get('.menuItemOptionContainer > :nth-child(2)');
      menuOption2.should('exist');
      menuOption2.should('not.be.visible');
      menuOption2.should('not.have.class', 'menuItemSubCategory');
      menuOption2.should('contain.text', 'optionName1.2');
   });


   it('renders expanded menu correctly when hovered', () => {
      cy.mount(<MenuBar menuCategoryList={menuCategoryList} />);

      const menuContainer = cy.get('.menuBar');
      menuContainer.should('exist');
      menuContainer.should('have.class', 'menuBarCollapsed');
      menuContainer.trigger('pointerover', { force: true });
      menuContainer.should('have.class', 'menuBarExpanded');

      const header = cy.get('header');
      header.should('exist');
      header.should('be.visible');
      header.should('contain.html', 'img');
      header.should('contain.html', 'h2');
      cy.get('header > h2').should('contain.text', 'Algorithm Visualizer');

      const menuIcon = cy.get('.menuIconContainer > img');
      menuIcon.should('exist');
      menuIcon.should('be.visible');

      const sideBar = cy.get('aside');
      sideBar.should('exist');
      sideBar.should('be.visible');

      const nav = cy.get('nav');
      nav.should('exist');
      nav.should('be.visible');

      const menuItem = cy.get('.menuItemContainer');
      menuItem.should('exist');
      menuItem.should('be.visible');
      menuItem.should('contain.html', 'h3');
      cy.get('.menuItemContainer > h3').should('have.text', 'categoryName1');

      const menuOptions = cy.get('.menuItemOptionContainer');
      menuOptions.should('exist');
      menuOptions.should('be.visible');

      const menuOption1 = cy.get('.menuItemOptionContainer > :nth-child(1)');
      menuOption1.should('exist');
      menuOption1.should('be.visible');
      menuOption1.should('have.class', 'menuItemSubCategory');
      menuOption1.should('contain.text', 'subcategoryName1.1');

      const menuOption2 = cy.get('.menuItemOptionContainer > :nth-child(2)');
      menuOption2.should('exist');
      menuOption2.should('be.visible');
      menuOption2.should('not.have.class', 'menuItemSubCategory');
      menuOption2.should('contain.text', 'optionName1.2');
   });


   it('displays selected submenu correctly', () => {
      cy.mount(<MenuBar menuCategoryList={menuCategoryList} />);
      cy.get('.menuBar').trigger('pointerover', { force: true });

      let subMenuBackNavigationButton = cy.get('.menuBarSubMenuNavigation');
      subMenuBackNavigationButton.should('not.exist');

      cy.get('.menuItemOptionContainer > :nth-child(1)').click();

      subMenuBackNavigationButton = cy.get('.menuBarSubMenuNavigation');
      subMenuBackNavigationButton.should('exist');
      subMenuBackNavigationButton.should('contain.html', 'img');
      subMenuBackNavigationButton.should('contain.text', 'Main Menu');

      cy.get('.menuItemContainer > h3').should('have.text', 'subcategoryName1.1');

      const menuItemElement = cy.get('.menuItemOptionContainer > :nth-child(1)');
      menuItemElement.should('exist');
      menuItemElement.should('have.text', 'optionName1.1');
   });


});
