import { Header } from "../components/header";
import { CardList } from "../components/card-list";
import { PageContainer } from "../components/page-container";
import { deleteProject, getProjectsWithUsers, subscribe } from "../utils/fakeBackend";
import { User } from "../entities/user";
import { useEffect, useMemo, useState } from "react";
import { ProjectDetail } from "../entities/project";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const filteredProjects = useMemo(
    () =>
      projects.filter(({ project }) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [projects, searchTerm]
  );

  const totalPages = useMemo(() => Math.ceil(filteredProjects.length / itemsPerPage), [filteredProjects.length]);
  const currentProjects = useMemo(
    () => filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredProjects, currentPage, itemsPerPage]
  );
  const handleDelete = (id: string) => {
    deleteProject(id);
    setProjects((prev) => prev.filter(({ project }) => project.id !== id));
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchProjects = () => {
      setProjects(getProjectsWithUsers());
    };
    fetchProjects();

    const handleStorageChange = () => {
      setProjects(getProjectsWithUsers());
    };


    const unsubscribe = subscribe(fetchProjects);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [searchTerm]);


  return (
    <>
      <Header title="My projects" />
      <PageContainer classname="md:w-[95%]">
        <div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-1"
          />
        </div>
        <div>
          <div className="hidden md:grid grid-cols-9 bg-[#00000005] border border-[#D9D9D9] p-4">
            <div className="col-span-3">
              <h1 className="font-sans font-semibold text-[#000000D9]">Project info</h1>
            </div>
            <div className="col-span-2">
              <h1 className="font-sans font-semibold text-[#000000D9]">Project manager</h1>
            </div>
            <div className="col-span-2">
              <h1 className="font-sans font-semibold text-[#000000D9]">Assigned to</h1>
            </div>
            <div>
              <h1 className="font-sans font-semibold text-[#000000D9]">Status</h1>
            </div>
            <div className="flex justify-center">
              <h1 className="font-sans font-semibold text-[#000000D9]">Action</h1>
            </div>
          </div>

          {currentProjects.length ?
            currentProjects.map(item =>
            (
              <CardList
                project={item.project}
                projectManager={item.projectManager as User}
                assignedTo={item.assignedTo as User}
                onDelete={() => handleDelete(item.project.id)}
                key={item.project.id}
              />
            )
            )
            :
            <div className="p-3 flex justify-center">
              <h1 className="font-sans text-[#000000A6]" >No projects available at the moment.</h1>
            </div>
          }
        </div>
        <div className="flex justify-center items-center my-4 gap-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
      </PageContainer>
    </>
  )
}