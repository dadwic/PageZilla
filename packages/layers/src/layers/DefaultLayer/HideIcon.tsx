import React from 'react';
import { ROOT_NODE, useEditor } from '@pagezilla/core';
import { useLayer } from '../useLayer';
import Visibility from './Icons/Visibility';
import VisibilityOff from './Icons/VisibilityOff';

function ExpandIcon() {
  const { id } = useLayer((layer) => {
    return {
      expanded: layer.expanded,
    };
  });

  const { hidden, actions, couldNotHide } = useEditor((state, query) => ({
    couldNotHide: state.nodes[id].data.parent === ROOT_NODE || id === ROOT_NODE,
    hidden: state.nodes[id] && state.nodes[id].data.hidden,
    topLevel: query.node(id).isTopLevelCanvas(),
  }));

  return couldNotHide ? null : (
    <div
      className="visibility"
      color="inherit"
      aria-label="toggle visibility"
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        actions.setHidden(id, !hidden);
      }}
      onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
      }}
    >
      {hidden ? <Visibility /> : <VisibilityOff />}
    </div>
  );
}

export default ExpandIcon;
