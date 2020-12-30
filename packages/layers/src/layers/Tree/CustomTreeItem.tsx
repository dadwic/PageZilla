import React, { PropsWithChildren } from 'react';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { fade, makeStyles, Theme } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LinkIcon from '@material-ui/icons/Link';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

import { useEditor } from '@pagezilla/core';
import { useLayer } from '../useLayer';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type CustomTreeItemProps = TreeItemProps & {
  classes?: object;
  className?: boolean;
};

interface StyleProps {
  depth: number;
}

const useTreeItemStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.secondary,
    '&:hover > $content': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },

    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
      backgroundColor: 'transparent',
    },
  },
  content: {
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 1),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    paddingLeft: ({ depth }: StyleProps) =>
      depth === 0 ? 8 : theme.spacing(depth + 1) + depth * 7,
  },
  group: {
    marginLeft: 0,
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: ({ depth }: StyleProps) =>
        depth === 0 ? 8 + 7 : theme.spacing(depth + 2) + depth * 7 - 1,
      bottom: 0,
      height: '100%',
      width: '1px',
      borderLeft: `1px solid ${fade(theme.palette.text.primary, 0.4)}`,
      zIndex: 2,
    },
  },
  iconContainer: {
    display: 'block',
    '& .close': {
      opacity: 0.3,
    },
  },
  expanded: {},
  selected: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
    backgroundColor: 'transparent !important',
  },
  labelRoot: {
    color: 'inherit',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
    '& button': {
      padding: theme.spacing(0, 1),
    },
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

export function CustomTreeItem({
  children,
  classes,
  className,
}: PropsWithChildren<CustomTreeItemProps>) {
  const {
    id,
    depth,
    connectors: { drag, layer, layerHeader },
  } = useLayer((layer) => ({
    hovered: layer.event.hovered,
    expanded: layer.expanded,
  }));

  const treeItemClasses = useTreeItemStyles({ depth });
  const combinedClasses = {
    root: clsx(treeItemClasses.root, Boolean(classes) ? classes.root : ''),
    content: clsx(
      treeItemClasses.content,
      Boolean(classes) ? classes.content : ''
    ),
    expanded: clsx(
      treeItemClasses.expanded,
      Boolean(classes) ? classes.expanded : ''
    ),
    selected: clsx(
      treeItemClasses.selected,
      Boolean(classes) ? classes.selected : ''
    ),
    iconContainer: clsx(
      treeItemClasses.iconContainer,
      Boolean(classes) ? classes.iconContainer : ''
    ),
    group: clsx(treeItemClasses.group, Boolean(classes) ? classes.group : ''),
    label: clsx(treeItemClasses.label, Boolean(classes) ? classes.label : ''),
  };

  const { displayName, hidden, actions, topLevel } = useEditor(
    (state, query) => {
      return {
        displayName:
          state.nodes[id] && state.nodes[id].data.custom.displayName
            ? state.nodes[id].data.custom.displayName
            : state.nodes[id].data.displayName,
        hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
        hidden: state.nodes[id] && state.nodes[id].data.hidden,
        selected: state.events.selected === id,
        topLevel: query.node(id).isTopLevelCanvas(),
      };
    }
  );
  return (
    <TreeItem
      ref={layer}
      nodeId={id}
      className={className}
      classes={{
        root: combinedClasses.root,
        content: combinedClasses.content,
        expanded: combinedClasses.expanded,
        selected: combinedClasses.selected,
        iconContainer: combinedClasses.iconContainer,
        group: combinedClasses.group,
        label: combinedClasses.label,
      }}
      label={
        <div className={treeItemClasses.labelRoot} ref={drag}>
          <div className="inner">
            <div ref={layerHeader}>
              {topLevel ? <LinkIcon /> : null}
              <div className="layer-name s">{displayName}</div>
            </div>
          </div>
          <IconButton
            color="inherit"
            aria-label="toggle password visibility"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              actions.setHidden(id, !hidden);
            }}
            // disabled={}
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
        </div>
      }
    >
      {Boolean(children) ? <>{children}</> : null}
    </TreeItem>
  );
}
