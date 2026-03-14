namespace backend.Models;

public class TaskItem
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = "To Do";
    public string Priority { get; set; } = "Medium";
}
