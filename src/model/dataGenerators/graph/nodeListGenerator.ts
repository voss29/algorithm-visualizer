import { GraphGeneratorConfig } from './dataGeneratorTypes';
import { getRandomIntegerBetweenInclusive } from './randomIntegerGenerator';


function generateRandomNodeList(config: GraphGeneratorConfig) {
   const { nodeAmount } = config;
   const randomNodeAmount = getRandomIntegerBetweenInclusive(nodeAmount.min, nodeAmount.max);
   const randomNodeIdList = generateAlphabeticalCharacterList(randomNodeAmount);
   return randomNodeIdList.map((id) => ({ id, labelText: id }));
}


function generateAlphabeticalCharacterList(characterAmount: number) {
   const characterList: string[] = [];
   let utfCodeUppercaseCharacter = 65; // represents character 'A'

   for (let i = 0; i < characterAmount; i++) {
      characterList.push(String.fromCharCode(utfCodeUppercaseCharacter));
      utfCodeUppercaseCharacter++;
   }

   return characterList;
}


export { generateRandomNodeList, generateAlphabeticalCharacterList };
