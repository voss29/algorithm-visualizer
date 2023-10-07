import { assert } from 'chai';
import { generateAlphabeticalCharacterList } from '../../../src/model/dataGenerators/graph/nodeListGenerator';


describe('generateAlphabeticalCharacterList()', () => {

   it('generates list of first n alphabetical uppercase characters', () => {
      const result = generateAlphabeticalCharacterList(6);
      const expected = ['A', 'B', 'C', 'D', 'E', 'F'];
      assert.deepEqual(result, expected);
   });

});
