import { useEffect, useRef, useState } from "react";
import { User } from "../entities/user";
import { Project } from "../entities/project";
import DeleteConfirmationModal from "./confirm-modal";
import Avatar from "./avatar";

interface Props {
  project: Project;
  assignedTo: User;
  projectManager: User;
  onDelete: (id: string) => void;
}
export const CardList = ({ project, assignedTo, projectManager, onDelete }: Props) => {
  const [hidden, setHidden] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setHidden(true);
    }
  };

  const handleDelete = () => {
   setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-wrap justify-between gap-1 md:grid md:grid-cols-9 border-b-[1px] border-[#D9D9D9] px-4 py-3">
      <section className="md:w-full md:col-span-8 flex justify-between flex-col md:flex-row items-center gap-1">
        <div className="w-full md:w-[37.5%] flex flex-col justify-center">
          <h1 className="font-sans text-sm text-[#000000A6]">{project.name}</h1>
          <span className="font-sans text-[11px] text-[#00000073]">Creation date: {project.createdAt}</span>
        </div>

        <div className="w-full md:w-[25%] hidden md:flex justify-start gap-2 items-center">
         { projectManager.avatar?
          <img src={`../${projectManager?.avatar}`} alt=""
            className="w-7 h-7 rounded-full" />
            :
            <Avatar name={projectManager.name} />
          }
          <h2 className="font-sans text-xs text-[#00000073]">{projectManager?.name}</h2>
        </div>

        <div className="w-full md:w-[25%] flex justify-start gap-2 items-center">
          { assignedTo.avatar?
            <img src={`../${assignedTo?.avatar}`} alt=""
            className="w-7 h-7 rounded-full" />
            :
            <Avatar name={assignedTo.name} />
            }
          <h2 className="font-sans text-xs text-[#00000073]">{assignedTo?.name}</h2>
        </div>

        <div className="w-full md:w-[12.5%] hidden md:flex justify-start gap-2 items-center">
          <h1 className="font-sans text-xs text-[#00000073]">{project.status}</h1>
        </div>
      </section>
      <div className="flex justify-center relative">
        <button className="px-4 py-2 flex justify-center" onClick={() => setHidden(!hidden)}>
          <img src="../Vector.png" alt="" />
        </button>
        <div ref={dropdownRef} className={`${hidden && "hidden"} absolute w-24 flex flex-col items-start justify-center gap-2 p-2 md:top-1 top-5 right-10 md:right-[106px] border rounded bg-[#ffff] shadow`}>
          <a href={`/projects/update/${project.id}`} className="rounded bg-[#F5222D] px-2 py-1 text-white w-full text-center">
            Edit
          </a>
          <button type="submit" onClick={() => handleDelete()} className="rounded bg-[#F5222D] px-2 py-1 text-white w-full text-center">
            Delete
          </button>
        </div>
      </div>
      <DeleteConfirmationModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} onConfirm={() => onDelete(project.id)}/>
    </div>
  )
}
