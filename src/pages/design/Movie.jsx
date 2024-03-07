import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';



import ReactPlayer from 'react-player';

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
  OutlinedInput,
  Rating,
  Box,
  Stack,
  CardMedia,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  TextareaAutosize,
  Alert,
  CircularProgress,
  Backdrop,
} from '@mui/material';

import styled from '@emotion/styled';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import axios from 'axios';
import { UploadFileRounded } from '@mui/icons-material';

import validateForm from '../forms/validateFormForMovies';

const FancyHR = styled('div')({
  height: 3,
  width: '100%',
  backgroundColor: 'white',
  marginTop: 10,
  marginBottom: 10,
});
const UploadIcon = styled(CloudUploadIcon)({
  transform: 'scale(2.0)',
  color: '#232742',
});

// -----------------------------------working here-----------------------------------
const VideoPlayer = ({ videoPath }) => {
  return <ReactPlayer url={videoPath} controls width="100%" height="auto" />;
};



// -----------------------------------Loader css -----------------------------------

const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: ${({ theme }) => theme.zIndex.drawer + 1};
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    backdrop-filter: blur(3px);
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const LoaderText = styled(Typography)`
  && {
    margin-top: 1rem;
    color: #fff;
  }
`;


// ----------------------------EXPORTING FUNCTION HERE ------------------------------------



