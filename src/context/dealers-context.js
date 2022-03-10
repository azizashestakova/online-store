import { createContext, useContext } from "react";

export const DealersContext = createContext([]);

export const useDealersContext = () => useContext(DealersContext);
