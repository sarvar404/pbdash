import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import PopupAlert from '../../../pages/PopupAlert';
import { KEY_ADMIN, liveUrl, loginUrl } from '../../../enum';
import { setUserData } from '../../../pages/context/Utils';
import validateForm from './validateFormForLogin';
import { LoaderText, StyledBackdrop } from '../../../pages/webshowCss';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Remove error message for the specific field
    }));
  };

  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
  };

  const submit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateForm(credentials);

    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/pvt/reseller/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      if (response.status === 404) {
        setSuccessMessage('Invalid user & password');
        setIsLoading(false);
        return;
      }
      const result = await response.json();
      if (result.success === true) {
        localStorage.setItem(KEY_ADMIN, JSON.stringify(result));
        setSuccessMessage('Login Successful');
        const total = JSON.parse(localStorage.getItem(KEY_ADMIN)); 

        setUserData({ total }, KEY_ADMIN);
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
          
        }, 2000);
      }
    } catch (err) {
      setSuccessMessage('Please try again');
    }

    setIsLoading(false);
  };

  useEffect(() => {

    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  }, [successMessage]);

  return (
    <>
      {/* <Auth /> */}
      <form onSubmit={submit}>
        <Box sx={{ maxHeight: '460px', overflow: 'auto', '&::-webkit-scrollbar': { width: 0, height: 0 } }}>
          <Stack spacing={3} sx={{mt: '10px'}}>
            <TextField name="email" label="Email address" value={credentials.email} onChange={handleInputs} />
            <p className="error-message-all">{validationErrors.email}</p>
            <TextField
              name="password"
              label="password"
              value={credentials.password}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleInputs}
            />
            <p className="error-message-all">{validationErrors.password}</p>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            {/* <Checkbox name="remember" label="Remember me" /> */}
            {/* <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link> */}
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Login
          </LoadingButton>
        </Box>
      </form>

      {successMessage !== null && <PopupAlert message={successMessage} />}
      {/* Loader */}
      <StyledBackdrop open={isLoading}>
        <CircularProgress color="inherit" size={60} />
        <LoaderText variant="body1">Loading...</LoaderText>
      </StyledBackdrop>
    </>
  );
}