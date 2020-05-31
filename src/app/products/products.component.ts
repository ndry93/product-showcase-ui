import { Component, OnInit, OnDestroy } from "@angular/core";
import { first } from "rxjs/operators";

import { ScraperDTO } from "@/_models";
import { ScraperService, AlertService } from "@/_services";
import { SelectItem } from "primeng/api/selectitem";
import { Router } from '@angular/router';

@Component({
  templateUrl: "products.component.html",
})
export class ProductsComponent implements OnInit {
  scraperDtos: ScraperDTO[] = [];
  selectedScraperDto: ScraperDTO;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  loading = false;

  constructor(
    private alertService: AlertService,
    private scraperService: ScraperService,
    private router: Router,
  ) {}

  select(event: Event, scraperDto: ScraperDTO) {
    this.selectedScraperDto = scraperDto;
    this.displayDialog = true;
    this.router.navigate(['/product-detail', { id: scraperDto.id }]);
    event.preventDefault();
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedScraperDto = null;
  }

  ngOnInit() {
    this.loadAll();
  }

  delete(id: number) {
    this.scraperService.delete(id).subscribe(() => {
      this.loadAll();
    });
  }

  public loadAll() {
    this.scraperDtos = [];
    this.loading = true;
    this.scraperService.getAll().subscribe(
      (resp) => {
        this.alertService.success("All Data fetched successfully", true);
        
        const respJson = JSON.parse(JSON.stringify(resp));
        
        if (respJson.data.status === "success") {
          respJson.data.records.forEach((element) => {
            this.scraperDtos.push(element);
          });
        } else {
          this.alertService.error("unexpected error when fetching data");
        }

        this.loading = false;
      },
      (error) => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }
}
