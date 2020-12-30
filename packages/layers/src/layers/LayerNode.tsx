import React, { useRef, useEffect } from 'react';

import { useEditor } from '@pagezilla/core';
import { ROOT_NODE } from '@pagezilla/utils';
import { useLayerManager } from '../manager/useLayerManager';
import { useLayer } from './useLayer';
import { LayerContextProvider } from './LayerContextProvider';
import CustomTreeView from './Tree/CustomTreeView';

interface LayerNodeProps {
  classes?: object;
}

export const LayerNode: React.FC<LayerNodeProps> = ({ classes }) => {
  const { id, depth, children, expanded } = useLayer((layer) => ({
    expanded: layer.expanded,
  }));

  const { data, shouldBeExpanded, rootNodeChildrenIds } = useEditor(
    (state, query) => ({
      rootNodeChildrenIds: state.nodes[ROOT_NODE].data.nodes,
      data: state.nodes[id] && state.nodes[id].data,
      shouldBeExpanded:
        state.events.selected &&
        query.node(state.events.selected).ancestors(true).includes(id),
    })
  );

  const { actions, renderLayer, expandRootOnLoad } = useLayerManager(
    (state) => ({
      renderLayer: state.options.renderLayer,
      expandRootOnLoad: state.options.expandRootOnLoad,
    })
  );

  const expandedRef = useRef<boolean>(expanded);
  expandedRef.current = expanded;

  const shouldBeExpandedOnLoad = useRef<boolean>(
    expandRootOnLoad && id === ROOT_NODE
  );

  useEffect(() => {
    if (!expandedRef.current && shouldBeExpanded) {
      actions.toggleLayer(id);
    }
  }, [actions, id, shouldBeExpanded]);

  useEffect(() => {
    if (shouldBeExpandedOnLoad.current) {
      actions.toggleLayer(id);
    }
  }, [actions, id]);

  const initRef = useRef<boolean>(false);

  if (!initRef.current) {
    actions.registerLayer(id);
    initRef.current = true;
  }

  const newElement = React.createElement(
    renderLayer,
    { classes },
    children.length > 0
      ? children.map((id) => (
          <LayerContextProvider
            classes={classes}
            key={id}
            id={id}
            depth={depth + 1}
          />
        ))
      : null
  );
  return data ? (
    <div className={`craft-layer-node ${id}`}>
      {id === ROOT_NODE ? (
        <CustomTreeView expanded={[ROOT_NODE, ...rootNodeChildrenIds]}>
          {newElement}
        </CustomTreeView>
      ) : (
        <>{newElement}</>
      )}
      {}
    </div>
  ) : null;
};
