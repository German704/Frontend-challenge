import { FormData, ProjectForm } from "../components/project-form";
import { Header } from "../components/header";
import { PageContainer } from "../components/page-container";
import { addProject } from "../utils/fakeBackend";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate =  useNavigate();
  function handleSubmit(value: FormData) {
    addProject(value);
    navigate(-1);
  }
  return (
    <>
      <Header title="Add project" goBack />
      <PageContainer classname="md:w-[40%] md:min-w-[500px]">
        <ProjectForm onSubmit={handleSubmit}/>
      </PageContainer>
    </>
  )
}