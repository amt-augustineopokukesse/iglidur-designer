import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StlModelViewerModule } from 'angular-stl-model-viewer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectModelUrl } from '../../+state/store.selectors';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, StlModelViewerModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
})
export class MaterialComponent implements OnInit {
  modelUrl$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.modelUrl$ = this.store.pipe(select(selectModelUrl));
  }
}
