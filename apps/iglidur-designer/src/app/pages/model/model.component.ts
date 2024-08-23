import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@iglidur-designer/services';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StlModelViewerModule } from 'angular-stl-model-viewer';
import { select, Store } from '@ngrx/store';
import { saveScreenShot, uploadModel } from '../../+state/store.actions';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { selectScreenshots } from '../../+state/store.selectors';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    DragDropModule,
    StlModelViewerModule,
  ],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss',
})
export class ModelComponent implements OnInit, OnDestroy {
  language!: string;
  tools = '../../../assets/images/tools.png';
  files: File[] = [];
  previews: string[] = [];
  private destroy$ = new Subject<void>();
  modelUrl!: string | undefined | null;
  screenshotUrl: string | null = null;
  screenshots$!: Observable<string[]>;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => {
        this.language = language;
        this.translate.use('model.component.i18n');
      });

    this.screenshots$ = this.store.pipe(select(selectScreenshots));

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onFileSelected(event: Event): void {
    const {files} = event.target as HTMLInputElement;

    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.modelUrl = e.target?.result as string;
        this.store.dispatch(uploadModel({ model: this.modelUrl }));
      };
      this.ensureModelRendered().subscribe(() => {
        this.screenshot();
      });
      reader.readAsDataURL(file);
    }
  }


  ensureModelRendered(): Observable<void> {
    return new Observable<void>((observer) => {
      const checkIfRendered = () => {
        const viewer = document.querySelector('stl-model-viewer');
        if (viewer && viewer.querySelector('canvas')) {
          observer.next();
          observer.complete();
        } else {
          requestAnimationFrame(checkIfRendered);
        }
      };
      checkIfRendered();
    });
  }

  screenshot(): void {
    const modelElement = document.querySelector('#model') as HTMLElement;
    if (modelElement) {
      html2canvas(modelElement).then((canvas) => {
        this.screenshotUrl = canvas.toDataURL();
        this.store.dispatch(saveScreenShot({ screenshot: this.screenshotUrl }));
        this.screenshots$ = this.store.pipe(select(selectScreenshots));
      });
    }
  }

  onScreenshotClick(): void {
    this.router.navigate(['/material']);
  }
}
