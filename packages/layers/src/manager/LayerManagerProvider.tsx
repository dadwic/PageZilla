import React from 'react';
import { EventManager } from '../events';
import { useMethods } from '@pagezilla/utils';
import { LayerMethods } from './actions';
import { LayerOptions } from '../interfaces';
import { LayerManagerContext } from './context';
import { DefaultLayer } from '../layers';
import { CustomTreeItem } from '../layers';

export const LayerManagerProvider: React.FC<{
  options: Partial<LayerOptions>;
}> = ({ children, options }) => {
  const store: any = useMethods(LayerMethods, {
    layers: {},
    events: {
      selected: null,
      dragged: null,
      hovered: null,
    },
    options: {
      // renderLayer: DefaultLayer,
      renderLayer: CustomTreeItem,
      ...options,
    },
  });

  return (
    <LayerManagerContext.Provider value={{ store }}>
      <EventManager>{children}</EventManager>
    </LayerManagerContext.Provider>
  );
};
