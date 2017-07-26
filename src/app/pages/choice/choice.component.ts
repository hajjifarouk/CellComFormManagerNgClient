import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  moduleId: module.id,
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  @Input('groupc')
  public choiceForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
