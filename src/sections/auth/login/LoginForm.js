import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { KEY_ADMIN } from '../../../enum';
import { setUserData } from '../../../pages/context/Utils';
import validateForm from './validateFormForLogin';
import { LoaderText, StyledBackdrop } from '../../../pages/webshowCss';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      const data = {
        id: credentials.email,
        password: credentials.password,
      };

      const headers = {
        'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
      };

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, data, { headers });
      const result = await response?.data;

      if (response?.data?.success === true) {
        setCredentials({
          email: undefined,
          password: undefined, // Add the photo key
        });
        navigate('/dashboard', { replace: true });

        setSuccessMessage('Login Successful');

        localStorage.setItem(KEY_ADMIN, JSON.stringify(result));
        const total = JSON.parse(localStorage.getItem(KEY_ADMIN));
        setUserData({ total }, KEY_ADMIN);
        // Reset user inputs after submission
      } else {
        setSuccessMessage('Invalid user & password');
      }
    } catch (err) {
      console.log(err);
      setSuccessMessage('Invalid user & password');
    } finally {
      setIsLoading(false);
    }
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
          <Stack spacing={3} sx={{ mt: '10px' }}>
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

          <LoadingButton fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Login'}
          </LoadingButton>
        </Box>
      </form>
      {successMessage !== '' && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}
      {/* Loader */}
      <StyledBackdrop open={isLoading}>
        <CircularProgress color="inherit" size={60} />
        <LoaderText variant="body1">Loading...</LoaderText>
      </StyledBackdrop>
    </>
  );
}
