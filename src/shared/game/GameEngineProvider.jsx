import { useState, createContext, useContext } from 'react';
import { GameEngineProxy } from './GameEngineProxy';

/** @type {React.Context<GameEngineProxy>} */
// @ts-ignore
const ctx = createContext(undefined);

/**
 * @param {{ children: React.ReactChild }} props
 */
const GameEngineProvider = ({ children }) => {
  const [engineProxy] = useState(() => new GameEngineProxy());

  return <ctx.Provider value={engineProxy}>{children}</ctx.Provider>;
};

function useGameEngine() {
  const value = useContext(ctx);

  if (!value) {
    throw new Error('useGameEngine must be used within a GameEngineProvider');
  }

  return value;
}

export { GameEngineProvider, useGameEngine };
