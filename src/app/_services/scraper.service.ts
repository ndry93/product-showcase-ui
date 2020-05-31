import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "environments/environment";
import { ScraperDTO } from "@/_models";

@Injectable({ providedIn: "root" })
export class ScraperService {
  headers = new  HttpHeaders().set("Content-Type", "application/json");
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${environment.apiUrl}/scraper/all`, { headers: this.headers });
  }

  getById(id: string) {
    return this.http.get(`${environment.apiUrl}/scraper/${id}`, { headers: this.headers });
  }

  register(scraperDto: ScraperDTO) {
    return this.http.post(`${environment.apiUrl}/scraper`, scraperDto, { headers: this.headers });
  }

  // update(scraperDto: ScraperDTO) {
  //   return this.http.put(`${environment.apiUrl}/scraper/${scraperDto.id}`, scraperDto);
  // }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/scraper/${id}`, { headers: this.headers });
  }
}
