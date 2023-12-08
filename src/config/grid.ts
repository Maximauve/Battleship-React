import { Ship } from 'src/types/game/Ship';

export const emptyGrid = Array(10).fill(Array(10).fill('E'));

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOverlap(existingShips: Ship[], newShip: Ship) {
	for (const ship of existingShips) {
		for (const pos of newShip.position) {
			if (ship.position.some((p) => p.x === pos.x && p.y === pos.y)) {
				return true;
			}
		}
	}
	return false;
}

function generateRandomShip(length: number, existingShips: Ship[]) {
  const isVertical = Math.random() < 0.5;
  const startX = getRandomInt(0, isVertical ? 9 : 9 - length);
  const startY = getRandomInt(0, isVertical ? 9 - length : 9);
	const position: { x: number; y: number }[] = [];
	for (let i = 0; i < length; i++) {
		position.push({
			x: isVertical ? startX : startX + i,
      y: isVertical ? startY + i : startY,
    });
  }
	const newShip: Ship = {
		isVertical,
		length,
		position
	};
  if (!isOverlap(existingShips, newShip)) {
    return newShip;
  }
  return generateRandomShip(length, existingShips);
}

function convertShipsToIndexes(ships: Ship[]): { [key: string]: { x: number; y: number }[] } {
  const shipsIndexes: { [key: string]: { x: number; y: number }[] } = {};

  ships.forEach((ship, index) => {
    const shipCoordinates = ship.position.map(({ x, y }) => ({ x, y }));
    shipsIndexes[index + 1] = shipCoordinates;
  });

  return shipsIndexes;
}


export function generateRandomFleet(): { [key: string]: { x: number; y: number }[] } {
  const fleet: Ship[] = [];
	let existingShips: Ship[] = [];

  // Ajoutez le bateau de 5
  fleet.push(generateRandomShip(5, existingShips));
  existingShips = [...fleet];

  // Ajoutez le bateau de 4
  fleet.push(generateRandomShip(4, existingShips));
	existingShips = [...fleet];

  // Ajoutez les deux bateaux de 3
  for (let i = 0; i < 2; i++) {
    fleet.push(generateRandomShip(3, existingShips));
		existingShips = [...fleet];
  }

  // Ajoutez le bateau de 2
  fleet.push(generateRandomShip(2, existingShips));
	existingShips = [...fleet];

	return convertShipsToIndexes(fleet);
}