import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
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

const CREATE_USER = gql`
  mutation createUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      name
      age
      isMarried
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({
    name: "",
    age: 0,
    isMarried: false,
  });

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

  const [createUser] = useMutation(CREATE_USER);

  if (getUsersLoading) return <p>Data loading ...</p>;

  if (getUsersError) return <p>Error: {getUsersError.message}</p>;

  if (!getUsersData || !getUsersData.getUsers) return <p>No data available</p>;

  const handleCreateUser = async () => {
    try {
      const result = await createUser({
        variables: {
          name: newUser.name,
          age: newUser.age,
          isMarried: newUser.isMarried,
        },
      });
      console.log("User created:", result.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <div>
        <input
          placeholder="Name"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <br />
        <input
          placeholder="Age"
          type="Number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
        />
        <br />
        <input
          placeholder="Are they married"
          type="checkbox"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, isMarried: e.target.checked }))
          }
        />
        <br />
        <button onClick={handleCreateUser}>Create User</button>
      </div>

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
