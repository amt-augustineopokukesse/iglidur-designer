import { createAction, props } from '@ngrx/store';

export const uploadModel = createAction(
  '[Model Page] Upload Model',
  props<{ model: string }>()
);

export const saveScreenShot = createAction(
  '[Model Page] Save Snapshot',
  props<{ screenshot: string }>()
);
