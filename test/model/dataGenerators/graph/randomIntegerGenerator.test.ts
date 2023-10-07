import { assert } from 'chai';
import { getRandomIntegerBetweenInclusive } from '../../../../src/model/dataGenerators/graph/randomIntegerGenerator';


describe('getRandomIntegerBetweenInclusive()', () => {

   it('generates random integers in specified range', () => {
      for (let i = 0; i < 1_000; i++) {
         const randomInt = getRandomIntegerBetweenInclusive(1, 10);
         assert.isAbove(randomInt, 0);
         assert.isBelow(randomInt, 11);
      }
   });

});
