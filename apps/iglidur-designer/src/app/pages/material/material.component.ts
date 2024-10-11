import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StlModelViewerModule } from 'angular-stl-model-viewer';
import { Store } from '@ngrx/store';
import { selectModelUrl } from '../../+state/store.selectors';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, StlModelViewerModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent {
  private readonly store = inject(Store);
  public modelUrl = this.store.selectSignal(selectModelUrl);
}
