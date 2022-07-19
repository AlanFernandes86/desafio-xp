import { 
  BaseEntity, Entity, 
  Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Account } from './Account';

@Entity('Client')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    unique: true,
  })
  username!: string;

  @Column()
  password!: string;

  @OneToOne(() => Account)
  @JoinColumn()
  account!: Account;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}