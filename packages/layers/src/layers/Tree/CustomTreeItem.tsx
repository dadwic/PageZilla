import React, { PropsWithChildren } from 'react';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LinkIcon from '@material-ui/icons/Link';
import IconButton from '@material-ui/core/IconButton';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

// import MailIcon from '@material-ui/icons/Mail';
// import DeleteIcon from '@material-ui/icons/Delete';
// import Label from '@material-ui/icons/Label';
// import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import InfoIcon from '@material-ui/icons/Info';
// import ForumIcon from '@material-ui/icons/Forum';
// import LocalOfferIcon from '@material-ui/icons/LocalOffer';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { useEditor } from '@pagezilla/core';
import { useLayer } from '../useLayer';

declare module 'csstype' {
  interface Properties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type CustomTreeItemProps = TreeItemProps & {
  bgColor?: string;
  expanded?: boolean;
  hovered?: boolean;
  hasCanvases?: boolean;
  color?: string;
  labelIcon?: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText?: string;
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
    paddingLeft: ({ depth }: StyleProps): any => {
      console.log('marginLeft depth', depth, depth * 4);
      // return depth * 4;
      return theme.spacing(depth / 2);
    },
  },
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 0,
    '& $label': {
      // marginLeft: theme.spacing(2),
      // marginLeft: ({ depth }: StyleProps) => theme.spacing(depth / 2),
      // marginLeft: ({ depth }: StyleProps) => depth * 4,
      borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
      '& $labelIcon': {},
    },
  },

  // group: {
  //   marginLeft: 7,
  //   paddingLeft: 18,
  //   borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  // },
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
}: PropsWithChildren<CustomTreeItemProps>) {
  const {
    id,
    depth,
    connectors: { drag, layer, layerHeader },
  } = useLayer((layer) => ({
    hovered: layer.event.hovered,
    expanded: layer.expanded,
  }));

  const classes = useTreeItemStyles({ depth });
  const { displayName, hidden, actions, selected, topLevel } = useEditor(
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
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: selected ? classes.selected : '',
        group: classes.group,
        label: classes.label,
      }}
      label={
        <div className={classes.labelRoot} ref={drag}>
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
          <div className="inner">
            <div ref={layerHeader}>
              {topLevel ? <LinkIcon /> : null}
              <div className="layer-name s">{displayName}</div>
            </div>
          </div>
        </div>
      }
    >
      {Boolean(children) ? <>{children}</> : null}
    </TreeItem>
  );
}
