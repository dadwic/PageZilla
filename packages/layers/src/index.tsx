import React from 'react';
import { LayerContextProvider } from './layers/LayerContextProvider';
import { LayerManagerProvider } from './manager/LayerManagerProvider';
import { ROOT_NODE } from '@pagezilla/utils';
import { LayerOptions } from './interfaces';
export { useLayer } from './layers';

export const Layers: React.FC<{
  options: Partial<LayerOptions>;
  classes: object;
  className: string;
}> = ({ classes, options, className }) => {
  return (
    <LayerManagerProvider options={options}>
      <LayerContextProvider
        className={className}
        classes={classes}
        id={ROOT_NODE}
        depth={0}
      />
    </LayerManagerProvider>
  );
};
