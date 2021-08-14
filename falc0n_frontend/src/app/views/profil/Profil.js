import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { editProfile } from '../main/mainSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: 'auto',
            height: "10px",
        },
    },
    input: {
        color: "white",
        border: 'white',
        fontSize: '10px'
    },
    label: {
        color: '#dd8108',
        fontSize: '13px',
        width: '100%'
    },
}));


const ColorSwitch = withStyles({
    switchBase: {
        color: "orange",
        '&$checked': {
            color: 'gray',
        },
        '&$checked + $track': {
            backgroundColor: "gray",
        },
    },
    checked: {},
    track: {},
})(Switch);

const Profil = () => {

    const classes = useStyles();
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [edit, setEdit] = useState(true)
    const [profileInfo, setPinfo] = useState({});
    const [youCanFetch, setYouCanFetch] = useState(false);
    const main = useSelector(state => state.main)
    const [user, setUser] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        if (image) {
            setPinfo({ ...profileInfo, image: image })
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setImageUrl(null)
        }
    }, [image])

    const startEditingProfile = () => {
        let { email, first_name, phone, last_name, cin, username } = profileInfo
        let infos = { email, first_name, phone, last_name, cin, username }
        console.log(infos);
        let data = new FormData();
        if (profileInfo.image) {
            data.append('file ', profileInfo.image);
        }
        data.append('data', JSON.stringify(infos));
        console.log(JSON.stringify(infos));
        dispatch(editProfile(data))

    }
    useEffect(() => {
        if (youCanFetch) {
            startEditingProfile()
        }
        setYouCanFetch(false)
    }, [edit]);

    useEffect(() => {
        if (!edit) {
            console.log('fired');
            setYouCanFetch(true)
            console.log(youCanFetch);
        }
    }, [profileInfo]);



    useEffect(() => {
        let { email, first_name, phone, last_name, cin, username } = user
        setPinfo({ email, first_name, phone, last_name, cin, username })
    }, [user]);

    useEffect(() => {
        // console.log(main.User);
        setUser(main.User)
    }, []);





    return (


        <div className="app-main">
            <div className="chart-container prof" style={{ position: 'relative' }}>
                <FormGroup row style={{ position: 'absolute', top: "40px", right: "20px", color: 'white' }}>
                    <FormControlLabel
                        control={<ColorSwitch checked={edit} onChange={() => setEdit(!edit)} />}
                        label="Edit"
                    />
                </FormGroup>
                {
                    edit ? (

                        <>
                            <div className="wrraper_profile">


                                <div class="profile">
                                    <div class="avatar-upload">
                                        <div class="avatar-edit">
                                            <label for="imageUpload">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-edit-2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                    </path>
                                                </svg>
                                            </label>
                                        </div>
                                        <div class="avatar-preview">
                                            {
                                                imageUrl ?
                                                    <div id="imagePreview" style={{ backgroundImage: `url(${imageUrl})` }}></div> :
                                                    <div id="imagePreview" style={{ backgroundImage: `url(${main.User.image})` }}></div>
                                            }
                                        </div>
                                    </div>
                                    <h3 className="username">{user?.username}</h3>
                                </div>
                                <div className="profile_info top">
                                    <section className="user-top">
                                        <div className="name">
                                            {`${user.first_name}  ${user.last_name}`.toLocaleUpperCase()}
                                        </div>
                                        <div className="infos">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18"
                                                    height="18" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                    stroke-linejoin="round" class="feather feather-smartphone">
                                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                                    <line x1="12" y1="18" x2="12.01" y2="18">
                                                    </line>
                                                </svg>
                                                {user.phone}
                                            </span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round" class="feather feather-at-sign">
                                                    <circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                                                </svg>
                                                {user.email}
                                            </span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-credit-card"><rect x="1" y="4"
                                                        width="22" height="16" rx="2" ry="2"></rect>
                                                    <line x1="1" y1="10" x2="23" y2="10"></line>
                                                </svg>
                                                {user.cin}
                                            </span>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="profile_info bottom">
                                <section className="user-bottom">
                                    <div className='social'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-twitter">
                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                            </path>
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="40"
                                            height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                            </path><rect x="2" y="9" width="4" height="12">
                                            </rect><circle cx="4" cy="4" r="2"></circle>
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-facebook">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </div>
                                </section>
                            </div>
                        </>
                    ) : (

                        <>
                            <div className="wrraper_profile">


                                <div class="profile">
                                    <div class="avatar-upload">
                                        <div class="avatar-edit">
                                            <input onChange={(e) => setImage(e.target.files[0])} type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                                            <label for="imageUpload">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round"
                                                    class="feather feather-edit-2">
                                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z">
                                                    </path>
                                                </svg>
                                            </label>
                                        </div>
                                        <div class="avatar-preview">
                                            {
                                                imageUrl ?
                                                    <div id="imagePreview" style={{ backgroundImage: `url(${imageUrl})` }}></div> :
                                                    <div id="imagePreview" style={{ backgroundImage: `url(${main.User.image})` }}></div>
                                            }
                                        </div>
                                    </div>
                                    <h3 className="username">
                                        <form className={classes.root} noValidate autoComplete="off">
                                            <TextField onChange={(e) => setPinfo({ ...profileInfo, username: e.target.value })} InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="outlined-basic" label="username" variant="outlined" value={profileInfo.username} />
                                        </form>
                                    </h3>
                                </div>
                                <div className="profile_info top">
                                    <section className="user-top">
                                        <div className="name">
                                            <form className={classes.root} noValidate autoComplete="off">
                                                <TextField onChange={(e) => setPinfo({ ...profileInfo, first_name: e.target.value })} InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="outlined-basic" label="first name" variant="outlined" value={profileInfo.first_name} />
                                                <TextField onChange={(e) => setPinfo({ ...profileInfo, last_name: e.target.value })} InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="outlined-basic" label="last name" variant="outlined" value={profileInfo.last_name} />
                                            </form>

                                        </div>
                                        <div className="infos">
                                            <span>

                                                <form className={classes.root} noValidate autoComplete="off">
                                                    <TextField onChange={(e) => setPinfo({ ...profileInfo, phone: e.target.value })} InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="outlined-basic" label="phone" variant="outlined" value={profileInfo.phone} />
                                                </form>
                                            </span>
                                            <span>

                                                <form className={classes.root} noValidate autoComplete="off">
                                                    <TextField onChange={(e) => setPinfo({ ...profileInfo, email: e.target.value })} InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="outlined-basic" label="email" variant="outlined" value={profileInfo.email} />
                                                </form>
                                            </span>
                                            <span>

                                                <form className={classes.root} noValidate autoComplete="off">
                                                    <TextField onChange={(e) => setPinfo({ ...profileInfo, cin: e.target.value })} InputProps={{ className: classes.input, autoComplete: 'off' }} InputLabelProps={{ className: classes.label }} id="outlined-basic" label="cin" variant="outlined" value={profileInfo.cin} />
                                                </form>
                                            </span>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="profile_info bottom">
                                <section className="user-bottom">
                                    <div className='social'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-twitter">
                                            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z">
                                            </path>
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="40"
                                            height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                            </path><rect x="2" y="9" width="4" height="12">
                                            </rect><circle cx="4" cy="4" r="2"></circle>
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            class="feather feather-facebook">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </div>
                                </section>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default Profil;
