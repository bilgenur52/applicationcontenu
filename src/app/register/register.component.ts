import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nom: string ="";
  mot_de_passe: string ="";

  constructor(private http: HttpClient ) 
  {

  }
  ngOnInit(): void {
  }

  register()
  {
    let bodyData = {
      "nom" : this.nom,
      "mot_de_passe" : this.mot_de_passe,
    };

    this.http.post("http://localhost:8080/utilisateur/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Votre compte à bien été enregistré")
    });
  }

  creer(){
    this.register();
  }
}
