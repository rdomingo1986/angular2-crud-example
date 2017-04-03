import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public last_id: number;
  public id: number;
  public first_name: string;
  public last_name: string;
  public bio: string;
  public operation: string;
  public persons: Array<any>;

  constructor() { 
    this.operation = 'register';
    this.persons = [];
    let persons_array: Array<any> = JSON.parse(localStorage.getItem('persons_array'));
    this.persons = (persons_array === null || persons_array.length === 0) ? [] : persons_array; 
    this.id = 0;
    if(this.persons.length === 0){
      this.last_id = 0;
    }else{
      this.last_id = this.persons[this.persons.length-1].id;
    }
    console.log(this.last_id);
  }

  public registerAuthor() {
    if(this.operation === 'register'){
      this.last_id++;
      this.persons.push({
        id: this.last_id,
        first_name: this.first_name,
        last_name: this.last_name,
        bio: this.bio
      });
    }else{
      let index: number = -1;
      for(let i:number = 0; i < this.persons.length; i++){
        if(this.persons[i].id === this.id){
          this.persons[i] = {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            bio: this.bio
          };
          break;
        }
      }
      this.operation = 'register';
    }
    localStorage.setItem('persons_array',JSON.stringify(this.persons));
    this.cleanProperties();
  }

  public editPersonInfo(person: any) {
    this.id = person.id;
    this.first_name = person.first_name;
    this.last_name = person.last_name;
    this.bio = person.bio;
    this.operation = 'edit';
  }

  public deletePerson(person: any) {
    let index: number = -1;
    for(let i:number = 0; i < this.persons.length; i++){
      if(this.persons[i].id === person.id){
        index = i;
        break;
      }
    }
    this.persons.splice(index,1);
    this.cleanProperties();
    this.operation = 'register';
    if(! (this.persons.length === 0)) {
      localStorage.setItem('persons_array',JSON.stringify(this.persons));
    }else{
      localStorage.clear();
    }
    
  }

  private cleanProperties() {
    this.id = 0;
    this.first_name = '';
    this.last_name = '';
    this.bio = '';
  }
}
