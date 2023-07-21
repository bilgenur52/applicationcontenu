import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent {


  ArticleArray : any[] = [{    liked: false // Add the liked property
}];
  NomUtilisateurArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  auteur: string ="";
  titre: string ="";
  contenu: string ="";
  utilisateur_id: string="";
  article_id: string="";
  currentArticleID = "";
  buttonText: string = 'J&#39;aime';
  aime: boolean = false;

  jaimes(articleItem: any) {
    articleItem.liked = !articleItem.liked; // Toggle the liked state for the respective article
    this.buttonText = articleItem.liked ? 'Aimé' : 'J&#39;aime';
  
    let bodyData = {
      "article_id" : articleItem.id,
      "utilisateur_id" : this.utilisateur_id,
    };

    this.http.post("http://localhost:8080/jaimes/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
       // alert("Jaime ajouté avec succès")
    });  }


  constructor(private http: HttpClient, private router: Router ) 
  {
    this.getAllArticle();
  }
  ngOnInit(): void {
  }
  getAllArticle()
  { 
    this.http.get("http://localhost:8080/article")
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.ArticleArray = resultData;
    });
  }
  
  register()
  {
   // this.isLogin = false; 
   // alert("hi");
    let bodyData = {
      "auteur" : this.auteur,
      "titre" : this.titre,
      "contenu" : this.contenu,
    };

    this.http.post("http://localhost:8080/article/add",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Article ajouté avec succès")
     /*  this.snackBar.open('Article ajouté avec succès', 'Fermer', {
        duration: 3000, // Durée en millisecondes pendant laquelle le message reste affiché
        verticalPosition: 'top', // Position verticale du message (top, bottom)
      }); */
        this.getAllArticle();
    }); 
  }
  setUpdate(data: any) 
  {
   this.auteur = data.auteur;
   this.titre = data.titre;
   this.contenu = data.contenu;
  
   this.currentArticleID = data.id;
  }

  UpdateRecords()
  {
    let bodyData = 
    {
      "auteur" : this.auteur,
      "titre" : this.titre,
      "contenu" : this.contenu
    };
    
    this.http.put("http://localhost:8080/article/update"+ "/"+ this.currentArticleID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Article modifié avec succès")
        this.getAllArticle();
      
    });
  }
 
  save()
  {
    if(this.currentArticleID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
  setDelete(data: any)
  {
    this.http.delete("http://localhost:8080/article/delete"+ "/"+ data.id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Article supprimé avec succès")
        this.getAllArticle();
    });
  }
  logout() {
    this.router.navigate(['/login']);
  }
}
