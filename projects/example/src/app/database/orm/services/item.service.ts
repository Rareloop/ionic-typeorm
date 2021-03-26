import { Injectable } from '@angular/core';
import { Item } from '../entities/item';
import { OrmService } from '@rareloop/ionic-typeorm';

@Injectable({
    providedIn: 'root',
})
export class ItemService extends OrmService<Item> {
    repositoryName = 'item';
}
