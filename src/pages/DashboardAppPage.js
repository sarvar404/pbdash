import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { Grid, Container, Typography, Card } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
// components
// ----------------------------------------------------------------------
DashboardAppPage.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};
const CustomContainer = styled(Container)`
  && {
    max-width: 20000px;
    margin-left: -40px;
    margin-right: -40px;
    margin-top: -40px;
  }
`;

export default function DashboardAppPage({ title, total, icon, sx, ...other }) {
  const theme = useTheme();
  const color1 = 'primary';
  const color = 'info';
  return (
    <>
      <Helmet>
        <title> Dashboard | PB-BANK </title>
      </Helmet>

      <CustomContainer maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5, mt: 5, ml: 2 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3} sx={{ ml: 5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Link to="/tags" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                sx={{
                  py: 5,
                  boxShadow: 0,
                  textAlign: 'center',
                  color: (theme) => theme.palette[color1].darker,
                  bgcolor: (theme) => theme.palette[color1].lighter,
                  ...sx,
                }}
                {...other}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <SellOutlinedIcon sx={{ fontSize: '50px', mt: 1, mr: 1 }} />
                  <h3>All Tags</h3>
                </div>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Link to="/events" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card
                sx={{
                  py: 5,
                  boxShadow: 0,
                  textAlign: 'center',
                  color: (theme) => theme.palette[color].darker,
                  bgcolor: (theme) => theme.palette[color].lighter,
                  ...sx,
                }}
                {...other}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <CalendarTodayOutlinedIcon sx={{ fontSize: '50px', mt: 1, mr: 1 }} />
                  <h3>All Events</h3>
                </div>
              </Card>
            </Link>
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}
        </Grid>
      </CustomContainer>
    </>
  );
}
