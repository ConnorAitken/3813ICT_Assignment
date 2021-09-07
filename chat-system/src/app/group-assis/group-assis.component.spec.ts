import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAssisComponent } from './group-assis.component';

describe('GroupAssisComponent', () => {
  let component: GroupAssisComponent;
  let fixture: ComponentFixture<GroupAssisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAssisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAssisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
