import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import ArticlesTooltip from '../../components/ArticlesTooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { deleteArticleAction, editArticleAction } from '../../actions/ArticlesActions';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  img: {
    maxWidth: '100%',
    maxHeight: '80px'
  }
}));

function ArticlesTable(props) {
  const classes = useStyles();
  const { articles, deleteArticleAction } = props;
  return (
    <Paper className={classes.root}>
        <ArticlesTooltip />
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell align="left">Actions</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Image</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {articles.map(article => (
                    <TableRow key={article.title}>
                        <TableCell align="left">
                            <IconButton onClick={() => deleteArticleAction(article)} aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton component={Link} to={`/dashboard/articles/edit/${article.id}`} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row">{article.title}</TableCell>
                        <TableCell align="left">{article.date}</TableCell>
                        <TableCell align="left"><img className={classes.img} src={article.image} /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
  );
}

const mapStateToProps = ({articlesReducer}) => {
    return {articles: articlesReducer.articles};
}
export default connect(mapStateToProps, {
    deleteArticleAction,
    editArticleAction
})(ArticlesTable);