import React, { useContext } from 'react';
import { UserContext } from 'src/contexts/user/UserProvider';

const Home: React.FC = () => {
  const [{ user }] = useContext(UserContext);

  return (
    <div>
      <h1>Home</h1>
			{user && <div>{user.username} est connecté !</div>}
    </div>
  );
}

export default Home;