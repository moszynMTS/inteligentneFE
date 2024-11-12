import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class ApiCaller {
    readonly APIUrl = environment.apiUrl ?? '';
    private typeName: string = "";

    constructor(private http: HttpClient) {
    }
    public setControllerPath(controllerPath: string) {
        this.typeName = controllerPath;
    }
    getList(search?: any): Observable<any[]> {
        const payload = { search };
        return this.http.get<any>(this.APIUrl + this.typeName, {params: payload });
    }
    getItem(itemId: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + this.typeName+'/'+itemId);
    }
    getForSelect(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + this.typeName+'/getForSelect');
    }
    addItem(item: any){
        return this.http.post<any>(this.APIUrl + this.typeName, item)
    }
    updateItem(item: any, itemId: any){
        item.Id = itemId;
        return this.http.put<any>(this.APIUrl + this.typeName, item)
    }
    deleteItem(itemId: any) {
        return this.http.put<any>(`${this.APIUrl}${this.typeName}/delete`, null, {
            params: {itemId}
        });
    }
      
}
