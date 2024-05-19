import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Injectable} from "@angular/core";
import {catchError, map, Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    collectionPath = 'users';
    authIdField = 'authId';

    constructor(private _afs: AngularFirestore) {}

    create(user: User) {
        return this._afs.collection<User>(this.collectionPath).add(user.getUploadObject());
    }

    update(user: User): Promise<void> {
        const uploadObject = {
            authId: user.authId,
            email: user.email,
            name: user.name,
        }
        return this._afs.collection(this.collectionPath).doc(user.id).set(uploadObject);
    }

    getById(id: string): Observable<User|undefined> {
        return this._afs.collection<User>(this.collectionPath).doc(id).get().pipe(
            map(snapshot => {
                return UserService.parseUser(snapshot);
            })
        );
    }

    getByAuthId(authId: string): Observable<User|undefined> {
        return this._afs.collection<User>(this.collectionPath,
            ref => ref.where(this.authIdField, '==', authId)
                .limit(1))
                .get()
                .pipe(
                    map(snapshot => {
                        if (snapshot.empty) {
                            return undefined;
                        }
                        return UserService.parseUser(snapshot.docs.at(0));
                    }),
                    catchError(error => {
                        console.error(error);
                        throw error;
                    })
                );
    }

    public static parseUser(doc: any): User|undefined {
        if (!doc.exists) return undefined;

        const user = doc.data();
        if (!user) return undefined;

        user.id = doc.id;
        user.reference = doc.ref;
        return user;
    }
}
