import { Role } from "src/role/entities/role.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ unique: true})
  email: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true })
  status: boolean;

  @Column('timestamp with time zone', { default: () => 'CURRENT_TIMESTAMP'})
  creation_date: Date;

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLocaleLowerCase();
  }

  @BeforeUpdate()
  checkFieldBeforeUpdate() {
    this.email = this.email.toLocaleLowerCase();
  }

  @ManyToOne(
    () => Role,
    (rol) => rol.users,
    {eager: true}
  )
  @JoinColumn({ name: 'rol_id'})
  rol: Role;
}
