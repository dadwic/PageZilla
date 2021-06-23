import React from 'react';
import styled from 'styled-components';
import { useEditor } from '@pagezilla/core';

import { EditableLayerName } from './EditableLayerName';
import HideIcon from './HideIcon';
import Link from './Icons/Link';
import { useLayer } from '../useLayer';

const StyledDiv = styled.div<{
  depth: number;
  selected: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  background: ${({ selected }) => (selected ? '#2680eb' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : 'inherit')};
  &::before {
    content: ' ';
    position: absolute;
    left: ${({ depth }) => (depth === 0 ? 0 : depth * 2 * 8 + 2 + 'px')};
    bottom: 0;
    height: ${({ depth }) => (depth === 0 ? '0' : '100%')};
    width: 1px;
    border-left: ${({ depth }) => (depth === 0 ? 'none' : '1px solid black')};
    z-index: 2;
  }
  .inner {
    flex: 1;
    > div {
      padding: 0px;
      flex: 1;
      display: flex;
      align-items: center;
      margin-left: ${({ depth }) => depth * 2 * 8}px;
      div.layer-name {
        flex: 1;
        h2 {
          font-size: 15px;
          line-height: 26px;
        }
      }
    }
  }
  .visibility {
    svg {
      font-size: 1.25rem;
    }
  }
  .toggle {
    display: flex;
    align-items: center;
    padding: 4px 12px 4px 0;
    cursor: pointer;
  }
`;

const ExpandWithChildren = styled.a<{
  expanded: boolean;
  hasChildren: boolean;
}>`
  width: 16px;
  height: 16px;
  display: flex;
  position: relative;
  &::before {
    content: '${({ expanded, hasChildren }) =>
      hasChildren ? (expanded ? '\\229F' : '\\229E') : '\\22A0'}';
    position: absolute;
    font-size: 1.25rem;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 2;
  }
`;

export const DefaultLayerHeader: React.FC = () => {
  const {
    id,
    depth,
    children,
    expanded,
    actions: { toggleLayer },
    connectors: { drag, layerHeader },
  } = useLayer((layer) => {
    return {
      expanded: layer.expanded,
    };
  });

  const { selected, topLevel } = useEditor((state, query) => ({
    selected: state.events.selected === id,
    topLevel: query.node(id).isTopLevelCanvas(),
  }));

  const hasChildren = Boolean(children) && Boolean(children.length);

  return (
    <StyledDiv selected={selected} ref={drag} depth={depth}>
      <div className="inner">
        <div ref={layerHeader}>
          <div className="toggle">
            {/* {hasChildren ? ( */}
            <ExpandWithChildren
              expanded={expanded}
              hasChildren={hasChildren}
              onClick={(event: React.MouseEvent<any>) => {
                if (hasChildren) {
                  event.preventDefault();
                  toggleLayer();
                }
              }}
            />
            {/* ) : (
              <CloseSquare />
            )} */}
          </div>
          {topLevel ? <Link /> : null}
          <div className="layer-name s">
            <EditableLayerName />
          </div>
        </div>
      </div>
      <HideIcon />
    </StyledDiv>
  );
};
