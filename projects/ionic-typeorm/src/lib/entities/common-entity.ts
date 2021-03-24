import { PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

interface IEntity {
    [key: string]: any;
}

export class CommonEntity extends BaseEntity implements IEntity {
    @PrimaryGeneratedColumn()
    id = 0;

    // @Column({
    //     nullable: true
    // })
    // created: number;

    // @Column({
    //     nullable: true
    // })
    // updated: number;

    // @BeforeInsert()
    // updateCreated() {
    //     this.created = Date.now();
    // }

    // @BeforeUpdate()
    // updateUpdated() {
    //     this.updated = Date.now();
    // }
}
