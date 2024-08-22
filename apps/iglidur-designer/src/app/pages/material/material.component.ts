import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StlModelViewerModule } from 'angular-stl-model-viewer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, StlModelViewerModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
})
export class MaterialComponent implements OnInit {
  modelUrl: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.modelUrl = params['modelUrl'];
    // });
    console.log('material this');
  }
}
