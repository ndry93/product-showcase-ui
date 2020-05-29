import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

// import { AuthenticationService } from "./_services";
// import { User } from "./_models";

@Component({ selector: "app", templateUrl: "app.component.html", styleUrls: ['./app.component.css'] })
export class AppComponent {
  public isMenuCollapsed = true;

  brand = {
    img: {
      src: "#",
      alt: "product-showcase-logo"
    }
  }

  constructor(
    private router: Router,
    public route: ActivatedRoute,
  ) {}
}