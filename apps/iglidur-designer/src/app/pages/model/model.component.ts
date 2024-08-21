import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@iglidur-designer/services';
import { Subject, takeUntil } from 'rxjs';
import { StlModelViewerModule } from 'angular-stl-model-viewer';
import { Store } from '@ngrx/store';
import { uploadModel } from '../../+state/store.actions';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule, TranslateModule, DragDropModule, StlModelViewerModule],
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
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.languageService.language$.pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this.language = language;
      this.translate.use('model.component.i18n');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.modelUrl = e.target?.result as string;
        this.store.dispatch(uploadModel({model: this.modelUrl}));
      };
      reader.readAsDataURL(file);
    }
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.files.push(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
