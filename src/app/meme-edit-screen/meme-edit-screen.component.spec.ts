import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeEditScreenComponent } from './meme-edit-screen.component';

describe('MemeEditScreenComponent', () => {
  let component: MemeEditScreenComponent;
  let fixture: ComponentFixture<MemeEditScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeEditScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemeEditScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
