import React, { useMemo, useContext } from 'react';
import { LayerContext } from './LayerContext';
import { LayerNode } from './LayerNode';
import { LayerHandlers } from '../events/LayerHandlers';
import { useEditor, useEventHandler } from '@pagezilla/core';
import { LayerManagerContext } from '../manager';

interface LayerContextProviderProps extends Omit<LayerContext, 'connectors'> {
  classes?: object;
}
export const LayerContextProvider: React.FC<LayerContextProviderProps> = ({
  id,
  depth,
  classes,
}) => {
  const handler = useEventHandler();

  const { store } = useContext(LayerManagerContext);
  const connectors = useMemo(
    () => handler.derive(LayerHandlers, store, id).connectors(),
    [handler, id, store]
  );

  const { exists } = useEditor((state) => ({
    exists: !!state.nodes[id],
  }));

  if (!exists) {
    return null;
  }

  return (
    <LayerContext.Provider value={{ id, depth, connectors }}>
      <LayerNode classes={classes} />
    </LayerContext.Provider>
  );
};
