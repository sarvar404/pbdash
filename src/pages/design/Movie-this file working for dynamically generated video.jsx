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
  Button,
} from '@mui/material';

import { UploadFileRounded } from '@mui/icons-material';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';

import { FrameContainer, VideoPlayer, shakeAnimation } from './MovieFunction';

// ----------------------------------------------------------------------

export function Movie() {
  // Dynamic Source URL
  const [sourceUrl, setSourceUrl] = useState([{ language: '', source_url: '', videoPath: '' }]);

  


  const [uploadProgress, setUploadProgress] = useState([]);

  const addClick = () => {
    if (sourceUrl.length < 10) {
      setSourceUrl((prevSourceUrl) => [
        ...prevSourceUrl,
        { language: '', source_url: '', videoPath: '' }
      ]);
      setUploadProgress((prevUploadProgress) => [...prevUploadProgress, 0]);
    }
  };

  const createUI = () => {
    return sourceUrl.map((el, i) => (
      <Grid container spacing={3} key={i} alignItems="center" style={{ marginTop: '1%' }}>
        <Grid item xs={12}>
          <InputLabel sx={{ display: 'block', textAlign: 'left' }}>
            Source <small> [Language]</small>
          </InputLabel>
          <TextField
            style={{ width: '100%' }}
            size="small"
            select
            name="language"
            value={el.language || ''}
            onChange={(e) => handleSourceUrl(e, i)}
            variant="standard"
            InputProps={{ style: { color: 'white' } }}
          >
            <MenuItem className="__dynDrop" value="">
              Select
            </MenuItem>
            <MenuItem className="__dynDrop" value="English">
              English
            </MenuItem>
            <MenuItem className="__dynDrop" value="Spanish">
              Spanish
            </MenuItem>
            <MenuItem className="__dynDrop" value="German">
              German
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
        <InputLabel sx={{ display: 'block', textAlign: 'left' }}>
          Source <small> [Language]</small>
        </InputLabel>
        <IconButton
          aria-label="upload picture"
          component="label"
          sx={{
            color: '#97A4B1',
            fontSize: '10px',
            fontWeight: 'bold',
          }}
        >
          <input
            hidden
            accept=".mp4"
            name="source_url"
            type="file"
            onChange={(e) => handleSourceUrl(e, i)}
          />
          <PlaylistAddRoundedIcon size="medium" sx={{ transform: 'scale(1.6)' }} />
        </IconButton>
        {uploadProgress[i] < 100 ? (
          <LinearProgress
            variant="determinate"
            value={uploadProgress[i]}
            style={{ width: '100%', marginTop: '10px' }}
          />
        ) : el.videoPath ? (
          <VideoPlayer videoPath={el.videoPath} />
        ) : null}
        </Grid>

        <Grid item xs={12}>
          {i > 0 && (
            <Button variant="outlined" color="error" size="small" onClick={() => removeClickSourceUrl(i)}>
              -
            </Button>
          )}
          {i === sourceUrl.length - 1 && i < 9 && (
            <Button variant="outlined" size="small" onClick={addClick}>
              +
            </Button>
          )}
        </Grid>
      </Grid>
    ));
  };

  const handleSourceUrl = (event, index) => {
    const { name, files } = event.target;
    const newInputs = [...sourceUrl];
  
    if (name === 'source_url') {
      newInputs[index] = {
        ...newInputs[index],
        source_url: files[0],
      };
    } else {
      newInputs[index] = {
        ...newInputs[index],
        language: event.target.value,
      };
    }
  
    setSourceUrl(newInputs);
  
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setUploadProgress((prevUploadProgress) => {
      const newProgress = [...prevUploadProgress];
      newProgress[index] = 0;
      return newProgress;
    });
  
    const uploadTask = setTimeout(() => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          clearInterval(interval);
          newInputs[index].videoPath = fileUrl;
          setSourceUrl(newInputs);
        }
        setUploadProgress((prevUploadProgress) => {
          const newProgress = [...prevUploadProgress];
          newProgress[index] = progress;
          return newProgress;
        });
      }, 500);
    }, 1500);
  };
  

  const removeClickSourceUrl = (i) => {
    const newSourceUrl = [...sourceUrl];
    newSourceUrl.splice(i, 1);
    setSourceUrl(newSourceUrl);
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
              {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
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
              )} */}

              {createUI()}
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
                    <MenuItem TextFieldvalue="false">False</MenuItem>
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
