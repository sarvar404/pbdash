import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, CircularProgress } from '@mui/material';
// mocks_
import account from '../../../_mock/account';
import { KEY_ADMIN, USER_INFO } from '../../../enum';
import { fetchUserData, getStoredUserData, logoutMe } from '../../../pages/context/Utils';
import { LoaderText, StyledBackdrop } from '../../../pages/webshowCss';


// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [isLoading, setIsLoading] = useState(false);
  const adminData = getStoredUserData(KEY_ADMIN);
  const USERINFO = getStoredUserData(USER_INFO);
  const navigate = useNavigate();

  if (!adminData) {
    Navigate('/login', { replace: true });
  }

  const username = null;
  const email = null;

  if (adminData) {
    fetchUserData(adminData?.total?.token)
    .then((data) => {
      localStorage.setItem(USER_INFO, JSON.stringify(data.userDetails));
    })
    .catch((error) => {
      console.error(error.message);
    });

  }

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logout = () => {
    logoutMe(KEY_ADMIN);
    setTimeout(() => {
      navigate('/login', { replace: true });
    }, 1000);
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {USERINFO?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {USERINFO?.email}
          </Typography>
        </Box>


       

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>

      <StyledBackdrop open={isLoading}>
        <CircularProgress color="inherit" size={60} />
        <LoaderText variant="body1">Loading...</LoaderText>
      </StyledBackdrop>
    </>
  );
}
