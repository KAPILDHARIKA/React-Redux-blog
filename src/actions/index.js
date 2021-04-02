import _ from 'lodash';
import jsonplaceholder from '../apis/jsonPlaceHolder';

///memoized version to fetch the users only once(second approach) 
export const fetchPostsAndUsers = () => async (dispatch, getState)=>{
  await dispatch(fetchPosts());

  const userIds =_.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(id => dispatch(fetchUser(id)));

  // _.chain(getState().posts)
  //   .map('userId')
  //   .uniq()
  //   .forEach(id => dispatch(fetchUser(id)))
  //   .value() 
};

export const fetchPosts = () => async dispatch => {
   const response = await jsonplaceholder.get('/posts');
   
   dispatch({ type: 'FETCH_POSTS', payload: response.data});
 }; 


export const fetchUser = (id) => async dispatch => {
  const response = await jsonplaceholder.get(`/users/${id}`);

   dispatch({ type: 'FETCH_USER', payload: response.data});
};

///memoized version to fetch the users only once(first approach) 
// export const fetchUser = (id) =>  dispatch => {
//    _fetchUser(id, dispatch);
// };

// const _fetchUser =  _.memoize(async (id, dispatch) => {
//   const response = await jsonplaceholder.get(`/users/${id}`);

//    dispatch({ type: 'FETCH_USER', payload: response.data});
// });
