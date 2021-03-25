import { Injectable } from '@angular/core';
import { IItem } from '../../../model/item';
import { Item } from '../entities/item';
import { OrmService } from '@rareloop/ionic-typeorm';

@Injectable({
    providedIn: 'root',
})
export class ItemService extends OrmService<IItem, Item> {
    repositoryName = 'item';

    protected mapData(data: Item): IItem {
        return data;
    }
}