export function Movie(props) {

  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [userInputs, setUserInputs] = useState({
    title: '',
    description: '',
    year: '',
    classification: '',
    rating: 2.5,
    sub_label: '',
    duration: '',
    enable_comments: false, // Set initial value to false
    trailer: '',
  });

  const handleInputs = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setUserInputs({ ...userInputs, [name]: inputValue });
  };

  

  const [fileSourceUrl, setFileSourceUrl] = useState([]);
  const [filePosterImg, setFilePosterImg] = useState(null);
  const [fileBannerImg, setFileBannerImg] = useState(null);
  const [subtitleFile, setSubtitleFile] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState([]);

  const handlePosterImg = (event) => {
    const file = event.target.files[0];
    setFilePosterImg(file);
  };

  const handleBannerImg = (event) => {
    const file = event.target.files[0];
    setFileBannerImg(file);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // handling actors here working here

  const [variantName, setVariantName] = useState([]);

  useEffect(() => {
    if (props.value) {
      setVariantName(props.value);
    }
  }, [props.value]);

  const handleChangeActors = (event) => {
    setVariantName(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  const isSelected = (variant) => {
    return variantName.findIndex((item) => item && item._id === variant._id) !== -1;
  };

  const handleToggle = (variant) => {
    const selectedIndex = variantName.findIndex((item) => item && item._id === variant._id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = [...variantName, variant];
    } else {
      newSelected = [...variantName.slice(0, selectedIndex), ...variantName.slice(selectedIndex + 1)];
    }
    setVariantName(newSelected);
    if (props.onChange) {
      props.onChange(newSelected);
    }
  };

  // handling categories here
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (props.value) {
      setCategories(props.value);
    }
  }, [props.value]);

  const handleChangeCategories = (event) => {
    setCategories(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  const isSelectedforCategories = (variant) => {
    return categories.findIndex((item) => item && item._id === variant._id) !== -1;
  };

  const handleToggleforCategories = (variant) => {
    const selectedIndex = categories.findIndex((item) => item && item._id === variant._id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = [...categories, variant];
    } else {
      newSelected = [...categories.slice(0, selectedIndex), ...categories.slice(selectedIndex + 1)];
    }
    setCategories(newSelected);
    if (props.onChange) {
      props.onChange(newSelected);
    }
  };

  const [actors, setActors] = useState([]);
  const [category, setCategory] = useState([]);

  // const fetchActors = async () => {

  // };

  const fetchCategories = useMemo(() => {
    return (url, params) => {
      return axios.get(url, { params });
    };
  }, []);

  const fetchActors = useMemo(() => {
    return (url, params) => {
      return axios.get(url, { params });
    };
  }, []);

  const fetchDetails = useMemo(() => {
    return (url, params) => {
      return axios.get(url, { params });
    };
  }, []);

  useEffect(() => {
    Promise.all([
      fetchCategories(`${process.env.REACT_APP_BASE_URL}/api/ctg/v1/get-categories-movie`),
      fetchActors(`${process.env.REACT_APP_BASE_URL}/api/pvt/actv1/get-actor-id`),
    ])
      .then(([categoriesResponse, actorsResponse, detailsResponse]) => {
        setCategory(categoriesResponse.data);
        setActors(actorsResponse.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fetchCategories, fetchActors]);

  const [sourceUrl, setSourceUrl] = useState([{ language: '', source_url: '', videoPath: '' }]);

  const addClick = () => {
    if (sourceUrl.length < 10) {
      setSourceUrl((prevSourceUrl) => [...prevSourceUrl, { language: '', source_url: '', videoPath: '' }]);
    }
  };

  const createUI = () => {
    return sourceUrl.map((el, i) => (
      <Grid container spacing={3} key={i} alignItems="center" style={{ marginTop: '1%' }}>
        <InputLabel sx={{ display: 'block', marginLeft: '10px' }}>SOURCE DETAILS</InputLabel>
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
            Source <small> [URL]</small>
          </InputLabel>
          <TextField
            style={{ width: '100%' }}
            size="small"
            name="source_url"
            value={el.source_url || ''}
            onChange={(e) => handleSourceUrl(e, i)}
            variant="standard"
            InputProps={{ style: { color: 'white' } }}
          />
          {el.videoPath ? <VideoPlayer videoPath={el.videoPath} /> : null}
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
    const { name, value } = event.target;
    const newInputs = [...sourceUrl];

    if (name === 'source_url') {
      newInputs[index] = {
        ...newInputs[index],
        source_url: value,
        videoPath: value, // Set videoPath directly from the entered URL
      };
    } else {
      newInputs[index] = {
        ...newInputs[index],
        language: value,
      };
    }

    setSourceUrl(newInputs);
  };

  const removeClickSourceUrl = (i) => {
    const newSourceUrl = [...sourceUrl];
    newSourceUrl.splice(i, 1);
    setSourceUrl(newSourceUrl);
  };

  // ======================SUBTITLE & LANGUAGE ==============================
  const [inputSubtitle, setInputSubtitle] = useState([{ lang: '', subtitle: null }]);

  const addClickSub = () => {
    if (inputSubtitle.length < 10) {
      setInputSubtitle((prevInputSubtitle) => [...prevInputSubtitle, { lang: '', subtitle: null }]);
    }
  };

  const createUISubtitle = () => {
    return inputSubtitle.map((el, i) => (
      <Grid container spacing={3} key={i} alignItems="center" style={{ marginTop: '1%' }}>
        <InputLabel sx={{ display: 'block', marginLeft: '10px' }}>SUBTITLE DETAILS</InputLabel>
        <Grid item xs={12}>
          <InputLabel sx={{ display: 'block', textAlign: 'left' }}>
            Subtitle <small> [Language]</small>
          </InputLabel>
          <TextField
            style={{ width: '100%' }}
            size="small"
            select
            name="lang"
            value={el.lang || ''}
            onChange={(e) => handleSubtitle(e, i)}
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
            Subtitle <small> [Video File]</small>
          </InputLabel>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            size="medium"
            sx={{ transform: 'scale(2.0)' }}
          >
            <input hidden name="subtitle" accept=".srt" type="file" onChange={(e) => handleSubtitle(e, i)} />
            <UploadFileRounded size="medium" />
          </IconButton>
        </Grid>
        {el.subtitle && (
          <Grid item xs={12}>
            <a href={URL.createObjectURL(el.subtitle)} download={el.subtitle.name} style={{ textDecoration: 'none' }}>
              Download
            </a>
          </Grid>
        )}
        <Grid item xs={12}>
          {i > 0 && (
            <Button variant="outlined" color="error" size="small" onClick={() => removeClickSubtitle(i)}>
              -
            </Button>
          )}
          {i === inputSubtitle.length - 1 && i < 9 && (
            <Button variant="outlined" size="small" onClick={addClickSub}>
              +
            </Button>
          )}
        </Grid>
      </Grid>
    ));
  };

  const [tags, setTags] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const lastChar = value[value.length - 1];
    if (lastChar === '\n') {
      event.preventDefault();
      const newTag = value.trim().replace(/\n/g, '');

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }

      event.target.value = '';
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubtitle = (event, index) => {
    const { name, files } = event.target;
    const newInputs = [...inputSubtitle];
    if (name === 'subtitle') {
      newInputs[index] = {
        ...newInputs[index],
        subtitle: files[0],
      };
    } else {
      newInputs[index] = {
        ...newInputs[index],
        lang: event.target.value,
      };
    }
    setInputSubtitle(newInputs);
  };

  const removeClickSubtitle = (i) => {
    const newInputSubtitle = [...inputSubtitle];
    newInputSubtitle.splice(i, 1);
    setInputSubtitle(newInputSubtitle);
  };

  const [validationErrors, setValidationErrors] = useState({
    title: '',
    description: '',
    year: '',
    classification: '',
    
    sub_lable: '',
    duration: '',
    enable_comments: '',
    trailer: '',
    eSourceUrl: '',
    ePosteImg: '',
    eBannerImg: '',
    eCategories: '',
    eSubtitle: '',
    eTags: '',
    eVariantName: '',
  });


  const submit = async (e) => {
    
    e.preventDefault();

    

    const { isValid, errors } = validateForm(
      userInputs,
      sourceUrl,
      inputSubtitle,
      variantName,
      filePosterImg,
      fileBannerImg,
      categories,
      tags
    );

    if (!isValid) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    try {
      
      formData.append('title', userInputs.title);

      formData.append('description', userInputs.description);
      formData.append('year', userInputs.year);
      formData.append('classification', userInputs.classification);
      formData.append('rating', userInputs.rating);
      formData.append('sub_lable', userInputs.sub_lable);
      formData.append('duration', userInputs.duration);

      formData.append('enable_comments', userInputs.enable_comments);
      formData.append('trailer', userInputs.trailer);
      formData.append('actors', JSON.stringify(variantName));
      formData.append('categories', JSON.stringify(categories));

      formData.append('tags', tags);

      Array.from(filePosterImg).map((item) => formData.append('poster_img', item));

      Array.from(fileBannerImg).map((item) => formData.append('banner_img', item));

      sourceUrl.map((item, index) => {
        return (
          <>
            {formData.append(`source_url${index}`, item.source_url)}
            {formData.append(`language${index}`, item.language)}
          </>
        );
      });

      inputSubtitle.map((item, index) => {
        return (
          <>
            {formData.append(`subtitle${index}`, item.subtitle)}
            {formData.append(`lang${index}`, item.lang)}
          </>
        );
      });

      // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/mv1/insert-movie`, formData);
      setSuccessMessage('Data inserted successfully');
      setUserInputs({
        title: '',
        description: '',
        year: '',
        classification: '',
        rating: '',
        sub_lable: '',
        duration: '',
        enable_comments: '',
        trailer: '',
      });
      setCategories([]);
      setFilePosterImg([]);
      setFileSourceUrl([]);
      setFileBannerImg([]);
      setTimeout(() => {
        window.location.reload();
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      setSuccessMessage('Please try again and make sure you have filled the required');
      setUserInputs({
        title: '',
        description: '',
        year: '',
        classification: '',
        rating: '',
        sub_lable: '',
        duration: '',
        enable_comments: '',
        trailer: '',
      });
      setFilePosterImg([]);
      setFileSourceUrl([]);
      setFileBannerImg([]);
      setTimeout(() => {
        
        setSuccessMessage('');
      }, 1000);
    }

    setIsLoading(false);

    // console.log(formData);

    console.log(Object.fromEntries(formData), 'form data');
  };
  return (
    <>
      <Helmet>
        {' '}
        <title>Add New Movie</title>{' '}
      </Helmet>
      <Grid container>
  <Grid item xs={12} md={12} lg={12}>
    <Box
      sx={{
        textAlign: 'center',
        backgroundColor: '#232742',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '20px',
        width: '100%', // Use width: '100%' instead of display: 'inline-block'
      }}
    >
      <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 'bold' }}>
        Add New Movie
      </Typography>
    </Box>
  </Grid>
</Grid>
      <form>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6} lg={4}>
            <Card className="__forCardOfPlayers">
              <div className="__divOfUploadVidIcon">
                {createUI()}
                <FancyHR />
                {createUISubtitle()}
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
                  <Grid item xs={12} sm={8}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="title_label">
                      Title
                    </InputLabel>
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      type="text"
                      name="title"
                      placeholder="title"
                      value={userInputs.title}
                      onChange={handleInputs}
                      id="title"
                      variant="standard"
                    />
                    <p className="error-message-all">{validationErrors.title}</p>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="year_label">
                      Year <small>[Only year can be added]</small>
                    </InputLabel>
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      type="number"
                      name="year"
                      placeholder="year"
                      value={userInputs.year}
                      onChange={handleInputs}
                      variant="standard"
                    />
                    <p className="error-message-all">{validationErrors.year}</p>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="description_label">
                      Description
                    </InputLabel>
                    <TextareaAutosize
                      variant="standard"
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #83909B',
                        borderRadius: '4px',
                      }}
                      minRows={4}
                      value={userInputs.description}
                      onChange={handleInputs}
                      placeholder="Type tags and press Enter to add them..."
                    />

                    <p className="error-message-all">{validationErrors.description}</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="sub_lable_label">
                      Sub Label
                    </InputLabel>
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      type="text"
                      name="sub_lable"
                      placeholder="sub lable"
                      value={userInputs.sub_lable}
                      onChange={handleInputs}
                      id="sub_lable"
                      variant="standard"
                    />
                    <p className="error-message-all">{validationErrors.sub_lable}</p>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="classification_label">
                      Classification
                    </InputLabel>
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      type="text"
                      name="classification"
                      placeholder="classification"
                      value={userInputs.classification}
                      onChange={handleInputs}
                      id="classification"
                      variant="standard"
                    />
                    <p className="error-message-all">{validationErrors.classification}</p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '3%' }}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="number_label">
                      Rating <small>[Give number only Upto 5 only]</small>
                    </InputLabel>
                    {/* <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      type="number"
                      name="rating"
                      placeholder="rating"
                      value={userInputs.rating}
                      onChange={handleInputs}
                      id="rating"
                      variant="standard"
                    /> */}

                    <Stack spacing={1}>
                      <Rating
                        name="rating"
                        value={userInputs.rating}
                        precision={0.5}
                        onChange={handleInputs}
                        sx={{ color: '#444654' }}
                      />
                      {/* ... other input fields */}
                    </Stack>
                    <p className="error-message-all">{validationErrors.rating}</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="duration_label">
                      Duration <small>[Give number only]</small>
                    </InputLabel>
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      type="number"
                      name="duration"
                      placeholder="e.g 1 hr / 2 hr"
                      value={userInputs.duration}
                      onChange={handleInputs}
                      id="duration"
                      variant="standard"
                    />
                    <p className="error-message-all">{validationErrors.duration}</p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '3%' }}>
                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="actors_label">
                      Select Actors <small>[Role play]</small>
                    </InputLabel>

                    <Select
                      size="small"
                      sx={{ width: '100%' }}
                      id="actors-select"
                      multiple
                      value={variantName}
                      onChange={handleChangeActors}
                      input={<OutlinedInput label="actor" />}
                      renderValue={(selected) =>
                        selected && selected.length > 0 ? selected.map((item) => item && item.name).join(', ') : ''
                      }
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="">
                        <em>Select message</em>
                      </MenuItem>
                      {actors.data &&
                        actors.data.map((variant, index) => {
                          return (
                            <div key={variant._id}>
                              <input
                                type="checkbox"
                                value={JSON.stringify(variant)}
                                checked={isSelected(variant)}
                                onChange={() => handleToggle(variant)}
                              />
                              {variant.name}
                            </div>
                          );
                        })}
                    </Select>
                    <p className="error-message-all">{validationErrors.eVariantName}</p>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <InputLabel sx={{ display: 'block', textAlign: 'left' }} id="categories_label">
                      Select Categories
                    </InputLabel>

                    <Select
                      size="small"
                      sx={{ width: '100%' }}
                      id="categories-select"
                      multiple
                      value={categories}
                      onChange={handleChangeCategories}
                      input={<OutlinedInput label="categories" />}
                      renderValue={(selected) =>
                        selected && selected.length > 0 ? selected.map((item) => item && item.name).join(', ') : ''
                      }
                      MenuProps={MenuProps}
                    >
                      <MenuItem value="">
                        <em>Select message</em>
                      </MenuItem>
                      {category.data &&
                        category.data.map((categories, index) => {
                          return (
                            <div key={categories._id}>
                              <input
                                type="checkbox"
                                value={JSON.stringify(categories)}
                                checked={isSelectedforCategories(categories)}
                                onChange={() => handleToggleforCategories(categories)}
                              />
                              {categories.name}
                            </div>
                          );
                        })}
                    </Select>
                    <p className="error-message-all">{validationErrors.eCategories}</p>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '10px' }}
                  >
                    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <IconButton
                        component="label"
                        htmlFor="poster_img"
                        style={{ borderRadius: '100px', padding: '20px' }}
                      >
                        <UploadIcon />
                      </IconButton>
                      <span style={{ fontSize: '20px', marginTop: '10px' }}>Poster IMG</span>
                      <input
                        id="poster_img"
                        type="file"
                        name="poster_img"
                        onChange={handlePosterImg}
                        style={{ display: 'none' }}
                      />
                      {filePosterImg && (
                        <CardMedia
                          style={{ objectFit: 'contain', marginTop: '20px' }}
                          component="img"
                          height="200"
                          alt="Poster IMG"
                          src={URL.createObjectURL(filePosterImg)}
                        />
                      )}
                    </Card>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ backgroundColor: '#f7f7f7', padding: '20px', borderRadius: '10px' }}
                  >
                    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <IconButton
                        component="label"
                        htmlFor="banner_img"
                        style={{ borderRadius: '100px', padding: '20px' }}
                      >
                        <UploadIcon />
                      </IconButton>
                      <span style={{ fontSize: '20px', marginTop: '10px' }}>Banner IMG</span>
                      <input
                        id="banner_img"
                        type="file"
                        name="banner_img"
                        onChange={handleBannerImg}
                        style={{ display: 'none' }}
                      />
                      {fileBannerImg && (
                        <CardMedia
                          style={{ objectFit: 'contain', marginTop: '20px' }}
                          component="img"
                          height="200"
                          alt="Banner IMG"
                          src={URL.createObjectURL(fileBannerImg)}
                        />
                      )}
                    </Card>
                    <p className="error-message-all">{validationErrors.eBannerImg}</p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: '3%' }}>
                  <Grid item sm={8}>
                    <div style={{ display: 'block', textAlign: 'left' }}>
                      <InputLabel id="tags_label">Tags</InputLabel>
                      <TextareaAutosize
                        style={{
                          width: '100%',
                          padding: '8px',
                          border: '1px solid #83909B',
                          borderRadius: '4px',
                        }}
                        minRows={4}
                        onChange={handleInputChange}
                        placeholder="Type tags and press Enter to add them..."
                      />
                      <ul style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0 }}>
                        {tags.map((tag) => (
                          <li key={tag}>
                            {tag}
                            <Button onClick={() => handleTagRemove(tag)} style={{ color: '#83909B' }}>
                              x
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="error-message-all">{validationErrors.eTags}</p>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">Enable / Disable</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="enable_comments"
                              checked={userInputs.enable_comments}
                              onChange={handleInputs}
                              style={{ color: '#232742' }} // Apply color style to the checkbox
                            />
                          }
                          label="Click"
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={submit}
                    style={{
                      backgroundColor: '#232742',
                      color: '#ffffff',
                      borderRadius: '4px',
                      boxShadow: 'none',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      transition: 'transform 0.3s ease',
                    }}
                    sx={{
                      '&:hover': {
                        transform: 'scale(0.9)',
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </div>
            </Card>
          </Grid>
        </Grid>
      </form>

      {successMessage !== '' && (
        <Alert severity="success" sx={{ width: '30%', height: '20%', textAlign: 'center' }}>
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
