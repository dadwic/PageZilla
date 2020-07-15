import React, { useMemo } from 'react';
import { NodeId } from '../interfaces';
import { NodeHandlers } from './NodeHandlers';
import { useEventHandler } from '../events';
import { useInternalEditor } from '../editor/useInternalEditor';

export const NodeContext = React.createContext<any>(null);

export type NodeProvider = {
  id: NodeId;
  related?: boolean;
};

export const NodeProvider: React.FC<NodeProvider> = ({
  id,
  related = false,
  children,
}) => {
  const handlers = useEventHandler();

  const { hydrationTimestamp } = useInternalEditor((state) => ({
    hydrationTimestamp: state.nodes[id] && state.nodes[id]._hydrationTimestamp,
  }));

  // Get fresh connectors whenever the Nodes are rehydrated (eg: after deserialization)
  const connectors = useMemo(() => {
    console.log(
      'connectors useMemo -> ',
      'handlers: ',
      handlers,
      'hydrationTimestamp: ',
      hydrationTimestamp,
      'id: ',
      id,
      'NodeHandlers: ',
      NodeHandlers,
      'handlers.derive: ',
      handlers.derive(NodeHandlers, id),
      'handlers.derive.connectors: ',
      handlers.derive(NodeHandlers, id).connectors()
    );

    return handlers.derive(NodeHandlers, id).connectors();
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [handlers, hydrationTimestamp, id]);

  console.log('after deserialization -> connectors: ', connectors);

  return (
    <NodeContext.Provider value={{ id, related, connectors }}>
      {children}
    </NodeContext.Provider>
  );
};
