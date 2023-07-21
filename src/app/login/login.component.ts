import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  nom: string ="";
  mot_de_passe: string ="";
  errorMessage: string | null = null; // Initialise la propriété errorMessage à null

  constructor(private http: HttpClient, private router: Router ) 
  {

  }
  ngOnInit(): void {
  }
  
  login()
  {
    let bodyData = {
      "nom" : this.nom,
      "mot_de_passe" : this.mot_de_passe,
    };

    this.http.post("http://localhost:8080/utilisateur/login",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        if (resultData.status === true) {
          // Si les identifiants sont valides, rediriger vers la page /article
          this.router.navigate(['/article']);
        } else {
          // Met à jour la propriété errorMessage avec le message d'erreur du backend
          this.errorMessage = resultData.message;
        }
    });
  }

  connexion(){
    this.login();
  }
}
