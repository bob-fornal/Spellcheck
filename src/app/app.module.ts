import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputPageComponent } from './pages/input-page/input-page.component';
// import { SpellCheckerModule } from 'ngx-spellchecker';

import { CahSpellcheckComponent } from './core/cah-spellcheck/cah-spellcheck.component';

@NgModule({
  declarations: [
    AppComponent,

    InputPageComponent,
    CahSpellcheckComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule ,

    // SpellCheckerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
