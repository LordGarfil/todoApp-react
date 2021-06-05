export function add(e) {
  e.preventDefault();
  const form = document.querySelector("#todoForm");
  const todoData = new FormData(form);
  console.log(todoData.get("priority"));
}

export const todoPriority_style = (priority) => {
    let style;
    if (priority.toUpperCase() === "LOW") {
      style = "badge-danger";
    } else if (priority.toUpperCase() === "MEDIUM") {
      style = "badge-warning";
    } else if (priority.toUpperCase() === "HIGH") {
      style = "badge-success";
    }
  
    return style;
  };