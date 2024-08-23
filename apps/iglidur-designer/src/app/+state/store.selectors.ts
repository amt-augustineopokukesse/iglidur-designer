import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_FEATURE_KEY } from './store.reducer';
import { AppState } from './store.models';

export const selectStoreState =
  createFeatureSelector<AppState>(STORE_FEATURE_KEY);

export const selectModelUrl = createSelector(
  selectStoreState,
  (state) => state.models[state.models.length - 1]
);

export const selectScreenshots = createSelector(
  selectStoreState,
  (state) => state.screenshots
);
