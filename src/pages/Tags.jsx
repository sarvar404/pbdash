import axios from 'axios';

import { faker } from '@faker-js/faker';
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
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
// @mui
import { useTheme } from '@mui/material/styles';
// sections
import { AppNewsUpdate, AppCurrentSubject } from '../sections/@dashboard/app';
import { LoaderText, StyledBackdrop } from './webshowCss';

const CustomContainer = styled(Container)`
  && {
    max-width: 20000px;
    margin-left: -40px;
    margin-right: -40px;
    margin-top: -40px;
  }
`;

const CustomContainer2 = styled(Container)`
  && {
    margin: 20px 0 0 35px;
    display: inline-flex;
  }
`;

const CustomGrid = styled(Grid)`
  && {
    margin: 20px 100% 0px 55px;
  }
`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BoxContainer = styled(Box)({
  maxHeight: 'calc(87vh - 140px)', // Adjust this value according to your header height
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
});

export default function Tags() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backupImg, setBackupImgs] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);

  const [userInputs, setUserInputs] = useState({
    _id: '',
    name: '',
    tag_type: '',
    photo: [], // Add the photo key
    newImage: null, // Add the newImage key with a default value
    // Add more fields as needed
    oldRecord: false,
  });

  const handleInputs = (e) => {
    if (e.target && e.target.name) {
      const inputValue = e.target.value;

      // Check if the entered text exceeds 10 characters
      if (inputValue.length <= 20) {
        setUserInputs((prevInputs) => ({
          ...prevInputs,
          [e.target.name]: inputValue,
        }));
      } else {
        alert('Upto 20 characters are allowed');
      }
      // Optionally, you can display an error message or handle it as per your requirements
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
    const fetchTags = async () => {
      try {
        const headers = {
          'x-security-header': '6571819fae1ec44369082bf3',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWU3MDlkNjI0ZDRkMzFhNWM0MWZmOGQiLCJpYXQiOjE3MDk2NDAyMjR9.iRiOk7bWrWFs8iHPxEdO04sjAXWEUsMP0Ot296wCchc',
        };

        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/tags/get-all-tag`, { headers });
        setTags(response.data.data);
      } catch (error) {
        // Handle error here
        console.error('Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = (tag) => {
    // Populate the form fields when a tag is clicked
    setUserInputs({
      _id: tag._id,
      name: tag.name,
      tag_type: tag.tag_type,
      oldRecord: true,
      // Add more fields as needed
    });
    setSelectedImgs(tag);
    setBackupImgs(tag);
  };

  const [successMessage, setSuccessMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!userInputs.name || !userInputs.tag_type) {
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
        name: userInputs.name,
        tag_type: userInputs.tag_type,
        photo: imageUrls,
        is_recommended: true,
      };

      // Make the API call to insert or update the tag data
      const headers = {
        'x-security-header': '6571819fae1ec44369082bf3',
      };
      let response;
      if (userInputs._id !== '') {
        response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/tags/update-tag/${userInputs._id}`, data, {
          headers,
        });
      } else {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/tags/add-tag`, data, { headers });
      }

      if (response) {
        setSuccessMessage(userInputs._id !== '' ? 'tag updated successfully' : 'tag inserted successfully');
        setSelectedImgs([]);
        setUserInputs({
          _id: '',
          name: '',
          tag_type: '',
          photo: [], // Add the photo key
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
      setIsLoading(true);
      // Make the API call to delete the tag using both user ID and tag ID
      const headers = {
        'x-security-header': '6571819fae1ec44369082bf3',
      };
      
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/tags/delete-tag/${tagId}`, { headers });
      console.log(response.data.success);
      if (response.data.success === true) {
        alert("Tag deleted successfully");
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

  // In your JSX, pass the tag ID to the handleDelete function

  const handleUpdate = () => {
    console.log('Update clicked');
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Tags | PB-BANK </title>
      </Helmet>
      <CustomContainer>
        {/* <Typography variant="h4" sx={{ mb: 1, mt: -10 }}>
          <h1>someting</h1>
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              {/* <CardHeader title="Recommended Tags" subheader="List" /> */}
              <CardHeader title="Recommended Tags" />
              <BoxContainer>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  {tags && tags.length === 0 ? (
                    <Typography variant="body1">Currently, there are no recommended tags.</Typography>
                  ) : (
                    tags.map((tag) => (
                      <>
                        <Grid item key={tag._id} xs={12} md={12} lg={12}>
                          <Stack direction="row" alignItems="center" spacing={3}>
                            {/* Left Side: Image */}
                            <Box
                              component="img"
                              alt={tag.name}
                              src={tag.photo[0]}
                              sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0, marginRight: 3 }}
                              onClick={() => handleTagClick(tag)}
                              style={{ cursor: 'pointer' }}
                            />
                            {/* Middle: Title */}
                            <Box
                              sx={{ minWidth: 240, flexGrow: 1 }}
                              onClick={() => handleTagClick(tag)}
                              style={{ cursor: 'pointer' }}
                            >
                              {tag.name || 'No Name'}
                            </Box>

                            {/* Right Side: Time */}
                            <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
                              <IconButton aria-label="delete" onClick={() => handleDelete(tag._id)}>
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                aria-label="update"
                                onClick={() => handleTagClick(tag)}
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
                      label="Tag Name *"
                      variant="standard"
                      size="small"
                      style={{ width: '100%' }}
                      type="text"
                      name="name"
                      value={userInputs.name}
                      onChange={handleInputs}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="tag_type">
                      Tag Type *
                    </InputLabel>
                    <Select
                      labelId="tag-type-label"
                      id="tag-type"
                      name="tag_type"
                      value={userInputs.tag_type}
                      onChange={handleInputs}
                      label="Tag Type"
                      style={{ width: '100%' }}
                      size="small"
                    >
                      <MenuItem value="CR">CR</MenuItem>
                      <MenuItem value="DR">DR</MenuItem>
                    </Select>
                  </Grid>
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
