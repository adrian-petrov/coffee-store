import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: '#aaaa',
  },
  heading: {
    textAlign: 'center',
  },
}));

function Coffee() {
  const classes = useStyles();

  const [isAddingProduct, setIsAddingProduct] = React.useState(false);

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        {isAddingProduct ? <p>Add product form</p> : <p>Coffee table</p>}
        {/* TODO: Create table */}
        {/* TODO: Create add product form */}
      </Grid>
    </div>
  );
}

export default Coffee;
