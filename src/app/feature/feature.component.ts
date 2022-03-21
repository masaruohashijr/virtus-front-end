import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
  
@Component({
  selector: 'feature-form',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})

export class FeatureComponent  implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

//	private String name;
//	private String code;
//	private String description;
//	private int author_id;
//	private Timestamp created_at;
//	private int id_versao_origem;
//	private int status_id;

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
  
  resetForm(){
    this.form.reset(); 
    return false;
  }

}