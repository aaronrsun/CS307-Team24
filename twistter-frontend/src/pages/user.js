/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import '../App.css';
import { Link } from 'react-router-dom';
import { makeStyles, styled } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import AddCircle from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';

// component
import Userline from '../Userline';
import noImage from '../images/no-img.png';
import Writing_Microblogs from '../Writing_Microblogs';
import PostSkeleton from '../util/PostSkeleton';

const MyChip = styled(Chip)({
  margin: 2,
  color: 'primary'
});

class user extends Component {  
  state = {
    profile: null,
    imageUrl: null,
    topics: null,
    newTopic: null
  };
  
  handleDelete = (topic) => {
    alert(`Delete topic: ${topic}!`);
  }
  
  handleAddCircle = () => {
    axios.post('/putTopic', {
      topic: this.state.newTopic
    })
    .then(function () {
      location.reload();
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  handleChange(event) {
    this.setState({
      newTopic: event.target.value
    })
  }

  componentDidMount() {
    axios
      .get("/user")
      .then(res => {
        this.setState({
          profile: res.data.credentials.handle,
          imageUrl: res.data.credentials.imageUrl
        });
      })
      .catch(err => console.log(err));

    axios
      .get("/getAllTopics")
      .then(res => {
        this.setState({
          topics: res.data
        })
      })
      .catch(err => console.log(err));

    axios
      .get("/getallPostsforUser")
      .then(res => {
        console.log(res.data);
        this.setState({
          posts: res.data
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const classes = this.props;
    let profileMarkup = this.state.profile ? (
      <p>
      <Typography variant='h5'>{this.state.profile}</Typography>
      </p>) : (<p>loading username...</p>);
    
    let topicsMarkup = this.state.topics ? (
      this.state.topics.map(topic => <MyChip 
        label={{topic}.topic.topic}
        key={{topic}.topic.topicId}
        onDelete={ (topic) => this.handleDelete(topic)}/>)
    ) : (<p> loading topics...</p>);

    let imageMarkup = this.state.imageUrl ? (
      <img
      src={this.state.imageUrl}
      height="250"
      width="250"
      />
    ) : (<img src={noImage}/>);

    let postMarkup = this.state.posts ? (
      this.state.posts.map(post => 
      <p>
        {imageMarkup} <br />
        {post.userHandle} <br />
        {post.createdAt} <br />
        {post.microBlogTitle} <br />
        {post.body} <br />
        {post.microBlogTopics} <br />
        Likes {post.likeCount} Comments {post.commentCount} <br />
      </p>)
    ) : (<p>My Posts</p>);

    return (
      <Grid container spacing={24}>
        <Grid item sm={4} xs={8}>
          {imageMarkup}
          {profileMarkup}
          {topicsMarkup}
          <TextField
          id="newTopic"
          label="new topic"
          defaultValue=""
          margin="normal"
          variant="outlined"
          value={this.state.newTopic}
          onChange={ (event) => this.handleChange(event)}
          />
          <AddCircle
            color="primary"
            clickable
            onClick={this.handleAddCircle}
          />
          <br />
          <Button component={ Link } to='/edit'>Edit Profile Info</Button>
        </Grid>
        <Grid item sm={4} xs={8}>
          <Writing_Microblogs />
        </Grid>
        <Grid item sm={4} xs={8}>
          {postMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default user;
