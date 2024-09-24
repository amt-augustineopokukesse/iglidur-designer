import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-processing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-processing.component.html',
  styleUrl: './post-processing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostProcessingComponent {}
