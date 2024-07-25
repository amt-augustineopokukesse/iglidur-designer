import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, ToolbarComponent } from '@iglidur-designer/header';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, ToolbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'iglidur-designer';
}
