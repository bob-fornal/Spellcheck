import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';

import { ClipboardModule } from '@angular/cdk/clipboard'

import { AppComponent } from './app.component';
import { InputPageComponent } from './pages/input-page/input-page.component';
// import { SpellCheckerModule } from 'ngx-spellchecker';

import { CsSpellcheckComponent } from './core/cs-spellcheck/cs-spellcheck.component';

@NgModule({
  declarations: [
    AppComponent,

    InputPageComponent,
    CsSpellcheckComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
    CommonModule,
    HttpClientModule,

    // SpellCheckerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
