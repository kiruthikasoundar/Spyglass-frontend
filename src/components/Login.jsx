import React from "react";
import  { Grid, Paper, Avatar, TextField, FormControl, FormControlLabel, Checkbox, Button, Typography, Link } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

const Login = ({handleChange}) => {
    const paperStyle={padding: 30, height: '60vh', width: 280, margin: "10px auto"}
    const headerStyle = { margin: 10 }

    return(
        <Grid>
            <Paper style = {paperStyle}>

                <TextField label = 'Username' placeholder='Enter username' fullWidth required />
                <TextField label = 'Password' placeholder='Enter password' type = 'password' fullWidth required />
                <FormControlLabel
                        control = {
                            <Checkbox 
                                name = "CheckeB"
                                color="primary"
                            />
                        }
                        label = "Remember me" 
                />
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <Button type = 'submit' color='primary' variant = "contained" >Sign In</Button>
                </div>
                <Typography>
                <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > New User ? 
                     <Link href="#" onClick={()=>handleChange("event",1)}>
                        Sign Up 
                </Link>
                </Typography>
                <Button
                    color="secondary"
                    startIcon={<GoogleIcon />}
                    >
                    Login with Google
                </Button>
            </Paper>
        </Grid>
    )
}

export default Login