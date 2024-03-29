// component
import { Tooltip } from '@mui/material';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => 
<Tooltip title={name} placement="right" arrow>
    <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  </Tooltip>

const navConfig = [
  {
    title: '',
    path: '/dashboard',
    icon: icon('home'),
  },
  {
    title: '',
    path: '/tags',
    icon: icon('tags'),
  },
  {
    title: '',
    path: '/events',
    icon: icon('events'),
  }
  
];

export default navConfig;
