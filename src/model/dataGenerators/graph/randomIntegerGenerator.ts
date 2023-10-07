function getRandomIntegerBetweenInclusive(min: number, max: number) {
   return Math.floor(min + (max - min + 1) * Math.random());
}


export { getRandomIntegerBetweenInclusive };
