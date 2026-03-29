namespace backend.DTOs;

public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = "To Do";
    public string Priority { get; set; } = "Medium";
}
