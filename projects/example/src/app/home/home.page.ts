import { Component } from '@angular/core';
import { Item } from '../database/orm/entities/item';
import { ItemService } from '../database/orm/services/item.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    items: Item[] = [];

    constructor(itemService: ItemService) {
        itemService.all().then((items) => {
            this.items = items;
        });
    }
}
