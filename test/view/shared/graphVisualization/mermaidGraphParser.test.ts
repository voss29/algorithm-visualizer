import { assert } from 'chai';
import { GraphInterface } from '../../../../src/model/genericDataStructures/graph/graphTypes';
import {
   parseMermaidGraph,
   parseNodeDefinitions,
   parseEdgeDefinitions,
   parseNodeHighlighting,
   parseEdgeHighlighting,
   MermaidGraphParserConfig
} from '../../../../src/view/shared/GraphVisualization/mermaidGraphParser';


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
         edgeHighlightList: [1, 2],
      };
   });


   describe('mermaidGraphParser.parseNodeDefinitions', () => {

      it('parses nodes correctly', () => {
         const result = parseNodeDefinitions(config.graph);
         assert.equal(result, 'A((A))\nB((B))\nC((C))');
      });

   });


   describe('mermaidGraphParser.parseEdgeDefinitions', () => {

      it('parses edges correctly', () => {
         const result = parseEdgeDefinitions(config.graph);
         assert.equal(result, 'A -- 5 --- B\nB -- 2 --> C\nC --> A');
      });

   });


   describe('mermaidGraphParser.parseEdgeDefinitions', () => {

      it('parses edges correctly', () => {
         const result = parseEdgeDefinitions(config.graph);
         assert.equal(result, 'A -- 5 --- B\nB -- 2 --> C\nC --> A');
      });

   });


   describe('mermaidGraphParser.parseNodeHighlighting', () => {

      it('parses node highlighting correctly', () => {
         const result = parseNodeHighlighting(config.nodeHighlightList);
         assert.equal(result, 'classDef highlightedNode fill:black,stroke:black,stroke-width:2px,color:white\nclass A,C highlightedNode');
      });

      it('returns empty string for missing config property nodeHighlightList', () => {
         config.nodeHighlightList = undefined;
         const result = parseNodeHighlighting(config.nodeHighlightList);
         assert.equal(result, '');
      });

   });


   describe('mermaidGraphParser.parseEdgeHighlighting', () => {

      it('parses edge highlighting correctly', () => {
         const result = parseEdgeHighlighting(config.edgeHighlightList);
         assert.equal(result, 'linkStyle 1,2 stroke:#094fe8,stroke-width:5px');
      });

      it('returns empty string for missing config property edgeHighlightList', () => {
         config.edgeHighlightList = undefined;
         const result = parseEdgeHighlighting(config.edgeHighlightList);
         assert.equal(result, '');
      });

   });



   describe('mermaidGraphParser.parseMermaidGraph()', () => {

      it('parses graph correctly', () => {
         const result = parseMermaidGraph(config);
         assert.equal(result, '%%{ init: {"flowchart":{"curve":"linear"},"theme":"base","themeVariables":{"primaryColor":"#e5e5e5","secondaryColor":"white","primaryBorderColor":"black"}}}%%\nflowchart LR\nA((A))\nB((B))\nC((C))\nA -- 5 --- B\nB -- 2 --> C\nC --> A\nclassDef highlightedNode fill:black,stroke:black,stroke-width:2px,color:white\nclass A,C highlightedNode\nlinkStyle 1,2 stroke:#094fe8,stroke-width:5px\n');
      });

   });

});


