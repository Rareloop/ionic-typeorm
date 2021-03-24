import { CommonEntity } from '@rareloop/ionic-typeorm';
import { Entity, Column } from 'typeorm';

@Entity('item')
export class Item extends CommonEntity {
    @Column()
    name!: string;

    @Column()
    phoneNumber!: number;
}
