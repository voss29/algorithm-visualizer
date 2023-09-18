import { GraphInterface } from '../../../model/genericDataStructures/graph/graphTypes';


type MermaidGraphParserConfig<T extends string | number> = {
   graph: GraphInterface<T>,
   direction: 'LR' | 'RL' | 'TB' | 'BT'
   nodeHighlightList?: T[],
   edgeHighlightList?: number[],
   nodeHighlightStyle?: string,
   edgeHighlightStyle?: string
};


function parseMermaidGraph(config: MermaidGraphParserConfig<string>) {
   const { direction } = config;
   const lineList: string[] = [];

   lineList.push('%%{ init: { "flowchart": { "curve": "linear" } } }%%');
   lineList.push(`flowchart ${direction}`);
   lineList.push(parseNodeDefinitions(config));
   lineList.push(parseEdgeDefinitions(config));
   lineList.push(parseNodeHighlighting(config));
   lineList.push(parseEdgeHighlighting(config));

   return `${lineList.join('\n')}\n`;
}


function parseNodeDefinitions(config: MermaidGraphParserConfig<string>) {
   const { graph } = config;

   const nodeList = graph.nodeList.map((node) => `${node}((${node}))`);
   return nodeList.join('\n');
}


function parseEdgeDefinitions(config: MermaidGraphParserConfig<string>) {
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


function parseNodeHighlighting(config: MermaidGraphParserConfig<string>) {
   const { nodeHighlightStyle, nodeHighlightList } = config;

   const hasHighlights = nodeHighlightStyle && nodeHighlightList && nodeHighlightList.length > 0;
   const lineList: string[] = [];

   if (hasHighlights) {
      lineList.push(`classDef highlightedNode ${nodeHighlightStyle}`);
      lineList.push(`class ${nodeHighlightList.join(',')} highlightedNode`);
   }

   return lineList.join('\n');
}


function parseEdgeHighlighting(config: MermaidGraphParserConfig<string>) {
   const { edgeHighlightStyle, edgeHighlightList } = config;

   const hasHighlights = edgeHighlightStyle && edgeHighlightList && edgeHighlightList.length > 0;
   return (hasHighlights) ? `linkStyle ${edgeHighlightList.join(',')} ${edgeHighlightStyle}` : '';
}


export {
   MermaidGraphParserConfig,
   parseMermaidGraph,
   parseNodeDefinitions,
   parseEdgeDefinitions,
   parseNodeHighlighting,
   parseEdgeHighlighting
};
