import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lib-toolbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  links = [
    { name: 'MODEL', url: 'model' },
    { name: 'MATERIAL', url: 'material' },
    { name: 'POST-PROCESSING', url: 'postprocessing' },
    { name: 'PRODUCIBILITY', url: 'producibility' },
  ];
  activeLink = this.links[0].name;
}
