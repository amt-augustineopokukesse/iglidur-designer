import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@iglidur-designer/services';
import { Subject, takeUntil } from 'rxjs';

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
  rating = 0;
  stars = new Array(5);
  private destroy$ = new Subject<void>();
  language!: string;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => {
        this.language = language;
        this.translate.use('footer.component.i18n');
        this.changeDetectorRef.markForCheck();
      });


  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  rate(rating: number) {
    this.rating = rating;
  }
}
