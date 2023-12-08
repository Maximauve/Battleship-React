import React from 'react';
import { Grid } from 'src/component/game/grid';

const Home: React.FC = () => {

  // miss, hit, empty

  const grid = [  // 10x10 grid  
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty','empty','empty'],
    ['empty', 'miss', 'empty', 'empty', 'empty', 'empty', 'miss', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'hit', 'hit', 'hit', 'empty', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'miss', 'empty','empty','empty'],
    ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty','empty','empty'],
  ];

  return (
    <div>
      <h1>Home</h1>
      <div>
        <Grid grid={grid} />
      </div>
    </div>
  );
}

export default Home;