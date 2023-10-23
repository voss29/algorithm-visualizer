import { createContext } from 'react';
import { AlgorithmExecutor } from '../../model/algorithms/AlgorithmExecutor';
import { AlgorithmData, HighlightData } from '../../model/algorithms/algorithmTypes';

type Algorithm = AlgorithmExecutor<AlgorithmData, HighlightData>;

const AlgorithmContext = createContext<Algorithm | undefined>(undefined);

export { AlgorithmContext };
