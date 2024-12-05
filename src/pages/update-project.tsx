import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/header";
import { PageContainer } from "../components/page-container";
import { FormData, ProjectForm } from "../components/project-form";
import { findProjectById, updateProject } from "../utils/fakeBackend";
import { isError } from "../utils/is-error";

export default function UpdateProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = findProjectById(id as string)

  function handleSubmit(value: FormData) {
    if (id) {
      updateProject(id, value)
      navigate(-1);
    }
  }
  return (
    <>
      <Header title="Edit project" goBack />
      <PageContainer classname="md:w-[40%] md:min-w-[500px]">
        {
          !isError(project) ?
            <ProjectForm onSubmit={handleSubmit} data={project} />
            :
            <div className="p-3 flex justify-center">
              <h1 className="font-sans text-[#000000A6]" >Project Not Fount</h1>
            </div>
        }
      </PageContainer>
    </>
  )
}