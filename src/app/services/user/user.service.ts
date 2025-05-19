import { Injectable } from '@angular/core';
import { AppSettings } from '../../settings/app.settings';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpResponse } from '../../models/custom-http-response';import { User } from '../../models/user';
;

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private host = AppSettings.APP_URL;


  constructor(private http:HttpClient) { }

  public getUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/api/auth/list`);

  }

  public addUser(formData:FormData): Observable<User > {
    return this.http.post<User>(`${this.host}/api/auth/add`,formData);

  }

  public updateUser(formData: FormData): Observable<User > {
    return this.http.post<User>(`${this.host}/api/auth/update`, formData);

  }

  public deleteUser(userId: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/api/auth/delete/${userId}`);

  }


  //Add user in cache
  public addUsersToLocalCache(users:User[]):void{
    localStorage.setItem('users', JSON.stringify(users));
  }

  //Si je vais dans mon cache local et je recupère 
  // un item de users sinon je retourne un tableau vide 
  public getUsersFromLocalCache():User[]{
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users')!);

    } else{
      return [];
    }

  }

  createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {

    const formData = new FormData();

    formData.append('CurrentUsername', loggedInUsername);
    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('IsNotLocked', JSON.stringify(user.notLocked));
    
    return formData;
  }


}
