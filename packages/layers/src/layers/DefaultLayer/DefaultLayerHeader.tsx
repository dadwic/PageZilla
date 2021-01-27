import React from 'react';
import { ROOT_NODE, useEditor } from '@pagezilla/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';

import MinusSquare from '../Icons/MinusSquare';
import CloseSquare from '../Icons/CloseSquare';
import PlusSquare from '../Icons/PlusSquare';
import { useLayer } from '../useLayer';
import { EditableLayerName } from './EditableLayerName';

interface StyleProps {
  depth: number;
  selected: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0px 10px',
    background: ({ selected }: StyleProps) =>
      selected ? '#2680eb' : 'transparent',
    color: ({ selected }: StyleProps) => (selected ? '#fff' : 'inherit'),
    '&:before': {
      content: '""',
      position: 'absolute',
      left: ({ depth }: StyleProps) =>
        depth === 0 ? 8 + 7 : theme.spacing(depth + 2) + depth * 7 - 1,
      bottom: 0,
      height: '100%',
      width: '1px',
      borderLeft: ({ depth }: StyleProps) =>
        depth === 0
          ? 'none'
          : `1px solid ${fade(theme.palette.text.primary, 0.4)}`,
      zIndex: 2,
    },
  },
  inner: {
    flex: 1,
    '& > div': {
      padding: 0,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      marginLeft: ({ depth }: StyleProps) => depth * 16,
      '&.layer-name': {
        flex: 1,
        '& h2': {
          fontSize: 15,
          lineHeight: 26,
        },
      },
    },
  },
  toggle: {
    padding: theme.spacing(1, 1.5),
    cursor: 'pointer',
  },
  topLevelIndicator: {
    marginLeft: -22,
    marginRight: 10,
    '& svg': {
      width: 12,
      height: 12,
    },
  },
}));

export const DefaultLayerHeader: React.FC = () => {
  const {
    id,
    depth,
    expanded,
    children,
    connectors: { drag, layerHeader },
    actions: { toggleLayer },
  } = useLayer((layer) => {
    return {
      expanded: layer.expanded,
    };
  });

  const { hidden, actions, selected, topLevel, couldNotHide } = useEditor(
    (state, query) => ({
      couldNotHide:
        state.nodes[id].data.parent === ROOT_NODE || id === ROOT_NODE,
      hidden: state.nodes[id] && state.nodes[id].data.hidden,
      selected: state.events.selected === id,
      topLevel: query.node(id).isTopLevelCanvas(),
    })
  );
  const classes = useStyles({ depth, selected });

  return (
    <div className={classes.root} ref={drag}>
      <div className={classes.inner}>
        <div ref={layerHeader}>
          <div className={classes.toggle}>
            {children && children.length ? (
              expanded ? (
                <MinusSquare
                  onClick={(event: React.MouseEvent<any>) => {
                    event.preventDefault();
                    toggleLayer();
                  }}
                />
              ) : (
                <PlusSquare
                  onClick={(event: React.MouseEvent<any>) => {
                    event.preventDefault();
                    toggleLayer();
                  }}
                />
              )
            ) : (
              <CloseSquare />
            )}
          </div>
          {topLevel ? (
            <div className={classes.topLevelIndicator}>
              <Link />
            </div>
          ) : null}

          <div className="layer-name s">
            <EditableLayerName />
          </div>
        </div>
      </div>
      {couldNotHide ? null : (
        <IconButton
          color="inherit"
          size="small"
          aria-label="toggle visibility"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            actions.setHidden(id, !hidden);
          }}
          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
          }}
        >
          {hidden ? (
            <Visibility fontSize="small" />
          ) : (
            <VisibilityOff fontSize="small" />
          )}
        </IconButton>
      )}
    </div>
  );
};
