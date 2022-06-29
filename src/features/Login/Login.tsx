import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material"
import { Field, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import { authTC } from "../../store/reducers/auth-reducer";
import { useAppSelector } from "../../store/store";
import './login.scss'
export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn) { navigate('/todolists') }
    })
    const formik = useFormik({
        validate: (values) => {
            if (!values.text) {
                return {
                    text: 'Required'
                }
            }
            if (!values.password) {
                console.log('pass');
                return { password: 'Required' }
            }
        },
        initialValues: {
            text: '',
            password: '3448313',
            rememberMe: false
        },
        onSubmit: values => {
            const data = {
                email: values.text,
                password: values.password,
                rememberMe: values.rememberMe
            }
            dispatch(authTC(data))
        },
    });
    return (
        <Grid container justifyContent='center' className="login">
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl style={{ width: '100%' }}>
                        <FormGroup >
                            <TextField
                                type={"text"}
                                label='Email *'
                                margin="normal"
                                color="success"
                                {...formik.getFieldProps("text")}
                            />
                            {formik.errors.text ? <span>{formik.errors.text}</span> : null}
                            <TextField
                                type={"password"}
                                label='Password *'
                                margin="normal"
                                color="success"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : null}
                            <FormControlLabel
                                name="rememberMe"
                                label={'Remember me'}
                                control={<Checkbox
                                    color="error"
                                    {...formik.getFieldProps("rememberMe")}
                                    checked={formik.values.rememberMe}
                                />}
                            />
                            <Button style={{ minWidth: '180px', width: 'fit-content', margin: '0 auto' }}
                                type="submit" variant="contained" color='primary'>
                                login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}