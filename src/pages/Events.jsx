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
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
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

const CustomGrid = styled(Grid)`
  && {
    margin: 20px 100% 0px 55px;
  }
`;

const BoxContainer = styled(Box)({
  maxHeight: 'calc(87vh - 140px)', // Adjust this value according to your header height
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
});

export default function Events() {
  const logData = getStoredUserData(KEY_ADMIN);

  const [eventType, setEventType] = useState(false); // State for toggle
  const today = new Date(); // Get current date
  const initialStartAt = today.toISOString().substr(0, 10); // Format to "YYYY-MM-DD"
  const initialEndAt = today.toISOString().substr(0, 10); // Format to "YYYY-MM-DD"

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgLoader, setImgLoader] = useState(false);
  const [backupImg, setBackupImgs] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [tagList, setTagList] = useState([]);
  const fileInputRef = useRef(null);
  const [userInputs, setUserInputs] = useState({
    _id: '',
    name: '',
    stars: '',
    reward_type: '',
    tags: '',
    photo: [],
    newImage: null,
    oldRecord: false,
    startAt: initialStartAt, // Initialize with current date
    endAt: initialEndAt, // Initialize with current date
    frequency: 'D',
    maxCount: 1,
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;

    // Handle the "name" field
    if (name === 'name') {
      if (value.length <= 20) {
        setUserInputs((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      } else {
        alert('Name must be up to 20 characters.');
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
      if (/^\d{0,2}$/.test(value)) {
        // Validates that it's a number with at most 2 digits
        const intValue = parseInt(value, 10); // Parse the value to an integer
        if (intValue > 0) {
          // Check if the value is positive
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            [name]: intValue.toString(), // Convert back to string before setting state
          }));
        } else {
          alert('Max Count must be a positive number with at most 2 digits.');
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

  const handlePosterImg = (e) => {
    setIsLoading(true);
    const files = e.target.files;

    if (files.length === 0) {
      setIsLoading(false);
      return;
    }

    if (selectedImgs.length + files.length > 4) {
      setIsLoading(false);
      e.target.value = '';
      alert('You can only upload a maximum of four images.');
      return;
    }
    setImgLoader(true);
    try {
      Promise.all(
        Array.from(files).map(async (file) => {
          // Check if file size is less than or equal to 5 MB
          if (file.size > 5 * 1024 * 1024) {
            setIsLoading(false);
            setImgLoader(false);
            alert('Please select only JPG images with size less than 5 MB');
            return null; // Return null for this file
          }

          const formData = new FormData();
          formData.append('ps-img', file, 'ps-img.jpg'); // Ensure file name is 'ps-img.jpg'

          try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload/events`, formData);
            if (response.data.success === true) {
              return response.data.data[0].imageUrl;
            }
            alert('Error uploading image : Please select correct image format');
            setImgLoader(false);
            return null;
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image : Please select correct image format');
            setImgLoader(false);
            return null;
          }
        })
      ).then((uploadedImgUrls) => {
        const filteredUrls = uploadedImgUrls.filter((url) => url !== null);
        setSelectedImgs((prevSelectedImgs) => [...prevSelectedImgs, ...filteredUrls]);
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading image : Please select correct image format');
      setImgLoader(false);
    } finally {
      setIsLoading(false);
    }
  };

  const hasNonEmptyFields = (inputs) => {
    return Object.entries(inputs).some(([key, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== '' && value !== null;
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const headers = {
          'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
          authorization: `Bearer ${logData?.total?.refreshToken}`,
        };

        // Fetch data from the first API
        const eventResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/events/get-all-recommended-events`,
          {
            headers,
          }
        );
        setEvents(eventResponse.data.data);
      } catch (error) {
        // Handle error here
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchTags = async (rewardType) => {
    setIsLoading(true);
    const headers = {
      'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
      authorization: `Bearer ${logData?.total?.refreshToken}`,
    };

    try {
      const tagResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/tags/get-all-type-tag`, {
        headers,
        params: {
          // Add your query parameters here
          rewardType,
        },
      });

      if (tagResponse && tagResponse.data && tagResponse.data.data) {
        setTagList(tagResponse.data.data);
      } else {
        alert('Sorry, There is no any tag created yet to select');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userInputs.reward_type !== '') {
      fetchTags(userInputs.reward_type);
    }
  }, [userInputs.reward_type]);

  const handleTagClick = (data) => {
    let tagIds;

    if (Array.isArray(data.tags)) {
      // Extract the tag IDs from the array
      tagIds = data.tags.map((tag) => tag.$oid);
    } else if (data.tags && typeof data.tags === 'object') {
      // Convert the single tag object to an array
      tagIds = [data.tags._id];
    } else {
      // Handle the case where tags is not an array or an object with $oid
      console.error('Invalid tags structure:', data.tags);
      return;
    }
    setImgLoader(true);
    // Populate the form fields when a tag is clicked
    setUserInputs({
      _id: data._id,
      name: data.name,
      stars: data.stars,
      reward_type: data.reward_type === 'DR' ? 'DR' : 'CR',
      tags: tagIds,
      oldRecord: true,
      startAt: data.start_at ? data.start_at : initialStartAt,
      endAt: data.end_at ? data.end_at : initialEndAt,
      frequency: data.frequency ? data.frequency : 'D',
      maxCount: data.max_count ? data.max_count.toString() : '1',
      // Add more fields as needed
    });
    setEventType(data.event_type);
    setSelectedImgs(data?.photo);
    setBackupImgs(data);
  };

  const [successMessage, setSuccessMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!userInputs.name || !userInputs.stars || !userInputs.reward_type || !userInputs.tags) {
      alert('Please fill out all required fields');
      return;
    }

    if (!selectedImgs || selectedImgs.length === 0) {
      alert('Please select at least one image');
      return;
    }

    if (userInputs.stars === 0 || userInputs.stars === '0' || userInputs.stars === '00') {
      alert('Stars cannot be 0 or Negative');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    try {
      const data = {
        _id: userInputs._id,
        name: userInputs.name,
        stars: userInputs.stars,
        photo: selectedImgs,
        reward_type: userInputs.reward_type,
        tags: userInputs.tags, // Add the appropriate field
        is_recommended: true,
        startAt: userInputs.startAt,
        endAt: userInputs.endAt,
        eventType,
        frequency: userInputs.frequency,
        maxCount: userInputs.maxCount,
        // Add more fields as needed
      };

      // Make the API call to insert or update the tag data
      const headers = {
        'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
        authorization: `Bearer ${logData?.total?.refreshToken}`,
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/events/add-recommended-event`, data, {
        headers,
      });

      if (response) {
        setSuccessMessage(userInputs._id !== '' ? 'Events updated successfully' : 'Events inserted successfully');
        setSelectedImgs([]);
        setUserInputs({
          _id: '',
          name: '',
          tag_type: '',
          photo: [], // Add the photo key
          newImage: null, // Add the newImage key with a default value
          oldRecord: false,
        }); // Reset user inputs after submission
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      // add here loader until response done.
    } catch (error) {
      console.log(error.message);
      // Handle error here
      console.error('Error submitting data:', error);
      if (error.response && error.response.data && error.response.data.error === 'Event Already Exist') {
        alert('This event already exists and cannot be changed now.');
      } else {
        alert('Service error');
      }
    }

    setIsLoading(false);
  };

  const handleDelete = async (eventId) => {
    try {
      // Prompt the user to confirm before deleting the record
      const confirmed = window.confirm('Are you sure you want to delete this event?');
      if (!confirmed) {
        return; // Exit the function if the user cancels the deletion
      }

      setIsLoading(true);
      // Make the API call to delete the tag using both user ID and tag ID
      const headers = {
        'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
      };

      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/events/delete-recommended-event/${eventId}`,
        { headers }
      );

      if (response.data.success === true) {
        alert('Event deleted successfully');
      } else {
        alert(response.data.message); // Display the error message from the server
        console.error('Error deleting tag:', response.data.error);
      }
    } catch (error) {
      alert(error.response.data.message); // Display the error message from the server
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

  // const handleUpdate = () => {
  //   console.log('Update clicked');
  // };

  return (
    <>
      <Helmet>
        <title> Dashboard: Events | PB-BANK </title>
      </Helmet>
      <CustomContainer>
        {/* <Typography variant="h4" sx={{ mb: 1, mt: -10 }}>
          <h1>someting</h1>
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              <CardHeader title="Recommended Events" />
              <BoxContainer>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  {events && events.length === 0 ? (
                    <Typography variant="body1">Currently, there are no recommended events.</Typography>
                  ) : (
                    events &&
                    events.map((data) => (
                      <>
                        <Grid item key={data._id} xs={12} md={12} lg={12}>
                          <Stack direction="row" alignItems="center" spacing={3}>
                            {/* Left Side: Image */}
                            <Box
                              component="img"
                              alt={data.name}
                              src={data.photo[0]}
                              sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0, marginRight: 3 }}
                              onClick={() => handleTagClick(data)}
                              style={{ cursor: 'pointer' }}
                            />
                            {/* Middle: Title */}
                            <Box
                              sx={{ minWidth: 240, flexGrow: 1 }}
                              onClick={() => handleTagClick(data)}
                              style={{ cursor: 'pointer' }}
                            >
                              {data.name || 'No Name'}
                            </Box>

                            {/* Right Side: Time */}
                            <Typography variant="caption" sx={{ pr: 1, flexShrink: 0, color: 'text.secondary' }}>
                              <IconButton aria-label="delete" onClick={() => handleDelete(data._id)}>
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                aria-label="update"
                                onClick={() => handleTagClick(data)}
                                style={{ cursor: 'pointer' }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Typography>
                          </Stack>
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
                      label="Event Name *"
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
                      label="Stars"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="number"
                      name="stars"
                      value={userInputs.stars}
                      onChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="reward_type">
                      Reward Type *
                    </InputLabel>
                    <Select
                      labelId="tag-type-label"
                      id="tag-type"
                      name="reward_type"
                      value={userInputs.reward_type}
                      onChange={handleInputs}
                      label="Reward Type"
                      style={{ width: '100%' }}
                      size="small"
                    >
                      <MenuItem value="CR">CR</MenuItem>
                      <MenuItem value="DR">DR</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="tags">
                      Select Tags *
                    </InputLabel>
                    <Select
                      labelId="tag-type-label"
                      id="tag-type"
                      name="tags"
                      value={userInputs.tags}
                      onChange={handleInputs}
                      label="Reward Type"
                      style={{ width: '100%' }}
                      size="small"
                    >
                      {tagList &&
                        tagList.map((tag) => (
                          <MenuItem key={tag._id} value={tag._id}>
                            {`${tag.name} - ${tag.tag_type}`}
                          </MenuItem>
                        ))}
                    </Select>
                  </Grid>

                  {eventType && ( // Conditional rendering based on toggle status
                    <>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          label="Start Date *"
                          variant="standard"
                          size="small"
                          style={{ width: '100%' }}
                          type="date"
                          name="startAt"
                          value={userInputs.startAt}
                          onChange={handleInputs}
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          label="End Date *"
                          variant="standard"
                          size="small"
                          style={{ width: '100%' }}
                          type="date"
                          name="endAt"
                          value={userInputs.endAt}
                          onChange={handleInputs}
                        />
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <Select
                          labelId="tag-type-label"
                          id="tag-type"
                          name="frequency"
                          value={userInputs.frequency}
                          onChange={handleInputs}
                          label="Reward Type"
                          style={{ width: '100%' }}
                          size="small"
                        >
                          {/* Menu items with corresponding values */}
                          <MenuItem value="D">Daily</MenuItem>
                          <MenuItem value="M">Monthly</MenuItem>
                          <MenuItem value="W">Weekly</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={6} mt={2}>
                        <TextField
                          label="Max Count"
                          variant="standard"
                          size="small"
                          style={{ width: '100%' }}
                          type="number"
                          name="maxCount"
                          value={userInputs.maxCount}
                          onChange={handleInputs}
                        />
                      </Grid>
                    </>
                  )}

                  {/* Add other fields as needed */}
                  <Grid item xs={12} style={{ display: 'inline-flex' }}>
                    {Array.isArray(selectedImgs)
                      ? selectedImgs.map((img, index) => (
                          <Grid item xs={4} key={index} gap={2} spacing={2} mt={1}>
                            {imgLoader} {/* Display CircularProgress if imgLoader is true */}
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
                              onLoad={() => setImgLoader(false)} // Set imgLoader to false when image is loaded
                            />
                          </Grid>
                        ))
                      : selectedImgs.map((img, index) => (
                          <Grid item xs={4} key={index} gap={2} spacing={2} mt={1}>
                            {imgLoader} {/* Display CircularProgress if imgLoader is true */}
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
                              onLoad={() => setImgLoader(false)} // Set imgLoader to false when image is loaded
                            />
                          </Grid>
                        ))}
                  </Grid>

                  <Grid item xs={12}>
                    <input id="ps-img" type="file" name="ps-img" onChange={handlePosterImg} multiple />
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
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleCancel}
                    sx={{ marginRight: '2px' }}
                  >
                    Clear Images
                  </Button>
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    onClick={handleReloadForm}
                    sx={{ marginRight: '5px' }}
                  >
                    Clear Form
                  </Button>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={eventType}
                        onChange={() => setEventType(!eventType)}
                        name="toggle"
                        color="primary"
                      />
                    }
                    label="Recurring Events" // Toggle label
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
