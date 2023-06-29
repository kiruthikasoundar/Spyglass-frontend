import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Snackbar, Paper } from '@mui/material';
import { useCreateGoalMutation, useUploadImageMutation } from '../api/goalApi';
import Navbar from './Navbar';
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
    pictureUrl: '',
  });

  const [imageData, setImageData] = useState();
  const [uploadImage] = useUploadImageMutation();
  const [createGoal, { isLoading }] = useCreateGoalMutation();
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const handleInputBlur = (name) => {
    validateField(name, goalData[name]);
  };

  const handleSubmit = (e) => {
    console.log(goalData);
    e.preventDefault();
    const errors = validateForm(goalData);
  
    if (Object.keys(errors).length === 0) {
      createGoal(goalData)
        .unwrap()
        .then((createdGoal) => {
          setGoalData({
            name: '',
            description: '',
            targetDate: '',
            targetAmount: '',
            savedAmount: '',
            pictureUrl: '',
          });
          setSuccessMessage('Goal created successfully!');
          setIsSnackbarOpen(true);

          const { id } = createdGoal;
          console.log(id);
          uploadImage({ id, image: imageData })
          .catch((error) => {
            console.error('Error uploading image:', error);
            
          });
      })
      .catch((error) => {
        console.error('Error creating goal:', error);
      });
  } else {
    setFormErrors(errors);
  }
};
  
 

  const validateField = (name, value) => {
    let errors = { ...formErrors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Goal name is required';
        } else {
          delete errors.name;
        }
        break;
      case 'targetDate':
        const currentDate = getCurrentDate();
        if (value < currentDate) {
          errors.targetDate = 'Target date should be in the future';
        } else {
          delete errors.targetDate;
        }
        break;
      case 'targetAmount':
        if (isNaN(value) || Number(value) <= 0) {
          errors.targetAmount = 'Target amount must be a positive number';
        } else {
          delete errors.targetAmount;
        }
        break;
      case 'savedAmount':
        if (isNaN(value) || Number(value) < 0) {
          errors.savedAmount = 'Saved amount cannot be negative';
        } else {
          delete errors.savedAmount;
        }
        break;

      default:
        break;
    }

    setFormErrors(errors);
  };

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
      <Navbar />
      <Grid container justifyContent="center" sx={{ marginTop: '2rem' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ padding: '2rem' }}>
            <Typography variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
              Create Goal
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={goalData.name}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur('name')}
                     error={formErrors.name !== undefined}
                     helperText={formErrors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={goalData.description}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="targetDate"
                    label="Target Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={goalData.targetDate}
                    onChange={handleInputChange}
                    inputProps={{ min: getCurrentDate() }}
                    onBlur={() => handleInputBlur('targetDate')}
                    error={formErrors.targetDate !== undefined}
                    helperText={formErrors.targetDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="targetAmount"
                    label="Target Amount"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={goalData.targetAmount}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur('targetAmount')}
                    error={formErrors.targetAmount !== undefined}
                    helperText={formErrors.targetAmount}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="savedAmount"
                    label="Saved Amount"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={goalData.savedAmount}
                    onChange={handleInputChange}
                    onBlur={() => handleInputBlur('savedAmount')}
                    error={formErrors.savedAmount !== undefined}
                    helperText={formErrors.savedAmount}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files[0];
                      console.log('Selected image:', file);
                      setImageData(file);
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" sx={{ marginTop: '2rem' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={isLoading}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<CancelIcon />}
                  sx={{ marginLeft: '1rem' }}
                  onClick={() => {
                    setGoalData({
                      name: '',
                      description: '',
                      targetDate: '',
                      targetAmount: '',
                      savedAmount: '',
                    });
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={successMessage}
      />
    </>
  );
};

export default CreateGoal;
