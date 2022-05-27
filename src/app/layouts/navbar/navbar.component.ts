import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  hidden: boolean;

  constructor(
    private localStorage: LocalStorageService,
  ) {
    
   }

  ngOnInit(): void {
    $(function(){
      //responsive navbar
      $('#navbarToggler').on('click', function() {
          if ($('.navbarCollapse').hasClass('hidden')) {
            $('#navbarToggler').addClass("navbarTogglerActive");
            $('.navbarCollapse').removeClass("hidden");
          } else {
            $('#navbarToggler').removeClass("navbarTogglerActive");
            $('.navbarCollapse').addClass("hidden");
          }
      });
    });

    this.hidden = false;
    let token = this.localStorage.get('token');
    if (token != null) {
      this.hidden = true;
    }
  }

  signOut() {
    this.localStorage.clear();
    this.localStorage.remove('token');
    this.localStorage.remove('fullname');
    this.localStorage.remove('username');
    window.location.href = '/';
    window.scrollTo(0, 0);
  }

}
