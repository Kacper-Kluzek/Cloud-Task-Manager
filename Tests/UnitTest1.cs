using backend.Models;
using Xunit;

namespace Tests;

public class UnitTest1
{
    [Fact]
    public void NewTask_ShouldNotBeCompleted()
    {
        // 1. Tworzenie obiektu (Arrange)
        var task = new CloudTask();

        // 2. Nadanie nazwy (Act)
        task.Name = "Przetestować bezpiecznik";

        // 3. Weryfikacja (Asercja) (Assert)
        Assert.False(task.IsCompleted);
    }
}
