import React from 'react';
import useStyles from './style';
import { Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {deletePost,likePost,unlikePost}   from '../../../actions/posts'
const Post = ({post,setcurrentId}) => {
  console.log(post);
  const history = useHistory();

   const dispatch = useDispatch();
    const classes=useStyles();
    const user= JSON.parse(localStorage.getItem('profile'));

const Likes = ()=>{
    if(post.likes.length > 0){
        return post.likes.find((like)=>like === (user?.result?.googleId || user?.result?._id))
        ?(
            <><ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others`: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
        ):(
          <><ThumbUpAltOutlinedIcon fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'} </>  
        )
    }

    return <> <ThumbUpAltOutlinedIcon fontSize="small"/>&nbsp;Like </>;
  };
  const Unlikes = ()=>{
    if(post.unlikes.length > 0){
        return post.unlikes.find((unlike)=>unlike === (user?.result?.googleId || user?.result?._id))
        ?(
            <><ThumbDownAltIcon fontSize="small"/>&nbsp;{post.unlikes.length > 2 ? `You and ${post.unlikes.length - 1} others`: `${post.unlikes.length} unlike${post.unlikes.length > 1 ? 's' : ''}`}</>
        ):(
          <><ThumbDownAltOutlinedIcon fontSize="small"/>&nbsp;{post.unlikes.length} {post.unlikes.length === 1 ? 'Unlike' : 'Unlikes'} </>  
        )
    }

    return <> <ThumbDownAltOutlinedIcon fontSize="small"/>&nbsp;Unlike </>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };
    return (
       <Card className={classes.card}>
          <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
           <CardMedia className={classes.media} image={post.selectedFiles} title={post.title}/>
            <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>

            {(user?.result?.googleId === post?.creator || user?.result?._id=== post?.creator) && (
              <div className={classes.overlay2}>
              <Button style={{color: 'white'}} size="small" onClick={(e) => {
              e.stopPropagation();
              setcurrentId(post._id);
            }}>
                  <MoreHorizIcon fontSize="default"/>
              </Button>
           </div>
            )}
            {/* <div className={classes.overlay2}>
               <Button style={{color: 'white'}} size="small" onClick={()=>{
                //    console.log(post._id)
                   setcurrentId(post._id)
                  }}>
                   <MoreHorizIcon fontSize="default"/>
               </Button>
            </div> */}
          <div className={classes.details}>
           <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
         <CardContent>
         <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
         </CardContent>
         </ButtonBase>
         <CardActions className={classes.cardActions}>
             
            
            <Button size="small" color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
                 {/* <ThumbUpAltIcon fontSize="small"/>
                &nbsp; Like &nbsp; */}
                 {/* {post.likeCount} */}
                 <Likes/>
             </Button>
             <Button size="small" color="primary" disabled={!user?.result}  onClick={()=>dispatch(unlikePost(post._id))}>
                 
                 <Unlikes/>
             </Button>
            
            {(user?.result?.googleId === post?.creator || user?.result?._id=== post?.creator) && (
               <Button size="small" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
               < DeleteIcon fontSize="small"/>
               Delete
              
           </Button>
            )}
         </CardActions>
       </Card>
    );
};

export default Post;




























































































































































































