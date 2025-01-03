import { Injectable } from '@angular/core';
import { Type } from '../../components/ingredient/Type';
import { types } from '../../components/ingredient/types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() { }
  getTypes() : Observable<Type[]>{
    const t : Observable<Type[]> = of(types);
    return t;
  }
  getType(id : number) : Observable<Type>{
    let t = types.find(t_ => t_.id == id)!;
    return of(t);
  }
}
