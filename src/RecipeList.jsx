import React from 'react';
import { RecipeConsumer } from "./Context/RecipeContext";
import PropTypes from 'prop-types';
export const RecipeList = () => {
    return <div>
        <RecipeConsumer >

            {({ recipes, selectRecipe }) => recipes && recipes.map(recipe =>
                <RecipeCard name={recipe.name}
                    description={recipe.description}
                    ingredients={recipe.ingredients}
                    id={recipe.id}
                    selectRecipe={selectRecipe} />
            )}</RecipeConsumer>  </div>

}


const propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        ingredients: PropTypes.string,
        val: PropTypes.number
    })),
    selectRecipe: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export const RecipeCard = ({ name, description, ingredients, selectRecipe, id }) => {
    return (
        <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10" onClick={() => selectRecipe(id)}>
            <div className="tc">
                <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib" title="Photo of a kitty staring at you" />
                <h1 className="f4">{name}</h1>

                <hr className="mw3 bb bw1 b--black-10" />
            </div>
            <p className="lh-copy measure center f6 black-70">{description}</p>
            <ul></ul>{ingredients && ingredients.map(item => <li>{item.value} - {item.ingredient}</li>)}
        </article >
    );
}

RecipeCard.propTypes = propTypes






