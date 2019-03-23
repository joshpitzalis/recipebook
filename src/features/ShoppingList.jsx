import React from 'react';
import { RecipeConsumer } from '../Context/RecipeContext';

const propTypes = {};

const defaultProps = {};

export const ShoppingList = () => (
  <>
    <RecipeConsumer>
      {({ selectedRecipes }) => (
        <ul>
          {selectedRecipes &&
            selectedRecipes
              .reduce((total, item) => {
                total.push(...item.ingredients);
                return total;
              }, [])
              .map((item, index) => (
                <li className=" mb2" key={index}>
                  {item.value} - {item.ingredient}
                </li>
              ))}
        </ul>
      )}
    </RecipeConsumer>
  </>
);

ShoppingList.propTypes = propTypes;
ShoppingList.defaultProps = defaultProps;
