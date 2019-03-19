import {
  Box,
  Button,
  Collapsible,
  Form,
  FormField,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext,
  TextArea,
  TextInput
} from 'grommet';
import { Edit, FormClose, Notification } from 'grommet-icons';
import React, { Component } from 'react';
import initFirebase from './firebase';

const fbInstance = initFirebase();

const theme = {
  global: {
    colors: {
      brand: '#228BE6'
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    }
  }
};

class App extends Component {
  state = {
    showSidebar: false,
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    fbInstance
      .database()
      .ref('projects')
      .limitToFirst(10)
      .on(
        'value',
        snap => {
          this.setState({
            projects: snap.val(),
            loading: false
          });
        },
        err => {
          this.setState({
            loading: false,
            error: err
          });
        }
      );
  }
  render() {
    const { loading, projects, showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none">
                  Recipe Book
                </Heading>
                <Button
                  icon={<Notification />}
                  onClick={() =>
                    this.setState(prevState => ({
                      showSidebar: !prevState.showSidebar
                    }))
                  }
                />
              </AppBar>
              <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
                <Box flex align="center" justify="center">
                  app body
                </Box>
                {!showSidebar || size !== 'small' ? (
                  <Collapsible direction="horizontal" open={showSidebar}>
                    <Box
                      flex
                      width="large"
                      background="light-2"
                      elevation="small"
                      align="center"
                      justify="center"
                    >
                      <RecipeCreator />
                    </Box>
                  </Collapsible>
                ) : (
                  <Layer>
                    <Box
                      background="light-2"
                      tag="header"
                      justify="end"
                      align="center"
                      direction="row"
                    >
                      <Button
                        icon={<FormClose />}
                        onClick={() => this.setState({ showSidebar: false })}
                      />
                    </Box>
                    <Box
                      fill
                      background="light-2"
                      align="center"
                      justify="center"
                    >
                      sidebar
                    </Box>
                  </Layer>
                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    );
  }
}

const AppBar = props => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'large' }}
    elevation="medium"
    style={{ zIndex: '1' }}
    {...props}
  />
);

export default App;

export const RecipeCreator = ({}) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [ingredients, setIngredients] = React.useState([
    { ingredient: '', value: '' }
  ]);

  // notes on dynamic field updates
  // https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
  const update = (ingredients, index, type, value) => {
    let newIngredients = [...ingredients];
    newIngredients[index][type] = value;
    setIngredients(newIngredients);
  };
  return (
    <Form>
      <FormField
        name="name"
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <FormField label="description">
        <TextArea
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </FormField>

      {ingredients.map((val, idx) => {
        return (
          <Box key={idx} pad={{ vertical: 'small' }} flex>
            <TextInput
              placeholder="value"
              width="xsmall"
              value={val.value}
              onChange={e => update(ingredients, idx, 'value', e.target.value)}
            />
            <TextInput
              placeholder="ingredient"
              value={val.ingredient}
              onChange={e =>
                update(ingredients, idx, 'ingredient', e.target.value)
              }
            />
          </Box>
        );
      })}

      <Button
        icon={<Edit />}
        label="Add New Ingredient"
        onClick={() =>
          setIngredients([...ingredients, { ingredient: '', value: '' }])
        }
      />
      <div className="pt4">
        <Button type="submit" primary label="Submit" />
      </div>
    </Form>
  );
};
