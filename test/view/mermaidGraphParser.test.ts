import { assert } from 'chai';
import { GraphInterface } from '../../src/model/genericDataStructures/graph/graphTypes';
import {
   parseMermaidGraph,
   parseNodeDefinitions,
   parseEdgeDefinitions,
   parseNodeHighlighting,
   parseEdgeHighlighting,
   MermaidGraphParserConfig
} from '../../src/view/components/Graph/mermaidGraphParser';


describe('mermaidGraphParser', () => {

   let config: MermaidGraphParserConfig;


   beforeEach(() => {
      const testGraph: GraphInterface = {
         nodeList: ['A', 'B', 'C'],
         edgeList: [
            { id: 0, startNode: 'A', endNode: 'B', weight: 5 },
            { id: 1, startNode: 'B', endNode: 'C', weight: 2, isDirected: true },
            { id: 2, startNode: 'C', endNode: 'A', isDirected: true }
         ],
         getNeighborNodeListFor: (node: string) => [node],
         getListOfEdgesBetween: (node1, node2) => [
            { id: 0, startNode: node1, endNode: node2, weight: 5 }]
      };

      config = {
         graph: testGraph,
         direction: 'LR',
         nodeHighlightList: ['A', 'C'],
         nodeHighlightStyle: 'fill:red,stroke:black,stroke-width:2px,font-weight:bold',
         edgeHighlightList: [1, 2],
         edgeHighlightStyle: 'stroke:orange,stroke-width:4px'
      };
   });


   describe('mermaidGraphParser.parseNodeDefinitions', () => {

      it('parses nodes correctly', () => {
         const result = parseNodeDefinitions(config);
         assert.equal(result, 'A((A))\nB((B))\nC((C))');
      });

   });


   describe('mermaidGraphParser.parseEdgeDefinitions', () => {

      it('parses edges correctly', () => {
         const result = parseEdgeDefinitions(config);
         assert.equal(result, 'A -- 5 --- B\nB -- 2 --> C\nC --> A');
      });

   });


   describe('mermaidGraphParser.parseEdgeDefinitions', () => {

      it('parses edges correctly', () => {
         const result = parseEdgeDefinitions(config);
         assert.equal(result, 'A -- 5 --- B\nB -- 2 --> C\nC --> A');
      });

   });


   describe('mermaidGraphParser.parseNodeHighlighting', () => {

      it('parses node highlighting correctly', () => {
         const result = parseNodeHighlighting(config);
         assert.equal(result, 'classDef highlightedNode fill:red,stroke:black,stroke-width:2px,font-weight:bold\nclass A,C highlightedNode');
      });

      it('returns empty string for missing config property nodeHighlightStyle', () => {
         config.nodeHighlightStyle = undefined;
         const result = parseNodeHighlighting(config);
         assert.equal(result, '');
      });

      it('returns empty string for missing config property nodeHighlightList', () => {
         config.nodeHighlightList = undefined;
         const result = parseNodeHighlighting(config);
         assert.equal(result, '');
      });

   });


   describe('mermaidGraphParser.parseEdgeHighlighting', () => {

      it('parses edge highlighting correctly', () => {
         const result = parseEdgeHighlighting(config);
         assert.equal(result, 'linkStyle 1,2 stroke:orange,stroke-width:4px');
      });

      it('returns empty string for missing config property edgeHighlightStyle', () => {
         config.edgeHighlightStyle = undefined;
         const result = parseEdgeHighlighting(config);
         assert.equal(result, '');
      });

      it('returns empty string for missing config property edgeHighlightList', () => {
         config.edgeHighlightList = undefined;
         const result = parseEdgeHighlighting(config);
         assert.equal(result, '');
      });

   });



   describe('mermaidGraphParser.parseMermaidGraph()', () => {

      it('parses graph correctly', () => {
         const result = parseMermaidGraph(config);
         assert.equal(result, '%%{ init: { "flowchart": { "curve": "linear" } } }%%\nflowchart LR\nA((A))\nB((B))\nC((C))\nA -- 5 --- B\nB -- 2 --> C\nC --> A\nclassDef highlightedNode fill:red,stroke:black,stroke-width:2px,font-weight:bold\nclass A,C highlightedNode\nlinkStyle 1,2 stroke:orange,stroke-width:4px\n');
      });

   });

});


