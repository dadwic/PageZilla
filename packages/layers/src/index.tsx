import React from 'react';
import { ROOT_NODE } from '@pagezilla/utils';
import { LayerContextProvider } from './layers/LayerContextProvider';
import { LayerManagerProvider } from './manager/LayerManagerProvider';
import { LayerOptions } from './interfaces';
export { useLayer } from './layers';

export const Layers: React.FC<Partial<LayerOptions>> = ({ ...options }) => {
  return (
    <LayerManagerProvider options={options}>
      <LayerContextProvider id={ROOT_NODE} depth={0} />
    </LayerManagerProvider>
  );
};
