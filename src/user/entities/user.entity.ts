import { Project } from "src/projects/entities/project.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
