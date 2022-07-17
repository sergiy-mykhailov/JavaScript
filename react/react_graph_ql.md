# GraphQL


## Main info
**GraphQL** is an open-source data **query** and **manipulation** language for APIs, and a runtime for fulfilling queries with existing data


## Queries
Fetch data with the useQuery hook:
```jsx
import { gql, useQuery } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name='dog' onChange={onDogSelected}>
      {data.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}
```


## Mutations
Modify data with the useMutation hook:
```jsx
import { gql, useMutation } from '@apollo/client';

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

function AddTodo() {
  let input;
  const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input ref={node => { input = node; }} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}
```


## Subscriptions
Get real-time updates from your GraphQL server:
```jsx
const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;

function LatestComment({ postID }) {
  const { data, loading } = useSubscription(
    COMMENTS_SUBSCRIPTION,
    { variables: { postID } }
  );
  return <h4>New comment: {!loading && data.commentAdded.content}</h4>;
}
```


## Fragments
Share fields between operations
```jsx
export const CORE_COMMENT_FIELDS = gql`
  fragment CoreCommentFields on Comment {
    id
    postedBy {
      username
      displayName
    }
    createdAt
    content
  }
`;

export const GET_POST_DETAILS = gql`
  ${CORE_COMMENT_FIELDS}
  query CommentsForPost($postId: ID!) {
    post(postId: $postId) {
      title
      body
      author
      comments {
        ...CoreCommentFields
      }
    }
  }
`;
```


## Pagination
```jsx
const FEED_QUERY = gql`
  query Feed($offset: Int, $limit: Int) {
    feed(offset: $offset, limit: $limit) {
      id
      # ...
    }
  }
`;

const FeedWithData = () => {
  const { loading, data, fetchMore } = useQuery(FEED_QUERY, {
    variables: { offset: 0, limit: 10 },
  });

  return (
    <Feed
      entries={data.feed || []}
      onLoadMore={() => fetchMore({
        variables: { offset: data.feed.length },
      })}
    />
  );
}
```


## Errors

### Errors related to the server-side execution of a GraphQL operation
* Syntax errors (e.g., a query was malformed)
* Validation errors (e.g., a query included a schema field that doesn't exist)
* Resolver errors (e.g., an error occurred while attempting to populate a query field)

### Error response with partial data
```
{
  "data": {
    "getInt": 12,
    "getString": null
  },
  "errors": [
    {
      "message": "Failed to get string!"
      // ...additional fields...
    }
  ]
}
```

### Apollo Client supports the following error policies for an operation:
* none - If the response includes GraphQL errors, they are returned on `error.graphQLErrors` and the response data is set to `undefined` even if the server returns data
* ignore - graphQLErrors are ignored (`error.graphQLErrors` is not populated), and any returned data is cached and rendered as if no errors occurred.
* all	- Both `data` and `error.graphQLErrors` are populated, enabling you to render both partial results and error information.

### Setting an error policy
```jsx
const MY_QUERY = gql`
  query WillFail {
    badField # This field's resolver produces an error
    goodField # This field is populated successfully
  }
`;

function ShowingSomeErrors() {
  const { loading, error, data } = useQuery(MY_QUERY, { errorPolicy: "all" });
  if (loading) return <span>loading...</span>;
  return (
    <div>
      <h2>Good: {data.goodField}</h2>
      <pre>
        Bad: {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </pre>
    </div>
  );
}
```

