import React from 'react';
import Post from './Post/Post';
import useStyles from './style';
import { Grid,CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
const Posts = ({setcurrentId}) => {
    // console.log(setcurrentId)
    const { posts, isLoading } = useSelector((state) => state.posts);
    console.log(posts)
    const classes=useStyles();
    // console.log(posts)
    if (!posts.length && !isLoading) return 'No posts';
    return (
        isLoading ?<CircularProgress/> : 
        (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3} >
            {
                posts.map(post =>(
                    <Grid  key={post._id} item xs={12} sm={6}>
                        <Post post={post} setcurrentId={setcurrentId}></Post>
                        </Grid>
                ))
            }

            </Grid>
        )
    );
};

export default Posts;