namespace backend.DTOs;

public class UpdateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
}
