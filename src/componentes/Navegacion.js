import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function Navegacion(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.handle(props.activeStep);
  };
  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Recents" value={0} icon={<RestoreIcon />} />
      <BottomNavigationAction label="Folder" value={1} icon={<FolderIcon />} />
      <BottomNavigationAction label="Favorites" value={2} icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" value={3} icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Folder" value={4} icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
