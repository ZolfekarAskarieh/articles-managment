import React from 'react';
import { Grid, TextField, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import noImageSelected from '../../assets/img/no-image-selected.png';
import { NotificationManager } from 'react-notifications';
import { MAX_ALLOWED_SIZE } from '../../constants/configs';

const styles = theme => ({
    img: {
        maxWidth: '100%',
        maxHeight: '300px'
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center'
    },
    progress: {
        margin: theme.spacing(2),
    },
});

class ImageUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            loading: false,
            imageError: this.props.imageError
        }

    }

    componentDidMount() {
        this.setState({
            image: this.props.image
        })
    }

    componentWillReceiveProps(newProps) {
        if(this.props.imageError !== newProps.imageError) {
            this.setState({
                imageError: newProps.imageError
            })
        }
    }

    onImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        this.setState({
            loading: true,
        })

        reader.onload = (eventReader) => {
            this.setState({
                image: eventReader.target.result,
                loading: false
            })
            this.props.handleImageChange(eventReader.target.result);
        };

        const fileChecker = this.checkFileConditions(file);
        if(fileChecker.success) {
            reader.readAsDataURL(file);
        } else {
            NotificationManager.error(fileChecker.msg);
            event.target.value = ''
            this.setState({
                image: '',
                loading: false
            })
        }
    }

    checkFileConditions = (file) => {

        const res = {success: true, msg: ''}
        if(!file) {
            res.success = false;
            res.msg = 'Please select a file';
            return res;
        }
        if (file.size > MAX_ALLOWED_SIZE) {
            res.success = false;
            res.msg = 'Image should be maximum 4MB';
            return res;
        }   
        if(!file.type.startsWith('image/')) {
            res.success = false;
            res.msg = 'Please select only images';
            return res;
        }
        return res;
    }

    render() {

        const { classes, name } = this.props;
        const { image, loading, imageError } = this.state;

        return (
            <Grid item container xs={12} spacing={1}>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        name={name}
                        variant="outlined"
                        type="file"
                        id={name}
                        error={imageError}
                        helperText={imageError}
                        onChange={this.onImageChange}
                    />
                </Grid>
                <Grid item xs={6} className={classes.imageWrapper}>
                    {!loading && <img className={classes.img} src={image || noImageSelected} />}
                    {loading && <CircularProgress className={classes.progress} />}
                </Grid>
            </Grid>
        );
    }
}

ImageUploader.defaultProps = {
    handleImageChange: () => {},
}

export default withStyles(styles)(ImageUploader);