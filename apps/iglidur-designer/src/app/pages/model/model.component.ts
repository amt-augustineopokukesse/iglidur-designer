import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@iglidur-designer/header';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './model.component.html',
  styleUrl: './model.component.css',
})
export class ModelComponent {}
