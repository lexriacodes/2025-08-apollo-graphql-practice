import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

interface User {
  id: string;
  name: string;
  age: number;
  isMarried: boolean;
}

interface GetUsersData {
  getUsers: User[];
}

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

function App() {
  const { data, error, loading } = useQuery<GetUsersData>(GET_USERS);

  if (loading) return <p>Data loading ...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.getUsers) return <p>No data available</p>;

  return (
    <>
      <h1>Users</h1>

      <div>
        {data.getUsers.map((user: any) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>

            <p>Age: {user.age}</p>

            <p>Is this user married: {user.isMarried ? "yes" : "no"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
