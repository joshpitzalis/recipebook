import produce from 'immer';
import PropTypes from 'prop-types';
import React from 'react';
import { db } from '../firebase';

const propTypes = {
  children: PropTypes.element,
};

const defaultProps = {};

export const { Provider, Consumer } = React.createContext();

class RecipeProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      selectedRecipes: [],
    };
  }

  componentDidMount() {
    db.collection('recipes')
      .get()
      .then(collection => {
        const recipes = collection.docs.map(doc => doc.data());
        this.setState({ recipes });
      });
  }

  selectRecipe = id => {
    const { recipes, selectedRecipes } = this.state;
    const newSelectedRecipes = produce(selectedRecipes, draft => {
      draft.push(recipes.find(item => item.id === id));
    });
    this.setState({ selectedRecipes: newSelectedRecipes });
  };

  unselectRecipe = id => {
    const { selectedRecipes } = this.state;
    const newSelectedRecipes = selectedRecipes.filter(
      recipe => recipe.id !== id
    );
    this.setState({ selectedRecipes: newSelectedRecipes });
  };

  render() {
    const { recipes, selectedRecipes } = this.state;
    const { children } = this.props;
    return (
      <Provider
        value={{
          recipes,
          selectedRecipes,
          selectRecipe: this.selectRecipe,
          unselectRecipe: this.unselectRecipe,
        }}
      >
        {children}
      </Provider>
    );
  }
}

export { RecipeProvider, Consumer as RecipeConsumer };

RecipeProvider.propTypes = propTypes;
RecipeProvider.defaultProps = defaultProps;
