import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { ScraperDTO } from "@/_models";

@Injectable({ providedIn: "root" })
export class ScraperService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${environment.apiUrl}/scraper/all`);
  }

  getById(id: string) {
    return this.http.get(`${environment.apiUrl}/scraper/${id}`);
  }

  register(scraperDto: ScraperDTO) {
    return this.http.post(`${environment.apiUrl}/scraper`, scraperDto);
  }

  // update(scraperDto: ScraperDTO) {
  //   return this.http.put(`${environment.apiUrl}/scraper/${scraperDto.id}`, scraperDto);
  // }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/scraper/${id}`);
  }
}
