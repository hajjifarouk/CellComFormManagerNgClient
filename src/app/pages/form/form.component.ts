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

  kinds=["simple",'binary','multiple'];
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
      ref: [this.selectedForm.ref, [Validators.required, Validators.minLength(5)]],
      title: [this.selectedForm.title, [Validators.required, Validators.minLength(5)]],
      isActive: [this.selectedForm.isActive,],
      questions: this._fb.array([
        this.initQuestion(),
      ])
    });
    this.myForm.controls['questions'].valueChanges
      .subscribe( data => console.log( data ) );
    this.addQuestion();
  }
  initQuestion() {
    console.log('question form init in form component');
    return this._fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      kind: ['binary', ],
      choices: this._fb.array([
        this.initChoice()
      ])
    });
  }
  addQuestion() {
    const control = <FormArray>this.myForm.controls['questions'];
    console.log(control);
    const questionCtrl = this.initQuestion();
    control.push(questionCtrl);
  }
  removeQuestion(i: number) {
    const control = <FormArray>this.myForm.controls['questions'];
    control.removeAt(i);
  }
  initChoice() {
    return this._fb.group({
      value: ['', Validators.required]
    });
  }
  addChoice(i:number) {
    const control1 =<FormArray>this.myForm.controls['questions'];
    const control2=<FormGroup>control1.controls[i];
    const controlChoice=<FormArray>control2.controls['choices'];
    const choiceCtrl = this.initChoice();
    controlChoice.push(choiceCtrl);
  }
  removeChoice(i: number,j:number) {
    const control1 =<FormArray>this.myForm.controls['questions'];
    const control2=<FormGroup>control1.controls[i];
    const controlChoice=<FormArray>control2.controls['choices'];
    controlChoice.removeAt(j);
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
      return ({ text: obj.text });
    });
    const questionFGs = quest.map(q => this._fb.group(q));
    const questionFormArray = this._fb.array(questionFGs);
    this.myForm.setControl('questions', questionFormArray);
    console.log(this.myForm);
  }
  saveForm(model: Form) {
    model = this.myForm.value;
    model.isActive = true;
    console.log(model);
    /*this._formService.addForm(model).subscribe(
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
    );*/
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
  select($event){
    console.log($event.target.value);
  }
}
