// // import React from 'react';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// // import { useGetGoalsByUserIdQuery } from '../api/goalApi';
// // import Navbar from './Navbar';
// // import { Grid } from '@mui/material';


// // const Dashboard = () => {
// //   const { data: goals, isLoading, isError, error } = useGetGoalsByUserIdQuery();

// //   if (isLoading) {
// //     return <div>Loading goals...</div>;
// //   }

// //   if (isError) {
// //     return <div>Error fetching goals data: {error.message}</div>;
// //   }

// //   // Prepare data for the chart
// //   const chartData = goals.map((goal) => ({
// //     name: goal.name,
// //     savedAmount: goal.savedAmount,
// //     targetAmount: goal.targetAmount,
// //   }));

// //   return (
// //     <>
// //     <Navbar /> 
// //       <BarChart style={{ paddingLeft: 550, width:800 }} align="center" width={800} height={400} data={chartData}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="name" />
// //         <YAxis />
// //         <Tooltip />
// //         <Legend />
// //         <Bar dataKey="savedAmount" fill="#196117" />
// //         <Bar dataKey="targetAmount" fill="#e7b81b" />
// //       </BarChart>
// //     </>
// //   );
// // };

// // export default Dashboard;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { useGetGoalsByUserIdQuery } from '../api/goalApi';
// import Navbar from './Navbar';
// import { Grid } from '@mui/material';

// const Dashboard = () => {
//   const { data: goals, isLoading, isError, error } = useGetGoalsByUserIdQuery();

//   if (isLoading) {
//     return <div>Loading goals...</div>;
//   }

//   if (isError) {
//     return <div>Error fetching goals data: {error.message}</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <Grid container spacing={4} style={{ paddingLeft: 550, width:800 }} justifyContent="center">
//         {goals.map((goal) => (
//           <Grid item key={goal.id} xs={12} sm={6} md={4} lg={3} >
//             <Link to={`/goals`}>
//               <BarChart width={400} height={300} data={[goal]}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="savedAmount" fill="#196117" />
//                 <Bar dataKey="targetAmount" fill="#e7b81b" />
//               </BarChart>
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default Dashboard;


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

