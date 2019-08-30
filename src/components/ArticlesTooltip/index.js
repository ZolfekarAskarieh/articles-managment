import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
    float: 'right'
  },
}));

export default function ArticlesTooltip({ icon, float, match }) {
    const classes = useStyles();
    return (
        <Tooltip title="Add" aria-label="add">
            <Fab color="primary" component={Link} to={"/dashboard/articles/create"} className={classes.fab}>
                <AddIcon />
            </Fab>
        </Tooltip>
    );
}
