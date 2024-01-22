import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { List } from 'src/api/lists/entities/list.entity';
import { Plataform } from 'src/api/plataforms/entities/plataform.entity';
import { ForeignKeyDefault } from 'src/common/interfaces/foreignKey-default.interface';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => List, (lists) => lists.user)
  lists?: List[];

  @ManyToMany(() => Plataform, (plataforms) => plataforms.users)
  @JoinTable({
    name: 'userPlataform',
    joinColumn: {
      name: 'idUser',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idPlataform',
      referencedColumnName: 'id',
    },
  })
  plataforms?: Plataform[] | ForeignKeyDefault[] | string[];
}
