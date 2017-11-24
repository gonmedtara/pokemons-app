import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileStoreComponent } from './file-store.component';

describe('FileStoreComponent', () => {
  let component: FileStoreComponent;
  let fixture: ComponentFixture<FileStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
