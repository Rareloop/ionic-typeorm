import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { getTypeOrmConnection, TYPE_ORM_CONNECTION } from '@rareloop/ionic-typeorm';
import { TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS } from '../database/orm';

import { HomePage } from './home.page';

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;
    let conn: any;

    beforeEach(
        waitForAsync(async () => {
            // https://github.com/nestjs/nest/issues/409
            // do a .synchronise(false) to clear a database before connecting
            conn = getTypeOrmConnection('test-app-db', TYPE_ORM_ENTITIES, TYPE_ORM_MIGRATIONS);
            await conn.connect('browser');

            TestBed.configureTestingModule({
                declarations: [HomePage],
                imports: [IonicModule.forRoot()],
                providers: [
                    {
                        provide: TYPE_ORM_CONNECTION,
                        useValue: conn,
                    },
                ],
            }).compileComponents();

            fixture = TestBed.createComponent(HomePage);
            component = fixture.componentInstance;
            fixture.detectChanges();
        }),
        10000
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
