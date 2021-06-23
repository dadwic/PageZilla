import React from 'react';
import { ClickAwayListener } from './ClickAwayListener';
import styled from 'styled-components';

// import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import { withStyles } from '@material-ui/core/styles';
import { useEditor } from '@pagezilla/core';
import { useLayer } from '../useLayer';

// const EditInput = withStyles({
//   root: {
//     '& .MuiInputBase-input': {
//       color: 'white',
//       padding: '3px 0 2px',
//     },
//     '&:hover': {
//       '& .MuiInput-underline,& .MuiInput-underline:before,& .MuiInput-underline:after': {
//         border: 'none',
//       },
//     },
//     '& .MuiInput-underline,& .MuiInput-underline:before,& .MuiInput-underline:after': {
//       border: 'none',
//     },
//   },
// })(TextField);

const EditInput = styled.input<{}>`
  border: none;
  display: block;
`;

export const EditableLayerName = () => {
  const { id } = useLayer();

  const { displayName, actions } = useEditor((state) => ({
    displayName:
      state.nodes[id] && state.nodes[id].data.custom.displayName
        ? state.nodes[id].data.custom.displayName
        : state.nodes[id].data.displayName,
    hidden: state.nodes[id] && state.nodes[id].data.hidden,
  }));

  const [editingName, setEditingName] = React.useState(false);

  const handleDoubleClick = () => {
    setEditingName((prev) => !prev);
  };

  const handleClickAway = () => {
    setEditingName(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      setEditingName(false);
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      {editingName ? (
        // <EditInput
        //   autoFocus
        //   value={displayName}
        //   onKeyDown={handleKeyDown}
        //   onChange={(e) => {
        //     actions.setCustom(
        //       id,
        //       (custom) => (custom.displayName = e.target.value)
        //     );
        //   }}
        // />
        <EditInput
          autoFocus
          value={displayName}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            actions.setCustom(
              id,
              (custom) => (custom.displayName = e.target.value)
            );
          }}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{displayName}</span>
      )}
    </ClickAwayListener>
  );
};
