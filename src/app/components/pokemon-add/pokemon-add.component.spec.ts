import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAddComponent } from './pokemon-add.component';

describe('PokemonAddComponent', () => {
  let component: PokemonAddComponent;
  let fixture: ComponentFixture<PokemonAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
