import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { TextField, Grid, Paper, CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {connect} from "react-redux";
import ImageUploader from '../../../../../components/ImageUploader';

import {editArticleAction} from '../../../../../actions/ArticlesActions';
import {getArticle} from '../../../../../services/articles';
import {AsyncError404} from '../../../../../components/AsyncComponent';
import validator from 'validator';

class Edit extends React.Component {

    state = {
        title: '',
        date: '',
        image: '',
        editorState: EditorState.createEmpty(),
        loading: true
    }

    componentDidMount() {
        const {id} = this.props.match.params
        const article = getArticle(id);
        if(article) {
            this.setState ({
                article,
                title: article.title,
                date: article.date,
                image: article.image,
                editorState: EditorState.createWithContent(convertFromRaw(article.content)),
            })
        }
        this.setState({
            loading:false
        })
    }
    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }
    handleImageChange = (res) => {
        this.setState({
            image: res
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    onArticleEdit = (e) => {
        e.preventDefault();
        const article = this.vaildateArticleData();
        if(article) {
            this.props.editArticleAction(article);
            this.props.history.push('/dashboard/articles');
        }
    }

    vaildateArticleData() {
        const { title, editorState, image, date, article: { id } } = this.state;
        const content = convertToRaw(editorState.getCurrentContent());
        this.clearErrorMessages();

        let isValid = true;
        if (validator.isEmpty(title)) {
            isValid = false;
            this.setState(() => ({ titleError: 'Title is required' }));
        }
        
        const contentBlocksText = content.blocks.find(item => !validator.isEmpty(item.text))
        if (!contentBlocksText) {
            isValid = false;
            this.setState(() => ({ contentError: 'Content is required' }));
        }
        if (validator.isEmpty(image)) {
            isValid = false;
            this.setState(() => ({ imageError: 'Image is required' }));
        }
        if (validator.isEmpty(date)) {
            isValid = false;
            this.setState(() => ({ dateError: 'Date is required' }));
        }
        if (isValid) {
            return { title, content, image, date, id };
        }
    }

    clearErrorMessages= () => {
        this.setState(() => ({ 
            titleError: '',
            contentError: '',
            imageError: '',
            dateError: '',
        }));
    }

    render() {
        const {classes} = this.props;
        const {title, date, editorState, image, article, loading} = this.state;
        const {titleError, contentError, imageError, dateError} = this.state;

        if(loading) {
            return (
                <CircularProgress className={classes.progress} />
            )
        }

        return (
            article ?
            (<Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Edit article
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={(e) => this.onArticleEdit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            autoFocus
                            value={title}
                            onChange={this.handleChange}
                            error={titleError}
                            helperText={titleError}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date"
                                label="Date"
                                name="date"
                                variant="outlined"
                                required
                                fullWidth
                                type="date"
                                value={date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange}
                                error={dateError}
                                helperText={dateError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            
                        </Grid>
                        <ImageUploader image={image} imageError={imageError}
                            handleImageChange={this.handleImageChange}/>
                        <Grid item xs={12}>
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName={contentError?"editorClassNameError":"editorClassName"}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                            <p className={classes.error}>{contentError}</p>
                        </Grid>
                    </Grid>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Edit
                    </Button>
                    </form>
                </div>
            </Container>) : (
                <AsyncError404 />
            )
        );
    }
    
}

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
        '.editorClassName': {
            height: '300px !important',
            border: '1px solid #F1F1F1'
        },
        '.editorClassNameError': {
            height: '300px !important',
            border: '1px solid #f44336'
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progress: {
        margin: theme.spacing(2),
    },
    error: {
        color: '#f44336',
        margin: '8px 12px 0'
    }
});

const mapStateToProps = (state) => state;

export default withStyles(styles)(connect(mapStateToProps, {
    editArticleAction
})(Edit));