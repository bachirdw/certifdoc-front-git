import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierAuditComponent } from './dossier-audit.component';

describe('DossierAuditComponent', () => {
  let component: DossierAuditComponent;
  let fixture: ComponentFixture<DossierAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierAuditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
