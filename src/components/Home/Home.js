import React,{ useState, useEffect }  from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core'
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import Pagination from '../Pagination';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
const Home = () => {
    const classes = useStyles();
    const [currentId, setcurrentId] = useState(null)
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();
    const searchPost = () => {
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
          history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          history.push('/');
        }
      };
    const handleAddChip = (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchPost();
        }
      };
    // useEffect(() => {
    //     dispatch(getPosts())
    // }, [dispatch])
    return (
        <Grow in>
        <Container maxWidth="xl">
            <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setcurrentId={setcurrentId}></Posts>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
                    <Form currentId={currentId} setcurrentId={setcurrentId}></Form>
                    {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
                </Grid>
            </Grid>
        </Container>

    </Grow>
    );
};

export default Home;