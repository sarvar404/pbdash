const validateForm = (userInputs) => {
  let isValid = true;
  const errors = {
    email: '',
    password: ''
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userInputs.email || !emailPattern.test(userInputs.email)) {
    isValid = false;
    errors.email = 'Invalid email address';
  } else {
    errors.email = '';
  }

  if (!userInputs.password || userInputs.password.trim() === '') {
    isValid = false;
    errors.password = 'Password is required';
  } else {
    errors.password = "";
  }


  return { isValid, errors };
};

export default validateForm;
