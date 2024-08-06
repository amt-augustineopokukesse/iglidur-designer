import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@iglidur-designer/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [CommonModule, TranslateModule, DragDropModule],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss',
})
export class ModelComponent implements OnInit, OnDestroy {
  private languageSubscription!: Subscription;
  language!: string;
  tools = '../../../assets/images/tools.png';
  files: File[] = [];
  previews: string[] = [];
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.language = language;
      this.translate.use('model.component.i18n');
    });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
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

  onFileSelected(event: any) {
    const selectedFiles = event.target.files;
    this.handleFiles(selectedFiles);
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.files.push(file);

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
