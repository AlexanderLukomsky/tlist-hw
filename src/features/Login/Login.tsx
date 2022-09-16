import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from "@mui/material"
import { Field, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { authTC } from "../../store/reducers/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import './login.scss'
export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (isLoggedIn) { navigate('/todolists') }
    // }, [isLoggedIn])
    type FormikErrorsType = {
        text?: string
        password?: string
        rememberMe?: string
    }
    const formik = useFormik({
        initialValues: {
            text: 'lukomsky.alexander@gmail.com',
            password: '3448313',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorsType = {};
            if (!values.text) {
                errors.text = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.text)) {
                errors.text = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = 'Password cannot be less than 3 characters'
            }
            return errors;
        },
        onSubmit: values => {
            const data = {
                email: values.text,
                password: values.password,
                rememberMe: values.rememberMe
            }
            formik.validateForm({
                text: values.text,
                password: values.password,
                rememberMe: values.rememberMe
            })
            dispatch(authTC(data))
            formik.resetForm()
        },
    });
    if (isLoggedIn) { return <Navigate to='/todolists' /> }
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
                                {...formik.getFieldProps('text')}

                            />
                            {formik.touched.text && formik.errors.text && <span >{formik.errors.text}</span>}
                            <TextField
                                type={"password"}
                                label='Password *'
                                margin="normal"
                                color="success"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                            <FormControlLabel
                                label={'Remember me'}
                                control={<Checkbox
                                    color="error"
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}
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