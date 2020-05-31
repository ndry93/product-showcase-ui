import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AlertService, ScraperService } from "@/_services";
import { ScraperDTO } from '@/_models';

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit {
  scraperForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private scraperService: ScraperService,
  ) {
  }

  ngOnInit() {
    this.scraperForm = this.formBuilder.group({
      url: ["", Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.scraperForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.scraperForm.invalid) {
      this.loading = false;
      return;
    }

    this.scraperService
      .register(this.scraperForm.value)
      .subscribe(
      resp => {
        this.alertService.success("Registration successful", true);
        
        // Set our navigation extras object
        const respJson = JSON.parse(JSON.stringify(resp));
        if (respJson.data.id) {
          this.router.navigate(['/product-detail', { id: respJson.data.id }]);
        } else {
          this.alertService.error('unexpected error while registering the url');
        }
        this.loading = false;
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
