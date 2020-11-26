import {Component, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// @ts-ignore
import * as _moment from 'moment';
import {registerLocaleData} from '@angular/common';
// @ts-ignore
import {default as _rollupMoment} from 'moment';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-PT'
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AppComponent implements OnInit {
  title = 'book-form';
  formBook: FormGroup;
  valueBook = 0;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.montarFormularioBook();
    this.formBook.valueChanges.subscribe(r => {
      this.calculateValue();
    });
  }

  montarFormularioBook() {
    this.formBook = this.fb.group({
      typeService: this.fb.control(null, [Validators.required]),
      title: this.fb.control(null, [Validators.required]),
      firstName: this.fb.control(null, [Validators.required]),
      lastName: this.fb.control(null, [Validators.required]),
      phone: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required]),
      address: this.fb.control(null, [Validators.required]),
      suburb: this.fb.control(null, [Validators.required]),
      postCode: this.fb.control(null, [Validators.required]),
      frequency: this.fb.control(null, [Validators.required]),
      hoursRequired: this.fb.control(null, [Validators.required]),
      staffRequired: this.fb.control(null, [Validators.required]),
      startDate: this.fb.control(null, [Validators.required]),
      cleaningTime: this.fb.control(null, [Validators.required]),
      place: this.fb.control(null, [Validators.required]),
      badroom: this.fb.control(null, [Validators.required]),
      livingRoom: this.fb.control(null, [Validators.required]),
      balcony: this.fb.control(null, [Validators.required]),
      steamCarpet: this.fb.control(null, [Validators.required]),
      outSideWindow: this.fb.control(null, [Validators.required]),
      date: this.fb.control(null, [Validators.required]),
      supply: this.fb.control(null, [Validators.required]),
      comments: this.fb.control(null, [Validators.required]),
      headUs: this.fb.control(null, [Validators.required]),
    });
  }

  calculateValue() {
    debugger;
    if (!this.formBook.value.typeService || !this.formBook.value.cleaningTime || !this.formBook.value.frequency) {
      this.valueBook = 0;
      return;
    }

    if (this.formBook.value.typeService === 1) {
      // tslint:disable-next-line:max-line-length
      if (this.formBook.value.frequency === 'weekly' || this.formBook.value.frequency === 'fortnightly' || this.formBook.value.frequency === 'monthly') {
        if (this.checkDate(this.formBook.value.startDate) === 'weekdays') {
          this.valueBook = 35;
        } else if (this.checkDate(this.formBook.value.startDate) === 'saturday') {
          this.valueBook = 38;
        } else if (this.checkDate(this.formBook.value.startDate) === 'sunday') {
          this.valueBook = 42;
        }
      } else if (this.formBook.value.frequency === 'casual') {
        if (this.checkDate(this.formBook.value.startDate) === 'weekdays') {
          this.valueBook = 40;
        } else if (this.checkDate(this.formBook.value.startDate) === 'saturday') {
          this.valueBook = 44;
        } else if (this.checkDate(this.formBook.value.startDate) === 'sunday') {
          this.valueBook = 48;
        }
      }
    } else if (this.formBook.value.typeService === 2) {
      if (this.checkDate(this.formBook.value.startDate) === 'weekdays') {
        this.valueBook = 38;
      } else if (this.checkDate(this.formBook.value.startDate) === 'saturday') {
        this.valueBook = 42;
      } else if (this.checkDate(this.formBook.value.startDate) === 'sunday') {
        this.valueBook = 46;
      }
    } else if (this.formBook.value.typeService === 3) {
      if (this.checkDate(this.formBook.value.startDate) === 'weekdays') {
        this.valueBook = 40;
      } else if (this.checkDate(this.formBook.value.startDate) === 'saturday') {
        this.valueBook = 45;
      } else if (this.checkDate(this.formBook.value.startDate) === 'sunday') {
        this.valueBook = 50;
      }
    }

    if (this.formBook.value.cleaningTime === '7pm') {
      this.valueBook = this.valueBook * 0.15 + this.valueBook;
    }

    this.valueBook = this.valueBook * this.formBook.value.hoursRequired;

    if (this.formBook.value.supply) {
      this.valueBook = this.valueBook + 15;
    }

  }

  checkDate(date) {
    const dt = new Date(date);
    console.log(dt.getDay());
    switch (dt.getDay()) {
      case 1:
        return 'weekdays';

      case 2:
        return 'weekdays';

      case 3:
        return 'weekdays';

      case 4:
        return 'weekdays';

      case 5:
        return 'weekdays';

      case 6:
        return 'saturday';

      case 0:
        return 'sunday';
    }

  }
}
