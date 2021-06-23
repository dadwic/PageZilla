import React, { memo } from 'react';
import styled from 'styled-components';
import { useLayer } from '../useLayer';
import { DefaultLayerHeader } from './DefaultLayerHeader';
import { useEditor } from '@pagezilla/core';

const LayerNodeDiv = styled.div<{
  expanded: boolean;
  hasCanvases: boolean;
  hovered: boolean;
}>`
  background: ${(props) => (props.hovered ? '#f1f1f1' : 'transparent')};
  display: block;
`;

const LayerChildren = styled.div<{ hasCanvases: boolean }>`
  margin: 0;
  background: 'transparent';
  position: relative;
`;

const MemoizedDefaultLayerHeader = memo(() => <DefaultLayerHeader />);

export const DefaultLayer: React.FC = ({ children }) => {
  const {
    id,
    expanded,
    hovered,
    connectors: { layer },
  } = useLayer((layer) => ({
    hovered: layer.event.hovered,
    expanded: layer.expanded,
  }));
  const { hasChildCanvases } = useEditor((state, query) => {
    return {
      hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
    };
  });

  return (
    <LayerNodeDiv
      ref={layer}
      expanded={expanded}
      hasCanvases={hasChildCanvases}
      hovered={hovered}
    >
      <MemoizedDefaultLayerHeader />
      {children ? (
        <LayerChildren
          hasCanvases={hasChildCanvases}
          className="craft-layer-children"
        >
          {children}
        </LayerChildren>
      ) : null}
    </LayerNodeDiv>
  );
};
