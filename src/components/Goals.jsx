import React, { useEffect, useState } from 'react';
import {
  useGetGoalsByUserIdQuery,
  useUpdateGoalMutation,
  useDeleteGoalMutation,
} from '../api/goalApi';
import {
  CircularProgress,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  Paper,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';


const GoalList = () => {
  const { data: goals, isLoading, isError, refetch } = useGetGoalsByUserIdQuery();
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [editedGoals, setEditedGoals] = useState([]);
  const [updateGoal, { isLoading: isUpdating, isError: updateError }] = useUpdateGoalMutation();
  const [deleteGoal, { isLoading: isDeleting, isError: deleteError }] = useDeleteGoalMutation();

  useEffect(() => {
    refetch();
  }, []);

  const handleGoalClick = (goal) => {
    setEditingGoalId(goal.id);
    setEditedGoals([{ ...goal }]);
  };

  const handleInputChange = (e, goalId) => {
    const updatedGoal = { ...editedGoals.find((goal) => goal.id === goalId) };
    updatedGoal[e.target.name] = e.target.value;

    setEditedGoals((prevEditedGoals) =>
      prevEditedGoals.map((goal) => (goal.id === goalId ? updatedGoal : goal))
    );
  };

  const handleSaveChanges = async (goalId) => {
    const editedGoal = editedGoals.find((goal) => goal.id === goalId);

    try {
      await updateGoal(editedGoal);
      refetch();
      setEditingGoalId(null);
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId);
      refetch();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <div>Error loading goals</div>;
  }

  if (goals.length === 0) {
    return <div>No goals found</div>;
  }

  const calculateProgress = (savedAmount, targetAmount) => {
    const progress = (savedAmount / targetAmount) * 100;
    return Math.min(progress, 100); // Cap the progress at 100%
  };

  const getRowBackgroundColor = (progress) => {
    if (progress === 100) {
      return '#5dd152'; // Brighter green background for completed goals
    } else if (progress >= 50) {
      return '#fff7d6'; // Brighter yellow background for partially completed goals
    } else {
      return '#ffd6dc'; // Brighter red background for incomplete goals
    }
  };

  return (
    <div>
      <TableContainer component={Paper} elevation={6} style={{ width: 1000 }} align="center">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Description</b>
              </TableCell>
              <TableCell>
                <b>Target Amount</b>
              </TableCell>
              <TableCell>
                <b>Saved Amount</b>
              </TableCell>
              <TableCell>
                <b>Progress</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => {
              const progress = calculateProgress(goal.savedAmount, goal.targetAmount);
              const rowBackgroundColor = getRowBackgroundColor(progress);

              return (
                <TableRow key={goal.id} style={{ backgroundColor: rowBackgroundColor }}>
                  <TableCell component="th" scope="row">
                    {editingGoalId === goal.id ? (
                      <TextField
                        label="Name"
                        name="name"
                        value={editedGoals.find((g) => g.id === goal.id)?.name || ''}
                        onChange={(e) => handleInputChange(e, goal.id)}
                        fullWidth
                      />
                    ) : (
                      goal.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingGoalId === goal.id ? (
                      <TextField
                        label="Description"
                        name="description"
                        value={editedGoals.find((g) => g.id === goal.id)?.description || ''}
                        onChange={(e) => handleInputChange(e, goal.id)}
                        fullWidth
                      />
                    ) : (
                      goal.description
                    )}
                  </TableCell>
                  <TableCell>
                    {editingGoalId === goal.id ? (
                      <TextField
                        label="Target Amount"
                        name="targetAmount"
                        value={editedGoals.find((g) => g.id === goal.id)?.targetAmount || ''}
                        onChange={(e) => handleInputChange(e, goal.id)}
                        fullWidth
                      />
                    ) : (
                      goal.targetAmount
                    )}
                  </TableCell>
                  <TableCell>
                    {editingGoalId === goal.id ? (
                      <TextField
                        label="Saved Amount"
                        name="savedAmount"
                        value={editedGoals.find((g) => g.id === goal.id)?.savedAmount || ''}
                        onChange={(e) => handleInputChange(e, goal.id)}
                        fullWidth
                      />
                    ) : (
                      goal.savedAmount
                    )}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ flex: 1, marginRight: '10px' }}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          color="secondary"
                          style={{ height: '10px' }}
                        />
                      </div>
                      <div>{`${progress.toFixed(0)}%`}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingGoalId === goal.id ? (
                      <Button
                        variant="contained"
                        onClick={() => handleSaveChanges(goal.id)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Saving...' : 'Save'}
                      </Button>
                    ) : (
                      <>
                        <IconButton variant="contained" onClick={() => handleGoalClick(goal)}>
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteGoal(goal.id)}
                          disabled={isDeleting}
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GoalList;
