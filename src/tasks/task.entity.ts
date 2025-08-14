import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../project/project.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => Project, project => project.tasks)
    project: Project;
 
}