import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParJoursComponent } from './liste-par-jours.component';

describe('ListeParJoursComponent', () => {
  let component: ListeParJoursComponent;
  let fixture: ComponentFixture<ListeParJoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeParJoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeParJoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
