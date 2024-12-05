import { FormData } from "../components/project-form";
import { Project, ProjectDetail } from "../entities/project";
import { User } from "../entities/user";

type Listener = () => void; 

const STORAGE_KEY = 'projects';
const USERS_STORAGE_KEY = 'users';

const listeners: Listener[] = [];

export const getProjects = (): Project[] => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
};
export const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
};
export const getProjectsWithUsers = ():ProjectDetail[] => {
    const projects = getProjects()
    const users = getUsers();

    const userMap = new Map(users.map((user) => [user.id, user]));

    const data = projects.map(project => {

        return {
            project,
            projectManager: userMap.get(project.projectManager) || null,
            assignedTo: userMap.get(project.assignedTo) || null,
        }
    })
    return data;
    
};

export const findProjectById = (id: string) => {
    const projects = getProjects();

    const project = projects.find((project) => project.id === id);

    if (!project) {
        return new Error("Not Found Error")
    }
    return project;
};

export const saveProjects = (projects: Project[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};
export const saveUsers = (users: User[]): void => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const addProject = (value: FormData) => {
    const projects = getProjects();
    const date = new Date().toISOString()
    const project = {...value, 
        id: `${new Date().getTime()}`, createdAt: formatDate(date)
    }
    projects.push(project);
    saveProjects(projects);
    notify();
};

export const updateProject = (id: string, updatedProject: FormData) => {
    const projects = getProjects();
    const index = projects.findIndex((project) => project.id === id);
    if (index !== -1) {
        projects[index] = {...updatedProject, id: projects[index].id, createdAt: projects[index].createdAt};
        saveProjects(projects);
    };
    notify();
};

export const deleteProject = (id: string) => {
    const projects = getProjects().filter((project) => project.id !== id);
    saveProjects(projects);
    notify();
};

export const subscribe = (listener: Listener) => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  };

  const notify = () => {
    listeners.forEach((listener) => listener());
  };

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const initializeUsers = (): void => {
    const defaultUsers: User[] = [
        {
            id: "101",
            name: 'Walt Cosani',
            role: 'project manager',
            avatar: '',
        },
        {
            id: "102",
            name: 'Ignacio Truffa',
            role: 'developer',
            avatar: 'Ellipse 46.png',
        },
        {
            id: "103",
            name: 'Juan Garcia',
            role: 'project manager',
            avatar: '',
        },
        {
            id: "104",
            name: 'Gonzalo Gomez',
            role: 'developer',
            avatar: 'Ellipse 46.png',
        },
    ];
    saveUsers(defaultUsers);
};

export const initializeProjects = (): void => {
    const defaultProjects: Project[] = [
        {
            id: "1",
            name: 'Landing Page',
            description: 'Aplicación para gestionar proyectos',
            status: 'enabled',
            createdAt: formatDate(new Date().toISOString()),
            projectManager: "101",
            assignedTo: "102",
        },
        {
            id: "2",
            name: 'E-Commerce Shop',
            description: 'Aplicación para gestionar proyectos',
            status: 'enabled',
            createdAt: formatDate(new Date().toISOString()),
            projectManager: "101",
            assignedTo: "102",
        },
        {
            id: "3",
            name: 'CRM Linkroom',
            description: 'Aplicación para gestionar proyectos',
            status: 'completed',
            createdAt: formatDate(new Date().toISOString()),
            projectManager: "101",
            assignedTo: "102",
        },
    ];
    saveProjects(defaultProjects);
};