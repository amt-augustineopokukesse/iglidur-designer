import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@iglidur-designer/services';
import { Subject, takeUntil } from 'rxjs';
import { SupportedLanguage } from '@iglidur-designer/interfaces';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  public rating = 0;
  // public stars = new Array(5);
  private destroy$ = new Subject<void>();
  public language!: SupportedLanguage;
  public ratingSelected = output<number>();

  stars = Array(5).fill({ filled: false });
  hoverIndex = -1;
  selectedIndex = -1;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => {
        this.translate.use('footer.component.i18n');      
        this.language = language;
        this.cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // rate(rating: number) {
  //   this.rating = rating;
  // }

  onStarHover(index: number): void {
    this.hoverIndex = index;
  }

  onStarLeave(): void {
    this.hoverIndex = -1;
  }

  onStarClick(index: number): void {
    this.selectedIndex = index;
    this.stars.forEach((star, i) => star.filled = i <= index);
    this.ratingSelected.emit(index + 1);
  }
}
