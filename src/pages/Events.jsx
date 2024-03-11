import axios from 'axios';


import { Helmet } from 'react-helmet-async';
import React, { useEffect, useState } from 'react';
// @mui
import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [backupImg, setBackupImgs] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [tagList, setTagList] = useState([]);

  const [userInputs, setUserInputs] = useState({
    _id: '',
    name: '',
    stars: '',
    event_type: '',
    reward_type: '',
    tags: '', // Update the data type based on your requirements
    photo: [], // Add the photo key
    newImage: null, // Add the newImage key with a default value
    // Add more fields as needed
    oldRecord: false,
  });

  const handleInputs = (e) => {
    if (e.target && e.target.name) {
      const inputValue = e.target.value;

      // Handle the "name" field
      if (e.target.name === 'name') {
        if (inputValue.length <= 20) {
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: inputValue,
          }));
        } else {
          alert('Name must be up to 20 characters.');
        }
      }

      // Handle the "stars" field
      if (e.target.name === 'stars') {
        if (/^\d{0,2}$/.test(inputValue)) {
          setUserInputs((prevInputs) => ({
            ...prevInputs,
            [e.target.name]: inputValue,
          }));
        } else {
          alert('Stars must be a number with at most 2 digits.');
        }
      }

      // Handle other fields
      if (['event_type', 'reward_type', 'tags'].includes(e.target.name)) {
        setUserInputs((prevInputs) => ({
          ...prevInputs,
          [e.target.name]: inputValue,
        }));
      }
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;

    // Validate up to 4 images as selected but displaying correctly 4 only
    if (files.length > 4) {
      alert('You can upload up to 4 images.');

      // Optionally, you can clear the input to visually reflect the limit
      e.target.value = '';
      return;
    }

    const newImages = Array.from(files)
      .slice(0, 4)
      .map((file) => ({
        id: Date.now(),
        photo: URL.createObjectURL(file),
        newImage: file,
      }));

    // Replace the previous images with the new selection
    setSelectedImgs([...newImages]);
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
          'x-security-header': '6571819fae1ec44369082bf3',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU3MDlkNjI0ZDRkMzFhNWM0MWZmOGQiLCJpYXQiOjE3MDk2NDAyMjR9.iRiOk7bWrWFs8iHPxEdO04sjAXWEUsMP0Ot296wCchc',
        };

        // Fetch data from the first API
        const eventResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/events/get-all-recommended-events`,
          {
            headers,
          }
        );
        setEvents(eventResponse.data.data);

        // Fetch data from the second API
        const tagResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/tags/get-all-tag`, {
          headers,
        });
        
        setTagList(tagResponse.data.data);
      } catch (error) {
        // Handle error here
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

    // Populate the form fields when a tag is clicked
    setUserInputs({
      _id: data._id,
      name: data.name,
      stars: data.stars,
      max_count: data.max_count,
      event_type: data.event_type,
      reward_type: data.reward_type ? 'CR' : 'DR',
      tags: tagIds,
      oldRecord: true,
      // Add more fields as needed
    });
    setSelectedImgs(data);
    setBackupImgs(data);
  };

  const [successMessage, setSuccessMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!userInputs.name || !userInputs.stars || !userInputs.reward_type || !userInputs.tags) {
      alert('Please fill out all required fields');
      return;
    }

    if (selectedImgs.photo === undefined) {
      if (selectedImgs.length === 0) {
        alert('Please select at least one image');
        return;
      }
    }
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      let imageUrls;

      if (selectedImgs.photo === undefined) {
        if (selectedImgs.length === 0) {
          alert('Please select at least one image');
          return;
        }
        // If a new image is selected, upload it and get the image URLs
        imageUrls = selectedImgs.map((img) => img.photo); // Assuming selectedImgs is an array
        if (selectedImgs.some((img) => img.newImage)) {
          const formData = new FormData();

          // Append each new image to the FormData
          selectedImgs.forEach((img) => {
            if (img.newImage) {
              formData.append('ps-img', img.newImage);
            }
          });

          const uploadResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/upload/events`, formData);
          imageUrls = uploadResponse.data.data.map((file) => file.imageUrl);
        }
      } else {
        imageUrls = selectedImgs.photo;
      }
      const data = {
        _id: userInputs._id,
        name: userInputs.name,
        stars: userInputs.stars,
        photo: imageUrls,
        reward_type: userInputs.reward_type, // Add the appropriate field
        event_type: userInputs.event_type, // Add the appropriate field
        tags: userInputs.tags, // Add the appropriate field
        is_recommended: true,
        // Add more fields as needed
      };

      // Make the API call to insert or update the tag data
      const headers = {
        'x-security-header': '6571819fae1ec44369082bf3',
      };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/events/add-recommended-event`, data, {
        headers,
      });

      if (response) {
        setSuccessMessage(userInputs._id !== '' ? 'tag updated successfully' : 'tag inserted successfully');
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
      // Handle error here
      console.error('Error submitting data:', error);
    }

    setIsLoading(false);
  };

  const handleDelete = async (eventId) => {
    try {
      setIsLoading(true);
      // Make the API call to delete the tag using both user ID and tag ID
      const headers = {
        'x-security-header': '6571819fae1ec44369082bf3',
      };
      
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/events/delete-recommended-event/${eventId}`, { headers });
      
      if (response.data.success === true) {
        alert("Event deleted successfully");
      } else {
        alert("response.data.message");
        console.error('Error deleting tag:', response.data.error);
      }
    } catch (error) {
      alert(error.response.data.message);
      console.error('Error deleting tag:', error);
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
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
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardHeader title="Recommended Events" />
              <BoxContainer>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  {events && events.length === 0 ? (
                    <Typography variant="body1">Currently, there are no recommended events.</Typography>
                  ) : (
                    events && events.map((data) => (
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
                            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
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

          <Grid item xs={12} md={6} lg={8}>
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
                      {tagList && tagList.map((tag) => (
                        <MenuItem key={tag._id} value={tag._id}>
                          {`${tag.name} - ${tag.tag_type}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  {/* Add other fields as needed */}
                  <Grid item xs={12} style={{ display: 'inline-flex' }}>
                    {Array.isArray(selectedImgs)
                      ? selectedImgs.map((img, index) => (
                          <Grid item xs={4} key={index} gap={2} spacing={2} mt={1}>
                            <img
                              src={img.photo}
                              alt={`${index + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '10px' }}
                            />
                          </Grid>
                        ))
                      : selectedImgs.photo.map((img, index) => (
                          <Grid item xs={4} key={index} mt={1}>
                            <img
                              src={img}
                              alt={`${index + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '10px' }}
                            />
                          </Grid>
                        ))}
                  </Grid>

                  <Grid item xs={12}>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                  </Grid>
                  <Grid item xs={8}>
                    {/* something */}
                  </Grid>
                </Grid>
              </Container>
              <CustomGrid item xs={12} sm={12} lg={12} mt={2}>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </CustomGrid>
            </form>
          </Grid>
        </Grid>
      </CustomContainer>

      <StyledBackdrop open={isLoading}>
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
