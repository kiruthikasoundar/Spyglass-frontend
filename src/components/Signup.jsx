import React from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'


const Signup = () => {
    const paperStyle = {padding: 30, height: '60vh', width: 280, margin: "10px auto"}
    const headerStyle = { margin: 10 }

    
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>

                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" />
                    <TextField fullWidth label='Password' type = 'password' placeholder="Enter your password"/>
                    <TextField fullWidth label='Confirm Password' type = 'password' placeholder="Confirm your password"/>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;