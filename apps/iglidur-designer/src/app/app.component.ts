import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent, ToolbarComponent } from '@iglidur-designer/header';

@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, ToolbarComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public title = 'iglidur-designer';
}
