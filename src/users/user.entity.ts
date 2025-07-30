import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Project } from "../project/project.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true})
    username: string;

    @Column({ nullable: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Project, (project) => project.user)
    projects: Project[];
}