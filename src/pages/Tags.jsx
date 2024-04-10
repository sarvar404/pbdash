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

export default function Tags() {

  const logData = getStoredUserData(KEY_ADMIN);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [backupImg, setBackupImgs] = useState(null);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const fileInputRef = useRef(null);

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
  
    try {
      Promise.all(
        Array.from(files).map(async (file) => {
          // Check if file size is less than or equal to 5 MB
          if (file.size > 5 * 1024 * 1024) {
            setIsLoading(false);
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
            alert('Error uploading image:');
            return null;
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image:');
            return null;
          }
        })
      ).then((uploadedImgUrls) => {
        const filteredUrls = uploadedImgUrls.filter((url) => url !== null);
        setSelectedImgs((prevSelectedImgs) => [...prevSelectedImgs, ...filteredUrls]);
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading image:');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const headers = {
          'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
          authorization:
          `Bearer ${logData?.total?.refreshToken}`
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
    
    setSelectedImgs(tag.photo);
    setBackupImgs(tag);
  };

  const [successMessage, setSuccessMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!userInputs.name || !userInputs.tag_type) {
      alert('Please fill out all required fields');
      return;
    }

    if (!selectedImgs || selectedImgs.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    try {
     
      const data = {
        name: userInputs.name,
        tag_type: userInputs.tag_type,
        photo: selectedImgs,
        is_recommended: true,
      };

      // Make the API call to insert or update the tag data
      const headers = {
        'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
        authorization:
        `Bearer ${logData?.total?.refreshToken}`
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

      const confirmed = window.confirm("Are you sure you want to delete this event?");
      if (!confirmed) {
        return; // Exit the function if the user cancels the deletion
      }
      
      setIsLoading(true);
      // Make the API call to delete the tag using both user ID and tag ID
      const headers = {
        'x-security-header': process.env.REACT_APP_X_SECURITY_HEADER,
      };

      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/tags/delete-tag/${tagId}`, {
        headers,
      });

      if (response.data.success === true) {
        alert('Tag deleted successfully');
      } else {
        alert('response.data.message');
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
        <title> Dashboard: Tags | PB-BANK </title>
      </Helmet>
      <CustomContainer>
        {/* <Typography variant="h4" sx={{ mb: 1, mt: -10 }}>
          <h1>someting</h1>
        </Typography> */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card>
              {/* <CardHeader title="Recommended Tags" subheader="List" /> */}
              <CardHeader title="Recommended Tags" />
              <BoxContainer>
                <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                  {tags && tags.length === 0 ? (
                    <Typography variant="body1">Currently, there are no recommended tags.</Typography>
                  ) : (
                    tags &&
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
                            <Typography variant="caption" sx={{ pr: 1, flexShrink: 0, color: 'text.secondary' }}>
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

          <Grid item xs={12} md={6} lg={6}>
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
                              src={img}
                              alt={`${index + 1}`}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', padding: '10px' }}
                            />
                          </Grid>
                        ))
                      : selectedImgs.map((img, index) => (
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
                  <Button variant="contained" disabled={isSubmitting} onClick={handleReloadForm}>
                    Clear Form
                  </Button>
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

      {successMessage !== '' && (
        <Alert severity="success" sx={{ width: '30%', height: '20%', textAlign: 'center' }}>
          {successMessage}
        </Alert>
      )}
    </>
  );
}
