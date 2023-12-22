import logo from './logo.svg';
import './App.css';

import { gql, useQuery } from '@apollo/client';

const querry = gql`
query GetTodoWithUser{
  getTodos {
    id
    title
    completed
    user {
      id
      name
  }
  }
}
`;

function App() {
  const { data, loading } = useQuery(querry)
  if (loading) {
    return <h1>loading.....</h1>
  }
  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
