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

  @OneToMany(() => List, (list) => list.user)
  list?: List[];

  @ManyToMany(() => Plataform, (plataform) => plataform.user)
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
  plataform?: Plataform[];
}
