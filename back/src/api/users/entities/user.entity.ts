import {
  BeforeInsert,
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
import { List } from '../../lists/entities/list.entity';
import { Plataform } from '../../plataforms/entities/plataform.entity';
import { ForeignKeyDefault } from '../../../common/interfaces/foreignKey-default.interface';
import * as bcrypt from 'bcrypt';
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

  @BeforeInsert()
  async createHashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
