type AlgorithmOption = {
   name: string,
   isCategory: false,
   loadPage: () => void
};


type AlgorithmCategory = {
   name: string,
   isCategory: true,
   childList: (AlgorithmCategory | AlgorithmOption)[]
};


export { AlgorithmOption, AlgorithmCategory };
