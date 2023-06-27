
import React from 'react';
import GoalList from './Goals';
import { Grid, Typography } from '@material-ui/core';
import Navbar from './Navbar';



const Goals = () => {
  return (
    <>
    <Navbar/>
    <Grid style={{ paddingLeft: 350, width:800 }} align="center" container direction="column" spacing={2}>
     <Grid item>
      <GoalList />
    </Grid>
    
  </Grid>
  </>
  );
};

export default Goals;
