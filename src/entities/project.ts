import { User } from "./user";

export interface Project{
    id: string
    name: string;
    createdAt: string;
    description: string;
    assignedTo: string;
    projectManager: string;
    status: string;
}

export interface ProjectDetail{
    project: Project;
    projectManager: User | null;
    assignedTo: User | null;
}