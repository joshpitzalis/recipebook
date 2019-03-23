import PropTypes from 'prop-types';
import React from 'react';
import { RecipeConsumer } from '../Context/RecipeContext';

export const RecipeList = () => (
  <RecipeConsumer>
    {({ recipes, selectRecipe, selectedRecipes, unselectRecipe }) =>
      recipes &&
      recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          index={index}
          name={recipe.name}
          description={recipe.description}
          ingredients={recipe.ingredients}
          id={recipe.id}
          selectRecipe={selectRecipe}
          selectedRecipes={selectedRecipes}
          unselectRecipe={unselectRecipe}
        />
      ))
    }
  </RecipeConsumer>
);

const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredients: PropTypes.string,
      val: PropTypes.number,
    })
  ),
  selectRecipe: PropTypes.func.isRequired,
  unselectRecipe: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  selectedRecipes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          ingredients: PropTypes.string,
          val: PropTypes.number,
        })
      ),
      id: PropTypes.string.isRequired,
    })
  ),
};

export const RecipeCard = ({
  name,
  description,
  ingredients,
  selectRecipe,
  id,
  selectedRecipes,
  unselectRecipe,
  image,
}) => {
  const isSelected = (recipes, idx) =>
    recipes.some(element => element.id === idx);
  const selected = isSelected(selectedRecipes, id);
  return (
    <div
      className={`mw5 center bg-white br3 pa3 pa4-ns mv3 ba pointer ${
        selected ? 'bw3 b--black-50' : 'bw1 b--black-10'
      }`}
      onClick={() => (selected ? unselectRecipe(id) : selectRecipe(id))}
      onKeyDown={() => (selected ? unselectRecipe(id) : selectRecipe(id))}
      role="button"
      tabIndex="-1"
    >
      <div className="tc">
        <img
          src={image || 'http://tachyons.io/img/avatar-jxnblk.jpg'}
          className="br-100 h3 w3 dib"
          alt="kitty staring at you"
        />
        <h1 className="f4">{name}</h1>
        <hr className="mw3 bb bw1 b--black-10" />
      </div>
      <p className="lh-copy measure center f6 black-70">{description}</p>
      <ul />
      {ingredients &&
        ingredients.map(item => (
          <li key={item.ingredient}>
            {item.value} - {item.ingredient}
          </li>
        ))}
    </div>
  );
};

RecipeCard.propTypes = propTypes;
