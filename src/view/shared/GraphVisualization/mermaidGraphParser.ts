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
   const { graph, direction, nodeHighlightList, edgeHighlightList } = config;
   const lineList: string[] = [];

   lineList.push(`%%{ init: ${JSON.stringify(style.theme)}}%%`);
   lineList.push(`flowchart ${direction}`);
   lineList.push(parseNodeDefinitions(graph));
   lineList.push(parseEdgeDefinitions(graph));
   lineList.push(parseNodeHighlighting(nodeHighlightList));
   lineList.push(parseEdgeHighlighting(edgeHighlightList));

   return `${lineList.join('\n')}\n`;
}


function parseNodeDefinitions(graph: GraphInterface) {
   const nodeList = graph.nodeList.map((node) => {
      const labelText = (node.labelText === '') ? node.id : node.labelText;
      return `${node.id}((${labelText}))`;
   });
   return nodeList.join('\n');
}


function parseEdgeDefinitions(graph: GraphInterface) {
   const edgeList = graph.edgeList.map((edge) => {
      const { startNode, endNode, isDirected, weight } = edge;
      const arrowCharacter = (isDirected) ? '>' : '-';

      if (weight) {
         return `${startNode} -- ${weight} --${arrowCharacter} ${endNode}`;
      }
      return `${startNode} --${arrowCharacter} ${endNode}`;
   });

   return edgeList.join('\n');
}


function parseNodeHighlighting(nodeHighlightList?: string[]) {
   const lineList: string[] = [];
   const hasHighlightedNodes = nodeHighlightList && nodeHighlightList.length > 0;

   if (hasHighlightedNodes) {
      lineList.push(`classDef highlightedNode ${style.nodeHighlightStyle}`);
      lineList.push(`class ${nodeHighlightList.join(',')} highlightedNode`);
   }

   return lineList.join('\n');
}


function parseEdgeHighlighting(edgeHighlightList?: number[]) {
   const hasHighlighedEdges = edgeHighlightList && edgeHighlightList.length > 0;
   return (hasHighlighedEdges) ? `linkStyle ${edgeHighlightList.join(',')} ${style.edgeHighlightStyle}` : '';
}


export {
   MermaidGraphParserConfig,
   parseMermaidGraph,
   parseNodeDefinitions,
   parseEdgeDefinitions,
   parseNodeHighlighting,
   parseEdgeHighlighting
};
