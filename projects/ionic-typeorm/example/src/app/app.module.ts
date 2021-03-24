import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS } from './database/orm';
import { getTypeOrmConnection, ITypeOrmConnection, TYPE_ORM_CONNECTION } from '@rareloop/ionic-typeorm';

const initApp = (orm: ITypeOrmConnection): (() => Promise<any>) => async () => {
    console.log('initializeApp: connecting to ORM DB');
    await orm.connect('browser');
    console.log('initializeApp: connected to ORM DB');
};

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            multi: true,
            deps: [TYPE_ORM_CONNECTION],
        },
        {
            provide: TYPE_ORM_CONNECTION,
            useValue: getTypeOrmConnection('ionic-typeorm', TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS),
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
