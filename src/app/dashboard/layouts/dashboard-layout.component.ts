import { Component, computed, inject } from '@angular/core';
import { ConversorService } from '../../auth/services/conversor.service';
import { AuthService } from '../../auth/services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private conversorService = inject( ConversorService );
  private authService = inject( AuthService );
  
  public user = computed(() => this.authService.currentUser() );
  public role = computed(() =>  this.authService.isAdmin());

  private fb = inject( FormBuilder );
  private router = inject( Router )


  public dataConverted = computed(() => this.conversorService.currentConvertion() );

  public convertForm: FormGroup = this.fb.group({
    ufquantity: ['', [ Validators.required,,
                        Validators.pattern("^[0-9]*$"),
                        Validators.maxLength(6), ]],
    dateToConvert: ['', [ Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/) ]],
  });

  convert() {
    const { ufquantity, dateToConvert } = this.convertForm.value;
    this.conversorService.conversor(ufquantity, dateToConvert )
    .subscribe({
      next: () => {
        Swal.fire('success', 'Conversion Realizada', 'success' );
        this.router.navigateByUrl('/dashboard')
      },
      error: (message) => {
        Swal.fire('Error', message, 'error' )
      }
    })

  }
  historic(){
    this.router.navigateByUrl('/historic')
  }
  onLogout() {
   this.authService.logout();
  }

}
