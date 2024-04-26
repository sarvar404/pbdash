import axios from 'axios';

import { Helmet } from 'react-helmet-async';
import React, { useEffect, useRef, useState } from 'react';
// @mui
import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';
// @mui
// sections
import { LoaderText, StyledBackdrop } from './webshowCss';
import { getStoredUserData } from './context/Utils';
import { KEY_ADMIN } from '../enum';

const CustomContainer = styled(Container)`
  && {
    max-width: 20000px;
    margin-left: -40px;
    margin-right: -40px;
    margin-top: -40px;
  }
`;

// const CustomContainer2 = styled(Container)`
//   && {
//     margin: 20px 0 0 35px;
//     display: inline-flex;
//   }
// `;

const CustomGrid = styled(Grid)`
  && {
    margin: 20px 100% 0px 55px;
  }
`;

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const BoxContainer = styled(Box)({
  maxHeight: 'calc(87vh - 140px)', // Adjust this value according to your header height
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
});

export default function Billings() {
  const logData = getStoredUserData(KEY_ADMIN);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoader, setImgLoader] = useState(false);
  const [backupImg, setBackupImgs] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const fileInputRef = useRef(null);
  const [enableFilter, setEnableFilter] = useState(true);
  const [updateData, setUpdateData] = useState(false);

  const [userInputs, setUserInputs] = useState({
    _id: '',
    name: '',
    email: '',
    sub_end_date: '',
    photo: '',
  });

  const [billings, setBillings] = useState({
    userId: '',
    amount: '',
    message: '',
    expiredDate: '',
  });

  const handleToggleChange = (event) => {
    const newFilter = event.target.checked;
    setEnableFilter(newFilter);

    if (!newFilter) {
      // If the filter is turned off (image upload is enabled)
      setUserInputs((prevInputs) => ({
        ...prevInputs,
        message: '', // Clear the message
      }));
      setSelectedImgs([]); // Clear the selected images
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input value
      }
    } else {
      // If the filter is turned on (message input is enabled)
      setUserInputs({
        ...userInputs,
        message: '', // Reset the message to empty
      });
    }
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    // Handle the "name" field
    if (name === 'name') {
      if (value.length <= 30) {
        setUserInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      } else {
        alert('Name must be up to 30 characters.');
      }
    }

    // Handle the "startAt" and "endAt" fields
    if (name === 'startAt' || name === 'endAt') {
      // Convert input values to Date objects
      const startAt = name === 'startAt' ? new Date(value) : userInputs.startAt;
      const endAt = name === 'endAt' ? new Date(value) : userInputs.endAt;

      // Check if both start and end dates are set and if end date is before start date
      if (startAt && endAt && endAt < startAt) {
        alert('End date cannot be before the start date.');
        return; // Prevent updating state if validation fails
      }

      // Update state for date fields
      setUserInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    // Handle the "frequency" dropdown
    if (name === 'frequency') {
      setUserInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }

    if (name === 'maxCount') {
      // Check if the value is empty or a number with at most 2 digits
      if (value === '' || /^\d{0,2}$/.test(value)) {
        if (value === '' || parseInt(value, 10) > 0) {
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value === '' ? '' : parseInt(value, 10).toString(),
          }));
        } else if (parseInt(value, 10) === 0) {
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            [name]: '1',
          }));
        } else {
          alert('Max Count must be a positive number.');
        }
      } else {
        alert('Max Count must be a number with at most 2 digits.');
      }
    }

    // Handle the "stars" field
    if (name === 'stars') {
      if (/^\d{0,2}$/.test(value)) {
        setUserInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      } else {
        alert('Stars must be a number with at most 2 digits.');
      }
    }

    // Handle other fields
    if (['event_type', 'reward_type', 'tags'].includes(name)) {
      setUserInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
    }
  };
  const handleCancel = () => {
    setSelectedImgs([]);
  };

  const handlePosterImg = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    // Clear the existing image
    if (selectedImgs.length > 0) {
      setSelectedImgs([]);
    }

    setImgLoader(true);

    if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/jpg')) {
      setIsLoading(false);
      setImgLoader(false);
      alert('Please select only JPG images.');
      return;
    }

    // Check if file size is less than or equal to 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setIsLoading(false);
      setImgLoader(false);
      alert('Please select only JPG images with size less than 5 MB');
      return;
    }

    const formData = new FormData();
    formData.append('ps-img', file, 'ps-img.jpg'); // Ensure file name is 'ps-img.jpg'

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload/events`, formData);

      if (response.data.success === true) {
        setSelectedImgs([response.data.data[0].imageUrl]); // Set selected image URL
      } else {
        alert('Error uploading image: Please upload jpg image only & file should not be corrupted');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image: Please upload jpg image only & file should not be corrupted');
    } finally {
      setIsLoading(false);
      setImgLoader(false);
    }
  };

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const headers = {
          'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
          authorization: `Bearer ${logData?.total?.refreshToken}`,
        };

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get-all-user`, { headers });

        setUsers(response.data.data);
      } catch (error) {
        // Handle error here
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchusers();
  }, []);

  const handleusersClick = (notification) => {
    // Populate the form fields when a notification is clicked
    setImgLoader(true);
    setUserInputs({
      _id: notification._id,
      email: notification.email,
      name: notification.name,
      sub_end_date: notification.sub_end_date,
      photo: notification.photo,
      // Add more fields as needed
    });
    setImgLoader(false);
    setUpdateData(true);
  };

  const [successMessage, setSuccessMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const amt = 1;
    const some = 1;
    if (some===amt) {
      return;
    }

    if (updateData === false) {
      if (users[0]?._id !== undefined) {
        alert('Notification already exist, You can only edit the existing notification');
        return;
      }
    }

    if (!userInputs.expiredDate) {
      alert('Please select expired date');
      return;
    }

    if (!userInputs.message && selectedImgs.length === 0) {
      alert('Please fill either message or upload a photo');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      const data = {
        title: userInputs.title,
        message: userInputs.message,
        photo: selectedImgs,
        expiredDate: userInputs.expiredDate,
      };

      // Make the API call to insert or update the tag data
      const headers = {
        'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
        authorization: `Bearer ${logData?.total?.refreshToken}`,
      };
      let response;
      if (userInputs._id !== '') {
        data.notificationId = userInputs._id;
        response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/users`, data, {
          headers,
        });
      } else {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/users`, data, { headers });
      }

      if (response) {
        setSuccessMessage(
          userInputs._id !== '' ? 'Notification updated successfully' : 'Notification inserted successfully'
        );
        setSelectedImgs([]);
        setUserInputs({
          _id: '',
          title: '',
          message: '',
          expiredDate: '',
          photo: '',
        }); // Reset user inputs after submission
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      // add here loader until response done.
    } catch (error) {
      // Handle error here
      console.error('Error submitting data:', error);
    }

    setIsLoading(false);
  };
  const handleDelete = async (tagId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this notification?');
      if (!confirmed) {
        return; // Exit the function if the user cancels the deletion
      }

      setIsLoading(true);
      // Make the API call to delete the tag using both user ID and tag ID
      const headers = {
        'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
      };

      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/users/delete-tag/${tagId}`, {
        headers,
      });

      if (response.data.success === true) {
        alert('Tag deleted successfully');
      } else {
        alert('Used tag cannot be deleted');
        console.error('Error deleting tag:', response.data.error);
      }
    } catch (error) {
      alert('Used tag cannot be deleted');
      console.error('Error deleting tag:', error);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleReloadForm = async () => {
    window.location.reload();
  };

  // In your JSX, pass the tag ID to the handleDelete function

  // const handleUpdate = () => {
  //   console.log('Update clicked');
  // };
  return (
    <>
      <Helmet>
        <title> Dashboard: users | PB-BANK </title>
      </Helmet>
      <CustomContainer>
        {/* <Typography variant="h4" sx={{ mb: 1, mt: -10 }}>
          <h1>someting</h1>
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              {/* <CardHeader title="Recommended users" subheader="List" /> */}
              <CardHeader title="users" />
              <BoxContainer>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  {users && users.length === 0 ? (
                    <Typography variant="body1">Currently, there are no recommended events.</Typography>
                  ) : (
                    users &&
                    users.map((user) => (
                      <>
                        <Grid item key={user._id} xs={12} md={10} lg={10}>
                          <Container style={{ margin: '0px 100% 20px 0px' }}>
                            <Stack direction="row" alignItems="center" spacing={-1}>
                              {/* Left Side: Image */}
                              <Box
                                component="img"
                                alt={user.name}
                                src={user.photo}
                                sx={{ width: 100, height: 100, borderRadius: 1.5, flexShrink: 0, marginRight: 3 }}
                                onClick={() => handleusersClick(user)}
                                style={{ cursor: 'pointer' }}
                              />

                              {/* Middle: Title */}
                              <Box
                                sx={{ minWidth: 300, flexGrow: 1 }}
                                onClick={() => handleusersClick(user)}
                                style={{ cursor: 'pointer' }}
                              >
                                {user.email || 'No Email'}
                              </Box>

                              <Box
                                sx={{ minWidth: 200, flexGrow: 1 }}
                                onClick={() => handleusersClick(user)}
                                style={{ cursor: 'pointer' }}
                              >
                                {user.name || 'No Name'}
                              </Box>

                              <Box
                                sx={{ minWidth: 130, flexGrow: 1 }}
                                onClick={() => handleusersClick(user)}
                                style={{ cursor: 'pointer' }}
                              >
                                {user.sub_end_date || 'No Subscription End Date'}
                              </Box>

                              {/* Right Side: Time */}
                              <Typography variant="caption" sx={{ pr: 1, flexShrink: 0, color: 'text.secondary' }}>
                                {/* <IconButton aria-label="delete" onClick={() => handleDelete(user._id)}>
                                  <DeleteIcon />
                                </IconButton> */}
                                <IconButton
                                  aria-label="update"
                                  onClick={() => handleusersClick(user)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Typography>
                            </Stack>
                          </Container>
                        </Grid>
                      </>
                    ))
                  )}
                </Stack>
              </BoxContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <form onSubmit={submit}>
              <Container style={{ margin: '20px 100% 0px 35px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} mt={2}>
                    <TextField
                      disabled
                      label="Name"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="text"
                      name="name"
                      value={userInputs.name}
                      onChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={6} mt={2}>
                    <TextField
                      disabled
                      label="Email"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="text"
                      name="email"
                      value={userInputs.email}
                      onChange={handleInputs}
                    />
                  </Grid>

                  <Grid item xs={6} mt={2}>
                    <TextField
                      label="Amount"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="text"
                      name="amount"
                      value={setBillings.amount}
                      onChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={6} mt={2}>
                    <TextField
                      label="Expire Date"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="text"
                      name="expiredDate"
                      value={setBillings.expiredDate}
                      onChange={handleInputs}
                    />
                  </Grid>

                  <Grid item xs={8}>
                    {/* something */}
                  </Grid>
                </Grid>
              </Container>
              <CustomGrid item xs={12} sm={12} lg={12} mt={2}>
                <Box sx={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
                  <Button variant="contained" type="submit" disabled={isSubmitting} sx={{ marginRight: '2px' }}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>

                  <Button
                    sx={{ marginRight: '5px' }}
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleReloadForm}
                  >
                    Clear Form
                  </Button>
                </Box>
              </CustomGrid>
            </form>

            <TableContainer component={Paper}>
              <h3 style={{marginRight : "5px"}}>Billing History</h3>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Expired Date</TableCell>
                  <TableCell>Updated Date</TableCell>
                  <TableCell>Message</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={''} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>Mohammed Sarvar</TableCell>
                  <TableCell>Rs : 3000</TableCell>
                  <TableCell>22/04/2024</TableCell>
                  <TableCell>22/04/2024</TableCell>
                  <TableCell>something</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>


          </Grid>

          
        </Grid>
      </CustomContainer>

      <StyledBackdrop open={isLoading}>
        <CircularProgress color="inherit" size={60} />
        <LoaderText variant="body1">Loading...</LoaderText>
      </StyledBackdrop>

      <StyledBackdrop open={imgLoader}>
        <CircularProgress color="inherit" size={60} />
        <LoaderText variant="body1">Loading...</LoaderText>
      </StyledBackdrop>

      {successMessage !== '' && (
        <Alert severity="success" sx={{ width: '30%', height: '20%', textAlign: 'center' }}>
          {successMessage}
        </Alert>
      )}
    </>
  );
}
