import React from 'react';
import { LayerContextProvider } from './layers/LayerContextProvider';
import { LayerManagerProvider } from './manager/LayerManagerProvider';
import { ROOT_NODE } from '@pagezilla/utils';
import { LayerOptions } from './interfaces';
export { useLayer } from './layers';

type CustomClasses = {
  classes?: object;
};

export const Layers: React.FC<Partial<LayerOptions> & CustomClasses> = ({
  classes,
  ...options
}) => {
  return (
    <LayerManagerProvider options={options}>
      <LayerContextProvider classes={classes} id={ROOT_NODE} depth={0} />
    </LayerManagerProvider>
  );
};
