import React from 'react';
import PropTypes from 'prop-types';
import { db } from "../firebase";
import produce from "immer"

const propTypes = {
    children: PropTypes.element
};

const defaultProps = {};

export const { Provider, Consumer } = React.createContext()


class RecipeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            selectedRecipes: []
        };
    }

    componentDidMount() {
        db.collection('recipes').get()
            .then(collection => {
                const recipes = collection.docs.map(doc => doc.data())
                this.setState({ recipes })
            })
    }

    selectRecipe = (id) => {
        const selectedRecipes = produce(this.state.selectedRecipes, draft => {
            draft.push(this.state.recipes.find(item => item.id === id))

        })
        console.log(selectedRecipes)
        this.setState(selectedRecipes)

    }

    render() {
        return (
            <Provider value={{
                recipes: this.state.recipes,
                selectRecipe: this.selectRecipe
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

export { RecipeProvider, Consumer as RecipeConsumer }

RecipeProvider.propTypes = propTypes;
RecipeProvider.defaultProps = defaultProps;