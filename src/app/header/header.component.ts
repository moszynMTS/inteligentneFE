import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: string[] = ['pl', 'en']
  currentLang: string = 'pl';
  user: any = null;
  constructor(private translate: TranslateService) {
  }
  changeLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;
  }
  switchLanguage() {
    const nextLang = this.languages.find(lang => lang !== this.currentLang);
    if (nextLang) {
      this.changeLanguage(nextLang);
      this.setCookie('lang', nextLang);
    }
  }
  ngOnInit(): void {
    this.user = this.getCookie('user');
    let lang = this.getCookie('lang') ?? 'pl';
    this.translate.use(lang);
  }
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
  setCookie(name: string, value: string) {
    document.cookie = `${name}=${value}; path=/`;
  }
}
