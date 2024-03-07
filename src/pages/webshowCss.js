import styled from "@emotion/styled";
import { Backdrop, Grid, Typography } from "@mui/material";

export const CardContainer = styled(Grid)({
    position: 'relative',
    boxShadow: '0 2px 10px rgba(35, 39, 66, 0.15)', // Set the shadow color here
    borderRadius: '4px',
    overflow: 'hidden', // Hide any overflow to prevent the shadow from being cut off
    // '&:hover': {
    //   transform: 'scale(0.95)',
    // },
  });
  
  export const CardImageWrapper = styled('div')({
    position: 'relative',
    backgroundColor: '#232742', // Set the background color here
    transition: 'transform 0.3s ease', // Add transition property for smooth hover effect
    // '&:hover': {
    //   transform: 'scale(0.95)',
    // },
  });
  
  export const CardImage = styled('img')({
    display: 'block',
    width: '70%',
    height: '70%',
    
    

  });
  
  export const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    '&:hover': {
        transform: 'scale(0.95)',
      },
  });


  export const StyledBackdrop = styled(Backdrop)`
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

export const LoaderText = styled(Typography)`
  && {
    margin-top: 1rem;
    color: #fff;
  }
`;