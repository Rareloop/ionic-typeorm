import { Component } from '@angular/core';

import { ItemService } from '../database/orm/services/item.service';
import { IItem } from '../model/item';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    items: IItem[] = [];

    constructor(itemService: ItemService) {
        itemService.all().then((items) => {
            this.items = items;
        });
    }
}
