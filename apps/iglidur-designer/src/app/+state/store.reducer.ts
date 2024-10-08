import {} from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as StoreActions from './store.actions';
import { AppState } from './store.models';

export const STORE_FEATURE_KEY = 'store';

export const initialStoreState: AppState = {
  models: [],
  screenshots: [],
};

const reducer = createReducer(
  initialStoreState,

  on(StoreActions.uploadModel, (state, { model }) => ({
    ...state,
    models: [...state.models, model],
  })),

  on(StoreActions.saveScreenShot, (state, { screenshot }) => ({
    ...state,
    screenshots: [...state.screenshots, screenshot],
  }))
);

export function storeReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
