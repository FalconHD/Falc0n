import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../logo.png";
import { register } from '../views/main/mainSlice';
import { useDispatch } from 'react-redux';


function Copyright() {
    return (
        <Typography variant="body2" style={{ color: '#5e6a81' }} align="center">
            {'Copyright © '}
            <span>
                FalcOn.exe Team
            </span>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        color: 'white',
        width: '100%',
        backgroundColor: '#151c32',
        fontSize: '13px',
    },
    label: {
        color: 'white',
        fontSize: '13px',
        width: '100%'
    },
    button: {
        backgroundColor: '#dd8108',
        color: '#151c32',
        '&:hover': {
            backgroundColor: 'white',
            boxShadow: 'none',
        },
    }
}));

export default function Register({ setLogin }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [user, setuser] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        cin: "",
        phone: "",

    })
    useEffect(() => {
        console.log(user);
    }, [user])

    const registerNow = () => {
        dispatch(register(user))
    }





    return (
        <div className="app-main" style={{ padding: "20px 20%" }}>
            <div className="chart-container" style={{ display: "flex", flexDirection: "column", padding: "10px 70px" }} >
                <div className={classes.paper}>
                    <div style={{ width: "200px", display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                        <img style={{ width: "50%" }} src={logo} />
                    </div>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    onChange={(e) => setuser({ ...user, username: e.target.value })}
                                    InputProps={{ className: classes.input, autoComplete: 'off' }}
                                    InputLabelProps={{ className: classes.label }}
                                    autoComplete="Uname"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    value={user.username}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setuser({ ...user, first_name: e.target.value })}
                                    InputProps={{ className: classes.input, autoComplete: 'off' }}
                                    InputLabelProps={{ className: classes.label }}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    value={user.first_name}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(e) => setuser({ ...user, last_name: e.target.value })}
                                    InputProps={{ className: classes.input, autoComplete: 'off' }}
                                    InputLabelProps={{ className: classes.label }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    value={user.last_name}
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setuser({ ...user, email: e.target.value })}
                                    InputProps={{ className: classes.input, autoComplete: 'off' }}
                                    InputLabelProps={{ className: classes.label }} variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={user.email}
                                    style={{ color: '#dd8108', fontSize: "13px" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => setuser({ ...user, password: e.target.value })}
                                    InputProps={{ className: classes.input, autoComplete: 'off' }}
                                    InputLabelProps={{ className: classes.label }} variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={user.password}
                                    autoComplete="current-password"
                                    style={{ color: '#dd8108', fontSize: "13px" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={(e) => setuser({ ...user, phone: e.target.value })}
                                    InputProps={{ className: classes.input, autoComplete: 'off' }}
                                    InputLabelProps={{ className: classes.label }} variant="outlined"
                                    required
                                    fullWidth
                                    name="phone"
                                    label="phone"
                                    type="phone"
                                    id="phone"
                                    value={user.phone}
                                    autoComplete="current-phone"
                                    style={{ color: '#dd8108', fontSize: "13px" }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={(e) => setuser({ ...user, cin: e.target.value })}
                                    InputProps={{ className: classes.input, autoComplete: 'off' }}
                                    InputLabelProps={{ className: classes.label }} variant="outlined"
                                    required
                                    fullWidth
                                    name="cin"
                                    label="cin"
                                    type="cin"
                                    id="cin"
                                    value={user.cin}
                                    autoComplete="current-cin"
                                    style={{ color: '#dd8108', fontSize: "13px" }}
                                />
                            </Grid>

                        </Grid>
                        <Button
                            onClick={()=>registerNow()}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end" >
                            <Grid item className='switcherAuth' style={{ color: '#5e6a81' }}>
                                <div onClick={() => setLogin(true)}>
                                    Already have an account? Sign in
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5} >
                    <Copyright />
                </Box>
            </div>
        </div>
    );
}