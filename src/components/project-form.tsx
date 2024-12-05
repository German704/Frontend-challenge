import { useEffect, useState } from "react";
import { Project } from "../entities/project";
import { getUsers } from "../utils/fakeBackend";
import { User } from "../entities/user";

export interface FormData {
  name: string;
  description: string;
  projectManager: string;
  assignedTo: string;
  status: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  data?: Project;
}

export const ProjectForm = ({ onSubmit, data }: Props) => {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: data? data.name : '' ,
    description: data? data.description : '',
    projectManager: data? data.projectManager : '',
    assignedTo: data? data.assignedTo : '',
    status: data? data.status : 'enabled',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = "Project name must be at least 3 characters long.";
    }

    if (!formData.description) {
      newErrors.description = "Description is required.";
    }

    if (!formData.projectManager) {
      newErrors.projectManager = "Project manager is required.";
    }

    if (!formData.assignedTo) {
      newErrors.assignedTo = "Assigned user is required.";
    }

    if (!formData.status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  useEffect(() => {
    setUsers(getUsers());
  }, [])
  
  return (
    <form action="" onSubmit={handleSubmit}
      className="w-full p-4 md:p-7 flex flex-col flex-wrap gap-5 items-start">
      <div className="w-full ">
        <label htmlFor="name" className="font-sans text-[#262626]">
          Project name
        </label>
        <input id="name" name="name" type="text" defaultValue={data && data.name} onChange={onChange}
          className="font-sans text-[#BFBFBF] w-full border border-[#D9D9D9] rounded p-2 " />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="w-full ">
        <label htmlFor="description" className="font-sans text-[#262626]">
          Description
        </label>
        <input id="description" name="description" type="text" defaultValue={data && data.description} onChange={onChange}
          className="font-sans text-[#BFBFBF] w-full border border-[#D9D9D9] rounded p-2 " />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div className="w-full ">
        <label htmlFor="projectManager" className="font-sans text-[#262626]">
          Project manager
        </label>
        <select name="projectManager" id="projectManager" onChange={onChange} value={formData.projectManager}
          className="w-full text-[#BFBFBF] border border-[#D9D9D9] rounded p-2">
          <option value="" hidden >Select a person</option>
          {
            users.map(user => {
              if (user.role === "project manager")
                return (
                  <option key={user.id} value={user.id}>{user.name}</option>
                )
            })
          }
        </select>
        {errors.projectManager && <p className="text-red-500 text-sm">{errors.projectManager}</p>}
      </div>

      <div className="w-full ">
        <label htmlFor="assignedTo" className="font-sans text-[#262626]">
          Assigned to
        </label>
        <select name="assignedTo" id="assignedTo" onChange={onChange} value={formData.assignedTo}
          className="w-full text-[#BFBFBF] border border-[#D9D9D9] rounded p-2">
          <option value="" hidden >Select a person</option>
          {
            users.map(user => {
              if (user.role === "developer")
                return (
                  <option key={user.id} value={user.id} >{user.name}</option>
                )
            })
          }
        </select>
        {errors.assignedTo && <p className="text-red-500 text-sm">{errors.assignedTo}</p>}
      </div>

      <div className="w-full ">
        <label htmlFor="status" className="font-sans text-[#262626]">
          Status
        </label>
        <select name="status" id="status" onChange={onChange} defaultValue={data && data.status}
          className="w-full text-[#BFBFBF] border border-[#D9D9D9] rounded p-2">
          <option value="enabled" >Enabled</option>
          <option value="in progress" >In progress</option>
          <option value="completed" >Completed</option>
          <option value="cancelled" >Cancelled</option>
        </select>
        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
      </div>

      <button type="submit" className="rounded bg-[#F5222D] px-2 py-1 text-white">
        {!data ? "Create project" : "Saves changes"}
      </button>
    </form>
  )
}
