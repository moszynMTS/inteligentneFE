import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: string[] = ['pl', 'en']
  currentLang: string = 'pl'; //to cokies add
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
    }
  }
  ngOnInit(): void {
  }

}
