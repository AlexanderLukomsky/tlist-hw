import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material"
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { login } from "./auth-reducer";
import { useAppDispatch } from "../../store/store";
import './login.scss'
import { selectIsLoggedIn } from "./selectors";
import { useSelector } from "react-redux";
export const Login = () => {
    const DEFAULT_PASSWORD = 'JUST PRESS LOGIN BUTTON :)'
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)
    type FormikErrorsType = {
        text?: string
        password?: string
        rememberMe?: string
    }
    const formik = useFormik({
        initialValues: {
            text: 'lukomsky.alexander@gmail.com',
            password: DEFAULT_PASSWORD,
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
        onSubmit: async values => {
            const data = {
                email: values.text,
                password: values.password === DEFAULT_PASSWORD ? process.env.REACT_APP_LOGIN_PASSWORD as string : values.password,
                rememberMe: values.rememberMe
            }
            formik.validateForm({
                text: values.text,
                password: values.password,
                rememberMe: values.rememberMe
            })
            const action = await dispatch(login(data))
            if (login.fulfilled.match(action)) {
                formik.resetForm()
            }
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