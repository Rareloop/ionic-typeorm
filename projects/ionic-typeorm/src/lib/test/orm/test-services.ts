import { Injectable } from '@angular/core';
import { OrmService } from '../../services/orm-service.service';
import { TestItem } from './test-entities';

@Injectable()
export class TestItemService extends OrmService<TestItem> {
    repositoryName = 'item';
}
