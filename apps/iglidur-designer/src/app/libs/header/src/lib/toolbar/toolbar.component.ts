import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'lib-toolbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTabsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  links = ['MODEL', 'MATERIAL', 'POST-PROCESSING', 'PRODUCIBILITY'];
  activeLink = this.links[0];
}
