using backend.Models;
using Xunit;

namespace Tests;

public class UnitTest1
{
    [Fact]
    public void NewTask_ShouldNotBeCompleted()
    {
        var task = new TaskItem();

        task.Title = "Przetestować bezpiecznik";

        Assert.Equal("To Do", task.Status);
    }
}
