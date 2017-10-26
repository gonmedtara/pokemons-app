import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonFilterComponent } from './pokemon-filter.component';

describe('PokemonFilterComponent', () => {
  let component: PokemonFilterComponent;
  let fixture: ComponentFixture<PokemonFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
