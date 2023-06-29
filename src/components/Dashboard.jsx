import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useGetGoalsByUserIdQuery } from '../api/goalApi';
import Navbar from './Navbar';
import { Grid, Box } from '@mui/material';
import Paper from '@mui/material/Paper';

const Dashboard = () => {
  const { data: goals, isLoading, isError, error } = useGetGoalsByUserIdQuery();

  if (isLoading) {
    return <div>Loading goals...</div>;
  }

  if (isError) {
    return <div>Error fetching goals data: {error.message}</div>;
  }

  // Prepare data for the chart
  const chartData = goals.map((goal) => ({
    name: goal.name,
    savedAmount: goal.savedAmount,
    targetAmount: goal.targetAmount,
  }));

  return (
    <>
      <Navbar />
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
         
        },
      }}
      >
      <Paper elevation={3} />
      <Grid container justifyContent="center" style={{ padding: 150 }}>
        <Grid item xs={12} sm={10} md={8}>
        <Link to={`/goals`}>
          <BarChart width={800} height={400} data={chartData}>
            
            <XAxis dataKey="name" tick={{ fontSize: 20, fill: '#fff' }} />
            <YAxis  tick={{ fontSize: 20, fill: '#fff' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="savedAmount" fill="#196117" />
            <Bar dataKey="targetAmount" fill="#e7b81b" />
          </BarChart>
        </Link>
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default Dashboard;

