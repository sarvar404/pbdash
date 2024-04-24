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
  Select,
  Stack,
  Switch,
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

export default function Notification() {
  const logData = getStoredUserData(KEY_ADMIN);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoader, setImgLoader] = useState(false);
  const [backupImg, setBackupImgs] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const fileInputRef = useRef(null);
  const [enableFilter, setEnableFilter] = useState(true);
  const [updateData, setUpdateData] = useState(false);

  const [userInputs, setUserInputs] = useState({
    _id: '',
    title: '',
    message: '',
    expiredDate: '',
    photo: '',
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
    if (e.target && e.target.name) {
      let inputValue = e.target.value;
      const fieldName = e.target.name;

      let maxLength;

      if (fieldName === 'expiredDate') {
        const currentDate = new Date();
        const selectedDate = new Date(inputValue);

        // Check if selected date is in the past
        if (selectedDate < currentDate) {
          alert('Please select a date equal to or after today.');
          return; // Exit the function if date is in the past
        }
      } else if (fieldName === 'message') {
        maxLength = 80;

        // Convert message to array of words
        const words = inputValue.split(' ');

        // Check each word
        words.forEach((word, index) => {
          if (word.length > 15 && !/\s/.test(word)) {
            alert('Please add space between each word');
            words[index] = `${word.slice(0, 15)} ${word.slice(15)}`;
          }
        });

        // Join the words back into a single string
        inputValue = words.join(' ');
      } else if (fieldName === 'title') {
        maxLength = 30;
      } else {
        maxLength = null;
      }

      // Check if the entered text exceeds the maxLength
      if (maxLength && inputValue.length > maxLength) {
        alert(`Upto ${maxLength} characters are allowed for ${fieldName}`);
        return; // Exit the function if exceeds maxLength
      }

      setUserInputs((prevInputs) => ({
        ...prevInputs,
        [fieldName]: inputValue,
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
    const fetchnotifications = async () => {
      try {
        const headers = {
          'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
          authorization: `Bearer ${logData?.total?.refreshToken}`,
        };

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/notifications`, { headers });
        
        setNotification([response.data.data]);
      } catch (error) {
        // Handle error here
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchnotifications();
  }, []);

  const handleNotificationsClick = (notification) => {
    // Populate the form fields when a notification is clicked
    setImgLoader(true);
    setUserInputs({
      _id: notification._id,
      title: notification.title,
      message: notification.message,
      expiredDate: notification.expiredDate,
      photo: notification.photo,
      // Add more fields as needed
    });
    setEnableFilter(!!notification.message);

    setSelectedImgs([notification.photo]);
    setBackupImgs(notification);
    setImgLoader(false);
    setUpdateData(true);
  };

  const [successMessage, setSuccessMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (updateData === false) {
      if (notifications[0]?._id !== undefined) {
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
        response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/notifications`, data, {
          headers,
        });
      } else {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/notifications`, data, { headers });
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

      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/notifications/delete-tag/${tagId}`, {
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
        <title> Dashboard: notifications | PB-BANK </title>
      </Helmet>
      <CustomContainer>
        {/* <Typography variant="h4" sx={{ mb: 1, mt: -10 }}>
          <h1>someting</h1>
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              {/* <CardHeader title="Recommended notifications" subheader="List" /> */}
              <CardHeader title="Notifications" />
              <BoxContainer>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  {(notifications && notifications[0]?._id === '') || notifications[0]?._id === undefined ? (
                    <Typography variant="body1">Currently, there are no any notifications.</Typography>
                  ) : (
                    notifications &&
                    notifications.map((notification) => (
                      <>
                        <Grid item key={notification._id} xs={12} md={12} lg={12}>
                          <Container style={{ margin: '0px 100% 20px 0px' }}>
                            <Stack direction="row" alignItems="center" spacing={3}>
                              {/* Left Side: Image */}
                              {notification.message ? (
                                <Box
                                  sx={{ minWidth: 240, flexGrow: 0.5 }}
                                  onClick={() => handleNotificationsClick(notification)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {notification.message || 'No Message'}
                                </Box>
                              ) : (
                                <Box
                                  component="img"
                                  alt={notification.title}
                                  src={notification.photo}
                                  sx={{ width: 100, height: 100, borderRadius: 1.5, flexShrink: 0, marginRight: 3 }}
                                  onClick={() => handleNotificationsClick(notification)}
                                  style={{ cursor: 'pointer' }}
                                />
                              )}

                              {/* Middle: Title */}
                              <Box
                                sx={{ minWidth: 240, flexGrow: 1 }}
                                onClick={() => handleNotificationsClick(notification)}
                                style={{ cursor: 'pointer' }}
                              >
                                {notification.title || 'No Title'}
                              </Box>

                              {/* Right Side: Time */}
                              <Typography variant="caption" sx={{ pr: 1, flexShrink: 0, color: 'text.secondary' }}>
                                {/* <IconButton aria-label="delete" onClick={() => handleDelete(notification._id)}>
                                  <DeleteIcon />
                                </IconButton> */}
                                <IconButton
                                  aria-label="update"
                                  onClick={() => handleNotificationsClick(notification)}
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
                      label="Title"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="text"
                      name="title"
                      value={userInputs.title}
                      onChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={6} mt={2}>
                    <TextField
                      label="Expired Date *"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="date"
                      name="expiredDate"
                      value={userInputs.expiredDate}
                      onChange={handleInputs}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        min: new Date().toISOString().split('T')[0], // Set minimum date to today
                      }}
                    />
                  </Grid>
                  {enableFilter ? (
                    <Grid item xs={6}>
                      <TextField
                        label="Message *"
                        variant="standard"
                        multiline
                        rows={4}
                        size="small"
                        style={{ width: '100%' }}
                        type="text"
                        name="message"
                        value={userInputs.message}
                        onChange={handleInputs}
                        placeholder="Write your message here"
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} style={{ display: 'inline-flex' }}>
                      {selectedImgs.map((img, index) => (
                        <Grid item xs={4} key={index} gap={2} spacing={2} mt={1}>
                          {imgLoader && <div>Loading...</div>}
                          <img
                            src={img}
                            alt={`${index + 1}`}
                            style={{
                              display: imgLoader ? 'none' : 'block',
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              padding: '10px',
                            }}
                            onLoad={() => setImgLoader(false)}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                  {!enableFilter && (
                    <Grid item xs={12} mt={2}>
                      <input
                        id="ps-img"
                        type="file"
                        name="ps-img"
                        onChange={handlePosterImg}
                        accept="image/*"
                        multiple={!enableFilter ? false : undefined}
                      />
                    </Grid>
                  )}
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
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleCancel}
                    sx={{ marginRight: '2px' }}
                  >
                    Clear Images
                  </Button>
                  <Button
                    sx={{ marginRight: '5px' }}
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleReloadForm}
                  >
                    Clear Form
                  </Button>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={enableFilter}
                        onChange={(event) => {
                          setEnableFilter(event.target.checked);
                          handleToggleChange(event);
                        }}
                        name="enableFilter"
                      />
                    }
                    label={enableFilter ? 'Write Message' : 'Write Message'}
                  />
                </Box>
              </CustomGrid>
            </form>
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
