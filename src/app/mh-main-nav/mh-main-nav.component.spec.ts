
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MhMainNavComponent } from './mh-main-nav.component';

describe('MhMainNavComponent', () => {
  let component: MhMainNavComponent;
  let fixture: ComponentFixture<MhMainNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [MhMainNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MhMainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
