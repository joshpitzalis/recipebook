import {
  Box,
  Button,
  Collapsible,
  Grommet,
  Heading,
  Layer,
  ResponsiveContext,
  Tab,
  Tabs,
} from 'grommet';
import { Add, FormClose } from 'grommet-icons';
import React, { Component } from 'react';
import { AppBar } from './features/AppBar';
import Menu from './features/Menu';
import { RecipeCreator } from './features/RecipeCreator';
import { RecipeList } from './features/RecipeList';
import { ShoppingList } from './features/ShoppingList';

const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

class App extends Component {
  state = {
    showSidebar: false,
  };

  render() {
    const { showSidebar } = this.state;
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level="3" margin="none" className="white">
                  Recipe Book
                </Heading>
                <Button
                  icon={<Add />}
                  onClick={() =>
                    this.setState(prevState => ({
                      showSidebar: !prevState.showSidebar,
                    }))
                  }
                />
              </AppBar>
              <Box direction="row" flex overflow={{ horizontal: 'hidden' }}>
                <Tabs
                  fill
                  pad={{
                    vertical: 'medium',
                  }}
                >
                  <Tab title="Menu">
                    <Box flex align="center">
                      <Menu />
                    </Box>
                  </Tab>

                  <Tab title="Recipes">
                    <RecipeList />
                  </Tab>

                  <Tab title="Shopping">
                    <Box flex align="center">
                      <ShoppingList />
                    </Box>
                  </Tab>
                </Tabs>
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

export default App;
