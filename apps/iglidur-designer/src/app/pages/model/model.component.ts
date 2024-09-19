import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FooterComponent } from '@iglidur-designer/header';

@Component({
  selector: 'app-model',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    DragDropModule,
    StlModelViewerModule,
    FooterComponent
  ],
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})export class ModelComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;

  language!: string;
  tools = '../../../assets/images/tools.png';
  files: File[] = [];
  previews: string[] = [];
  private destroy$ = new Subject<void>();
  modelUrl!: string;
  screenshotUrl: string | null = null;
  screenshots$!: Observable<string[]>;
  
  private modelLoaded = false;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private store: Store,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((language) => {
        this.language = language;
        this.translate.use('model.component.i18n');
        this.changeDetectorRef.markForCheck();
      });

    this.screenshots$ = this.store.pipe(select(selectScreenshots));

  }

  ngAfterViewInit() {
    this.initThree();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initThree() {
    const container = this.rendererContainer.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 1);
    this.scene.add(light);

    this.animate();
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  onFileSelected(event: Event): void {
    const {files} = event.target as HTMLInputElement;

    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.modelUrl = e.target?.result as string;
        this.store.dispatch(uploadModel({ model: this.modelUrl }));
        this.loadModel();
      };
      
      reader.readAsDataURL(file);
    }
  }

  private loadModel() {
    this.modelLoaded = false;
    const loader = new STLLoader();
    loader.load(this.modelUrl, (geometry) => {
      this.scene.children = this.scene.children.filter(child => !(child instanceof THREE.Mesh));
      
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      
      geometry.computeBoundingBox();
      if(geometry.boundingBox) {
        const center = geometry.boundingBox.getCenter(new THREE.Vector3());
        mesh.position.sub(center);  
      }
      
      this.scene.add(mesh);
      this.modelLoaded = true;

      const box = new THREE.Box3().setFromObject(mesh);
      const size = box.getSize(new THREE.Vector3());
      const center2 = box.getCenter(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = this.camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

      this.camera.position.z = cameraZ * 1.5; 
      this.camera.lookAt(center2);

      this.controls.target.copy(center2);
      this.controls.update();

      this.screenshot();
    });
  }


  ensureModelRendered(): Observable<void> {
    return new Observable<void>((observer) => {
      const checkIfRendered = () => {
        const viewer = document.getElementById('rendererContainer');
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
    const modelElement = this.rendererContainer.nativeElement as HTMLDivElement;
  
    if (modelElement && this.modelLoaded) {  
      requestAnimationFrame(() => {
        html2canvas(modelElement).then((canvas) => {
          this.screenshotUrl = canvas.toDataURL();  
          
          this.store.dispatch(saveScreenShot({ screenshot: this.screenshotUrl }));
          
          this.screenshots$ = this.store.pipe(select(selectScreenshots));
        }).catch((error) => {
          console.error('Failed to capture screenshot:', error);
        });
      });
    } else {
      console.error('Model element is not available or model is not loaded.');
    }
  }

  onScreenshotClick(): void {
    this.router.navigate(['/material']);
  }

  
}
