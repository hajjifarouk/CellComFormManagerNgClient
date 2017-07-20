import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

import { Form } from '../../models/form';
import { Question } from '../../models/question';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public myForm: FormGroup; // our form model

  forms: Array<Form> = [];
  newForm: Form = new Form();
  selectedForm: Form = new Form();
  constructor(private _formService: FormService, private _fb: FormBuilder) {
    this.newForm = new Form();
    this.selectedForm = new Form();
    this._formService.getForm().subscribe(
      value => { this.forms = value; console.log(value); },
      error => { console.log(error) }
    );
   }

  ngOnInit() {
    this.myForm = this._fb.group({
      ref: ['', [Validators.required, Validators.minLength(5)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      isActive: ['',],
      questions: this._fb.array([
        this.initQuestion(),
      ])
    });
    this.addQuestion();
  }
  initQuestion() {
    return this._fb.group({
      body: ['', Validators.required]
    });
  }
  addQuestion() {
    const control = <FormArray>this.myForm.controls['questions'];
    const questionCtrl = this.initQuestion();
    control.push(questionCtrl);
  }
  removeQuestion(i: number) {
    const control = <FormArray>this.myForm.controls['questions'];
    control.removeAt(i);
  }
  populate(form: Form) {
    this.selectedForm = form;
    (<FormControl>this.myForm.controls['ref'])
      .setValue(form.ref, { onlySelf: true });
    (<FormControl>this.myForm.controls['title'])
      .setValue(form.title, { onlySelf: true });
    (<FormControl>this.myForm.controls['isActive'])
      .setValue(form.isActive, { onlySelf: true });
    var quest = form.questions.map(function (obj) {
      return ({ body: obj.body });
    });
    const questionFGs = quest.map(q => this._fb.group(q));
    const questionFormArray = this._fb.array(questionFGs);
    this.myForm.setControl('questions', questionFormArray);
    console.log(this.myForm);
  }
  saveForm(model: Form) {
    model = this.myForm.value;
    model.isActive = true;
    this._formService.addForm(model).subscribe(
      value => {
        console.log(value);
        this._formService.getForm().subscribe(
          value => {
            this.forms = value;
            console.log(value);
          },
          error => { console.log(error) }
        );
        this.newForm = new Form();
        this.myForm.reset();
      },
      error => { console.log(error) }
    );
  }
  editForm(model: Form) {
    console.log(this.myForm.value);
    model = this.myForm.value;
    console.log(model);
    this.selectedForm.ref = model.ref;
    this.selectedForm.title = model.title;
    this.selectedForm.isActive = model.isActive;
    this.selectedForm.questions = model.questions;
    console.log(this.selectedForm);
    var id = this.selectedForm._id;
    this._formService.editForm(id, model)
      .subscribe(
      (data) => { console.log(data); this.myForm.reset();this.selectedForm=new Form(); },
      (error) => { console.log(error) }
      )
  }
  deleteForm() {
    var id = this.selectedForm._id;
    this._formService.deleteForm(id)
      .subscribe(
      (data) => { console.log(data) },
      (error) => { console.log(error) }
      );
    this.selectedForm=new Form();
  }
}
