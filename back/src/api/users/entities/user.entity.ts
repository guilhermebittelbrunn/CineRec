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
import { ForeignKeyDefault } from '../../../common/interfaces/foreignKey-default.interface';
import * as bcrypt from 'bcrypt';
import { Provider } from 'src/api/providers/entities/provider.entity';
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

  @ManyToMany(() => Provider, (providers) => providers.users) //{ cascade: true }
  @JoinTable({
    name: 'userProvider',
    joinColumn: {
      name: 'idUser',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'idProvider',
      referencedColumnName: 'id',
    },
  })
  providers?: Provider[] | ForeignKeyDefault[] | string[];

  @BeforeInsert()
  async createHashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
