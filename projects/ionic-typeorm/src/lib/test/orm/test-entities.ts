import { CommonEntity } from '../../entities/common-entity';
import { Entity, Column } from 'typeorm';

@Entity('item')
export class TestItem extends CommonEntity {
    @Column()
    name!: string;

    @Column({
        nullable: true,
    })
    phoneNumber!: string;
}

export const TYPE_ORM_TEST_ENTITIES = [TestItem];
