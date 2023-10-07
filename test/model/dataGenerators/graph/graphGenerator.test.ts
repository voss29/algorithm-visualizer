import { expect } from 'chai';
import { GraphGeneratorConfig } from '../../../../src/model/dataGenerators/graph/dataGeneratorTypes';
import { validateConfiguration } from '../../../../src/model/dataGenerators/graph/graphGenerator';


function generateValidConfiguration(): GraphGeneratorConfig {
   return {
      nodeAmount: { min: 2, max: 7 },
      edgesPerNode: { min: 2, max: 4 },
      edgeWeight: { min: 1, max: 10 },
      allowRecursiveEdges: true
   };
}


describe('graphGenerator.validateConfiguration()', () => {

   let config: GraphGeneratorConfig;


   beforeEach(() => {
      config = generateValidConfiguration();
   });


   it('throws error for non number argument', () => {
      const modifiedValue = 'Test' as unknown;
      config.nodeAmount.min = modifiedValue as number;
      expect(() => validateConfiguration(config)).to.throw(TypeError, 'Argument nodeAmount.min must be an integer');
   });


   it('throws error for number arguments that are not integers', () => {
      config.nodeAmount.min = 1.23;
      expect(() => validateConfiguration(config)).to.throw(TypeError, 'Argument nodeAmount.min must be an integer');
   });


   it('throws error for non boolean arguments for parameter allowRecursiveEdges', () => {
      const modifiedValue = 'NotBoolean' as unknown;
      config.allowRecursiveEdges = modifiedValue as boolean;
      expect(() => validateConfiguration(config)).to.throw(TypeError, 'Argument allowRecursiveEdges must be a boolean');
   });


   it('throws error for not positive integer arguments of parameter nodeAmount', () => {
      config.nodeAmount.max = -3;
      expect(() => validateConfiguration(config)).to.throw(RangeError, 'Argument nodeAmount.max must be positive');
   });


   it('throws error if nodeAmount.min > nodeAmount.max', () => {
      config.nodeAmount.min = 2;
      config.nodeAmount.max = 1;
      expect(() => validateConfiguration(config)).to.throw(RangeError, 'nodeAmount.min 2 is greater than nodeAmount.max 1');
   });


   it('throws error if edgeWeight.min > edgeWeight.max', () => {
      if (config.edgeWeight) {
         config.edgeWeight.min = 8;
         config.edgeWeight.max = 4;
         expect(() => validateConfiguration(config)).to.throw(RangeError, 'edgeWeight.min 8 is greater than edgeWeight.max 4');
      }
   });


   it('throws error if graph with forbidden recursive edges may be forced to contain recursive edges', () => {
      config.allowRecursiveEdges = false;
      expect(() => validateConfiguration(config)).to.throw(
         RangeError,
         `Configuration specifies that recursive edges are forbidden but graph may be forced to 
         generate recursive edges due to edgesPerNode.max = ${config.edgesPerNode.max} exceeding the lowest
         possible edge total of all other nodes (nodeAmount.min - 1) * edgesPerNode.min = 
         ${(config.nodeAmount.min - 1) * config.edgesPerNode.min}`
      );
   });


   it('throws error if graph is forced to be connected but has an edge minimum per node ', () => {
      config.allowUnconnectedGraph = false;
      config.edgesPerNode.min = 1;
      expect(() => validateConfiguration(config)).to.throw(
         RangeError,
         `Configuration forbids the generation of unconnected graph. Therefore the minimum
         of edges per node must be greater than 1.`
      );
   });


   it('accepts valid config with all optional properties', () => {
      expect(() => validateConfiguration(config)).not.to.throw(Error);
   });


   it('accepts valid config without property edgeWeight', () => {
      expect(() => validateConfiguration(config)).not.to.throw(Error);
   });

});
