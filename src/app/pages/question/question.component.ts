import { Component, OnInit, Input, Output } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

import { Choice } from '../../models/choice';
@Component({
  moduleId: module.id,
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input('group')
  public questionForm: FormGroup;
  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    console.log('question form init in question component');
    this.questionForm = this._fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      kind: ['',],
      choices: this._fb.array([
        this.initChoice(),
      ])
    });
    this.addChoice();
  }
  initChoice() {
    return this._fb.group({
      value: ['', Validators.required]
    });
  }
  addChoice() {
    const control = <FormArray>this.questionForm.controls['choices'];
    const choiceCtrl = this.initChoice();
    control.push(choiceCtrl);
  }
  removeChoice(i: number) {
    const control = <FormArray>this.questionForm.controls['choices'];
    control.removeAt(i);
  }

}
