import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Snackbar, Paper } from '@mui/material';
import { useCreateGoalMutation } from '../api/goalApi';
import Navbar from './Navbar';
import PicturePicker from './PicturePicker';
import InputAdornment from '@mui/material/InputAdornment';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const CreateGoal = () => {
  const [goalData, setGoalData] = useState({
    name: '',
    description: '',
    targetDate: '',
    targetAmount: '',
    savedAmount: '',
    pictureUrl: ''
  });
  const [createGoal, { isLoading }] = useCreateGoalMutation();
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    validateField(name, value);
  };

  const handlePictureSelect = (url) => {
    setGoalData((prevData) => ({
      ...prevData,
      pictureUrl: url,
    }));
  };

  const validateField = (name, value) => {
    let errors = { ...formErrors };
  
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Goal name is required';
        } else {
          delete errors.name; // Clear the error message if the input is valid
        }
        break;
  
      case 'targetAmount':
        if (isNaN(value) || Number(value) <= 0) {
          errors.targetAmount = 'Target amount must be a positive number';
        } else {
          delete errors.targetAmount; // Clear the error message if the input is valid
        }
        break;

      case 'targetDate':
        const currentDate = getCurrentDate();
        if (value < currentDate) {
          errors.targetDate = 'Target date should be in the future';
        } else {
          delete errors.targetDate; // Clear the error message if the input is valid
        }
        break;
  
      default:
        break;
    }
  
    setFormErrors(errors);
  };

  const handleCreateGoal = () => {
    if (validateForm()) {
        createGoal(goalData)
        .unwrap()
        .then((createdGoal) => {
            // Handle success if needed
            console.log('Goal created:', createdGoal);
            setGoalData({
              name: '',
              description: '',
              targetDate: '',
              targetAmount: '',
              savedAmount: '',
              pictureUrl: ''
            });
            setSuccessMessage('Goal created successfully!');
            setIsSnackbarOpen(true);
        })
        .catch((error) => {
            // Handle error if needed
            console.error('Error creating goal:', error);
        });
    }
  };

  const handleCancel = () => {
    setGoalData({
      name: '',
      description: '',
      targetDate: '',
      targetAmount: '',
      savedAmount: '',
      pictureUrl: ''
  });
    setFormErrors({});
  }

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validateForm = () => {
    let isValid = true;

    if (!goalData.name.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Goal name is required',
      }));
      isValid = false;
    }

    if (isNaN(goalData.targetAmount) || Number(goalData.targetAmount) <= 0) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        targetAmount: 'Target amount must be a positive number',
      }));
      isValid = false;
    }
    const currentDate = getCurrentDate();
    if (goalData.targetDate < currentDate) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        targetDate: 'Target date should be in the future',
      }));
      isValid = false;
    }
  
    return isValid;
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
    <Navbar/>
    <Grid style={{ paddingLeft: 300, width:500, height:1000, marginTop:90 }} align="center">
      <Grid item>
        <Paper style={{ padding: '10px', width: '500px' }}>
        <TextField
            name="name"
            label="Goal Name"
            value={goalData.name}
            onChange={handleInputChange}
            onBlur={() => validateField('name', goalData.name)}
            fullWidth
            margin="normal"
            variant="filled"
            error={!!formErrors.name}
            helperText={formErrors.name}
        />
        <TextField
            name="description"
            label="Goal Description"
            value={goalData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="filled"
            multiline
            rows={2}
        />
        <TextField
            name="targetDate"
            label="Target Date"
            type="date"
            value={goalData.targetDate}
            onChange={handleInputChange}
            onBlur={() => validateField('targetDate', goalData.targetDate)}
            inputProps={{ min: getCurrentDate() }}
            fullWidth
            margin="normal"
            variant="filled"
            error={!!formErrors.targetDate}
            helperText={formErrors.targetDate}
            InputLabelProps={{ shrink: true }}
        />
        <TextField
            name="targetAmount"
            label="Target Amount"
            type="number"
            value={goalData.targetAmount}
            onChange={handleInputChange}
            onBlur={() => validateField('targetAmount', goalData.targetAmount)}
            fullWidth
            margin="normal"
            variant="filled"
            error={!!formErrors.targetAmount}
            helperText={formErrors.targetAmount}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
        />
        <TextField
            name="savedAmount"
            label="Saved Amount"
            type="number"
            value={goalData.savedAmount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="filled"
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
        />
        <TextField
            name="pictureUrl"
            label="Picture URL"
            value={goalData.pictureUrl}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="filled"
        />
        {/* <PicturePicker onPictureSelect={handlePictureSelect} /> */}

        <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item>
          <SaveIcon
            fontSize="large"
            color="primary"
            onClick={handleCreateGoal}
          />
        </Grid>
        
        <Grid item>
        <CancelIcon
          fontSize="large"
          color="error"
          onClick={handleCancel}
        />
        </Grid>
        </Grid>
        </Paper>
      </Grid>
    </Grid>
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      message={successMessage}
    />
    </>
  );
};


export default CreateGoal;
