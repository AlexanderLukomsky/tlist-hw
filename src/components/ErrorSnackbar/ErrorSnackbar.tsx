import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setAppErrorAC } from '../../store/reducers/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const errorMessage = useAppSelector(state => state.app.errorMessage)
    const dispatch = useDispatch()
    const isOpen = errorMessage !== null
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({ errorMessage: null }))
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar autoHideDuration={3000} open={isOpen} onClose={handleClose} style={{ width: 'fit-content', left: '50%', right: '50%', transform: 'translate(-50%,-10%)' }}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

