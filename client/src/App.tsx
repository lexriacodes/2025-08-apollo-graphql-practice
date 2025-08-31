import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import "./App.css";

interface User {
  id: string;
  name: string;
  age: number;
  isMarried: boolean;
}

interface GetUsersResponse {
  getUsers: User[];
}

interface GetUserByIdResponse {
  getUserById: User | null; // Allow null in case user not found
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

const GET_USERS_BY_ID = gql`
  query getUsersById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

function App() {
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery<GetUsersResponse>(GET_USERS);

  const {
    data: getUsersByIdData,
    error: getUsersByIdError,
    loading: getUsersByIdLoading,
  } = useQuery<GetUserByIdResponse>(GET_USERS_BY_ID, {
    variables: { id: "2" },
  });

  if (getUsersLoading) return <p>Data loading ...</p>;

  if (getUsersError) return <p>Error: {error.message}</p>;

  if (!getUsersData || !getUsersData.getUsers) return <p>No data available</p>;

  return (
    <>
      <div>
        {getUsersByIdLoading ? (
          <p>Loading ...</p>
        ) : (
          <>
            <h2>Chosen User</h2>
            {getUsersByIdData?.getUserById?.name}
          </>
        )}
      </div>

      <div>
        <h2>Users</h2>
        {getUsersData.getUsers.map((user: any) => (
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
