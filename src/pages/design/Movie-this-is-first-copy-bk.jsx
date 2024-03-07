import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Card,
  CardHeader,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
  LinearProgress,
} from '@mui/material';

import { Add, CloudUpload } from '@mui/icons-material';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';

import { FrameContainer, VideoPlayer, shakeAnimation } from './MovieFunction';

// ----------------------------------------------------------------------

export function Movie() {
  const [videoPath, setVideoPath] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // Process the uploaded image file here
    const imageUrl = URL.createObjectURL(file);
    setImagePath(imageUrl);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    // Process the uploaded video file here
    const fileUrl = URL.createObjectURL(file);
    setUploadProgress(0);

    const uploadTask = setTimeout(() => {
      // Simulating video upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          clearInterval(interval);
          setVideoPath(fileUrl);
        }
        setUploadProgress(progress);
      }, 500);
    }, 1500);
  };
  return (
    <>
      <Helmet>
        <title> Dashboard | MOONTV </title>
      </Helmet>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={4}>
          <Card className="__forCardOfPlayers">
            <div className="__divOfUploadVidIcon">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                <IconButton
                  component="label"
                  htmlFor="video-upload"
                  sx={{
                    color: '#97A4B1',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  <PlaylistAddRoundedIcon fontSize="inherit" style={{ fontSize: '70px' }} />
                  click to 'Upload Video'
                  <input
                    type="file"
                    id="video-upload"
                    style={{ display: 'none' }}
                    accept="video/"
                    onChange={handleVideoUpload}
                  />
                </IconButton>
              </div>
              {uploadProgress < 100 ? (
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  style={{ width: '100%', marginTop: '10px' }}
                />
              ) : (
                <VideoPlayer videoPath={videoPath} />
              )}

              <label
                htmlFor="image-upload"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 'auto',
                  fontSize: '32px',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              >
                <input
                  type="file"
                  id="image-upload"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <CloudUpload fontSize="inherit" sx={{ marginRight: '10px' }} />
                Upload Image
              </label>
              {imagePath && (
                <FrameContainer>
                  <img src={imagePath} alt="Uploaded IMG" style={{ maxWidth: '100%' }} />
                </FrameContainer>
              )}
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Card
            sx={{
              background: 'white',
              backdropFilter: 'blur(10px)',
              height: '100%',
            }}
          >
            <div style={{ minHeight: '100vh', padding: '20px' }}>
              <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 1 }} spacing={5}>
                <Grid item md={6} sx={{ padding: '10px' }}>
                  <InputLabel sx={{ textAlign: 'left', fontSize: '15px', color: 'black' }} id="name">
                    Category Name
                  </InputLabel>
                  <TextField
                    variant="standard"
                    style={{ width: '100%' }}
                    size="small"
                    type="text"
                    name="name"
                    placeholder="name"
                    id="name"
                    InputLabelProps={{ style: { color: 'black' } }}
                  />
                </Grid>
                <Grid item sm={3} sx={{ padding: '10px' }}>
                  <InputLabel sx={{ textAlign: 'left', fontSize: '15px', color: 'black' }} id="type">
                    Category Type
                  </InputLabel>
                  <TextField
                    style={{ width: '100%' }}
                    size="small"
                    select
                    name="type"
                    defaultValue=""
                    variant="standard"
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value={2}>MOVIES</MenuItem>
                    <MenuItem value={3}>WEB SERIES</MenuItem>
                    <MenuItem value={1}>TV CHANNEL</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={3} sx={{ padding: '10px' }}>
                  <InputLabel sx={{ textAlign: 'left', fontSize: '15px', color: 'black' }} id="enable">
                    Enable
                  </InputLabel>
                  <TextField
                    style={{ width: '100%' }}
                    size="small"
                    select
                    name="enable"
                    defaultValue=""
                    variant="standard"
                  >
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
