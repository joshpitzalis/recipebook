import { Box } from 'grommet';
import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { RecipeConsumer } from '../Context/RecipeContext';
import { RecipeCard } from './RecipeList';

const propTypes = {};
const defaultProps = {};

export default function Menu() {
  const [state, setState] = React.useState({
    day1breakfast: '',
    day2breakfast: '',
    day3breakfast: '',
    day2: {
      breakfast: '',
      lunch: '',
      dinner: '',
    },
    day3: {
      breakfast: '',
      lunch: '',
      dinner: '',
    },
  });
  const onDragEnd = result => {
    const { destination, draggableId } = result;

    if (!destination) {
      return;
    }

    setState({ ...state, [destination.droppableId]: draggableId });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <RecipeConsumer>
        {({ selectedRecipes, selectRecipe, unselectRecipe }) => (
          <>
            <Droppable droppableId="recipeShortList">
              {provided => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Box
                    direction="row"
                    justify="between"
                    fill
                    pad={{
                      top: 'large',
                    }}
                  >
                    {selectedRecipes &&
                      selectedRecipes.map((recipe, index) => (
                        <Draggable draggableId={recipe.id} index={index}>
                          {provider => (
                            <div
                              {...provider.draggableProps}
                              {...provider.dragHandleProps}
                              ref={provider.innerRef}
                            >
                              <RecipeCard
                                name={recipe.name}
                                description={recipe.name}
                                ingredients={recipe.ingredients}
                                selectRecipe={selectRecipe}
                                id={recipe.id}
                                selectedRecipes={selectedRecipes}
                                unselectRecipe={unselectRecipe}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                  </Box>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Box
              direction="row"
              justify="between"
              fill
              pad={{
                top: 'large',
              }}
            >
              <DayOfTheWeek
                dayNumber={1}
                state={state}
                selectedRecipes={selectedRecipes}
              />
              <DayOfTheWeek
                dayNumber={2}
                state={state}
                selectedRecipes={selectedRecipes}
              />
              <DayOfTheWeek
                dayNumber={3}
                state={state}
                selectedRecipes={selectedRecipes}
              />
            </Box>
          </>
        )}
      </RecipeConsumer>
    </DragDropContext>
  );
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

const DayOfTheWeek = ({ dayNumber, state, selectedRecipes }) => {
  const breakfast = selectedRecipes.find(
    recipe => recipe.id === state[`day${dayNumber}breakfast`]
  );
  return (
    <ul className="list pl0 mt0 measure center">
      <legend className="fw7 mb2 tc">Day {dayNumber}</legend>
      <li className=" lh-copy pa3 ph0-l bb b--black-10">
        <div>
          <span className="f6 db black-70">Breakfast</span>
        </div>
        <Droppable droppableId={`day${dayNumber}breakfast`}>
          {provided => (
            <>
              {provided.placeholder}
              {state[`day${dayNumber}breakfast`] ? (
                <div className="flex items-center lh-copy pa3 ph0-l ">
                  <img
                    className="w2 h2 w3-ns h3-ns br-100"
                    src={breakfast.image}
                    alt={breakfast.name}
                  />
                  <div className="pl3 flex-auto">
                    <span className="f4 db black-70">{breakfast.name}</span>
                  </div>
                </div>
              ) : (
                <div
                  className="h3 ba br3 b--light-silver"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                />
              )}
            </>
          )}
        </Droppable>
      </li>
      <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
        <img
          className="w2 h2 w3-ns h3-ns br-100"
          src="http://tachyons.io/img/avatar-jxnblk.jpg"
        />
        <div className="pl3 flex-auto">
          <span className="f6 db black-70">Shake</span>
          <span className="f6 db black-70">Large Circle, Inc</span>
        </div>
        <div>
          <a href="tel:" className="f6 link blue hover-dark-gray">
            Remove
          </a>
        </div>
      </li>
      <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
        <img
          className="w2 h2 w3-ns h3-ns br-100"
          src="http://tachyons.io/img/avatar-jxnblk.jpg"
        />
        <div className="pl3 flex-auto">
          <span className="f6 db black-70">Lunch</span>
          <span className="f6 db black-70">Large Circle, Inc</span>
        </div>
        <div>
          <a href="tel:" className="f6 link blue hover-dark-gray">
            Remove
          </a>
        </div>
      </li>
      <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
        <img
          className="w2 h2 w3-ns h3-ns br-100"
          src="http://tachyons.io/img/avatar-jasonli.jpg"
        />
        <div className="pl3 flex-auto">
          <span className="f6 db black-70">Shake</span>
          <span className="f6 db black-70">Little Blue Square, Inc</span>
        </div>
        <div>
          <a href="tel:" className="f6 link blue hover-dark-gray">
            Remove
          </a>
        </div>
      </li>
      <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
        <img
          className="w2 h2 w3-ns h3-ns br-100"
          src="http://tachyons.io/img/avatar-yavor.jpg"
        />
        <div className="pl3 flex-auto">
          <span className="f6 db black-70">Dinner</span>
          <span className="f6 db black-70">Large Circle, Inc</span>
        </div>
        <div>
          <a href="tel:" className="f6 link blue hover-dark-gray">
            Remove
          </a>
        </div>
      </li>
    </ul>
  );
};

DayOfTheWeek.propTypes = {
  dayNumber: PropTypes.number.isRequired,
};
