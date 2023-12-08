import React from 'react';

const Game: React.FC = () => {

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
      <h1>Game</h1>
      <h1>Pom Pom</h1>
    </div>
  );
};

export default Game;