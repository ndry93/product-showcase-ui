import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ScraperDTO } from '@/_models';
import { SelectItem } from 'primeng/api/selectitem';
import { ScraperService, AlertService } from '@/_services';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  selectedScraperDto: ScraperDTO;
  contentHTML: SafeHtml;
  loading = false;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  @ViewChild('dataContainer') dataContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private scraperService: ScraperService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params.has('id')); // true
      if (params.has('id')) {
        this.loading = true;
        const id = params.get('id');
        this.scraperService
          .getById(id)
          .subscribe(
          resp => {
            this.alertService.success("Data fetched successfully", true);
            
            const respJson = JSON.parse(JSON.stringify(resp));
            
            if(respJson.data.status === 'success'){
              // this.dataContainer.nativeElement.innerHTML = respJson.data.web_content;
              this.contentHTML = this.sanitizer.bypassSecurityTrustHtml(respJson.data.web_content);
            }else{
              this.alertService.error(respJson.data.error_message);
            }
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          }
        );
      } else {
        // do nothing
        this.alertService.error('content not found');
      }
    })
  }
}
