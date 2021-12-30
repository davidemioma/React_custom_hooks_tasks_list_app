import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTasks } = useHttp();

  const enterTaskHandler = async (taskText) => {
    const transformTask = (data) => {
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    };

    sendTasks(
      {
        url: "https://react-api-2-6178e-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      transformTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
