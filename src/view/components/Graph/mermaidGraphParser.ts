import { GraphInterface } from '../../../model/genericDataStructures/graph/graphTypes';


type MermaidGraphParserConfig = {
   graph: GraphInterface,
   direction: 'LR' | 'RL' | 'TB' | 'BT'
   nodeHighlightList?: string[],
   edgeHighlightList?: number[],
};


const style = {
   theme: {
      flowchart: { curve: 'linear' },
      theme: 'base',
      themeVariables: {
         primaryColor: '#e5e5e5',
         secondaryColor: 'white',
         primaryBorderColor: 'black',
      }
   },
   nodeHighlightStyle: 'fill:black,stroke:black,stroke-width:2px,color:white',
   edgeHighlightStyle: 'stroke:#094fe8,stroke-width:5px'
};


function parseMermaidGraph(config: MermaidGraphParserConfig) {
   const { direction } = config;
   const lineList: string[] = [];

   lineList.push(`%%{ init: ${JSON.stringify(style.theme)}}%%`);
   lineList.push(`flowchart ${direction}`);
   lineList.push(parseNodeDefinitions(config));
   lineList.push(parseEdgeDefinitions(config));
   lineList.push(parseNodeHighlighting(config));
   lineList.push(parseEdgeHighlighting(config));

   return `${lineList.join('\n')}\n`;
}


function parseNodeDefinitions(config: MermaidGraphParserConfig) {
   const { graph } = config;

   const nodeList = graph.nodeList.map((node) => `${node}((${node}))`);
   return nodeList.join('\n');
}


function parseEdgeDefinitions(config: MermaidGraphParserConfig) {
   const { graph } = config;

   const edgeList = graph.edgeList.map((edge) => {
      const arrow = (edge.isDirected) ? '>' : '-';
      if (edge.weight) {
         return `${edge.startNode} -- ${edge.weight} --${arrow} ${edge.endNode}`;
      }
      return `${edge.startNode} --${arrow} ${edge.endNode}`;
   });

   return edgeList.join('\n');
}


function parseNodeHighlighting(config: MermaidGraphParserConfig) {
   const { nodeHighlightList } = config;

   const hasHighlights = nodeHighlightList && nodeHighlightList.length > 0;
   const lineList: string[] = [];

   if (hasHighlights) {
      lineList.push(`classDef highlightedNode ${style.nodeHighlightStyle}`);
      lineList.push(`class ${nodeHighlightList.join(',')} highlightedNode`);
   }

   return lineList.join('\n');
}


function parseEdgeHighlighting(config: MermaidGraphParserConfig) {
   const { edgeHighlightList } = config;

   const hasHighlights = edgeHighlightList && edgeHighlightList.length > 0;
   return (hasHighlights) ? `linkStyle ${edgeHighlightList.join(',')} ${style.edgeHighlightStyle}` : '';
}


export {
   MermaidGraphParserConfig,
   parseMermaidGraph,
   parseNodeDefinitions,
   parseEdgeDefinitions,
   parseNodeHighlighting,
   parseEdgeHighlighting
};
