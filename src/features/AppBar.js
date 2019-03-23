import { Box } from 'grommet';
import React from 'react';

export const AppBar = props => (
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
