using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItemDto>>> GetTasks()
    {
        var tasks = await _context.Tasks.ToListAsync();
        return Ok(tasks.Select(t => new TaskItemDto
        {
            Id = t.Id,
            Title = t.Title,
            Status = t.Status,
            Priority = t.Priority
        }));
    }

    // GET: api/tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskItemDto>> GetTask(string id)
    {
        var taskItem = await _context.Tasks.FindAsync(id);

        if (taskItem == null)
        {
            return NotFound();
        }

        return new TaskItemDto
        {
            Id = taskItem.Id,
            Title = taskItem.Title,
            Status = taskItem.Status,
            Priority = taskItem.Priority
        };
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskItemDto>> PostTask(CreateTaskDto createDto)
    {
        var taskItem = new TaskItem
        {
            Title = createDto.Title,
            Status = createDto.Status,
            Priority = createDto.Priority
        };

        _context.Tasks.Add(taskItem);
        await _context.SaveChangesAsync();

        var taskDto = new TaskItemDto
        {
            Id = taskItem.Id,
            Title = taskItem.Title,
            Status = taskItem.Status,
            Priority = taskItem.Priority
        };

        return CreatedAtAction(nameof(GetTask), new { id = taskItem.Id }, taskDto);
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTask(string id, UpdateTaskDto updateDto)
    {
        var taskItem = await _context.Tasks.FindAsync(id);
        if (taskItem == null)
        {
            return NotFound();
        }

        taskItem.Title = updateDto.Title;
        taskItem.Status = updateDto.Status;
        taskItem.Priority = updateDto.Priority;

        _context.Entry(taskItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TaskItemExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(string id)
    {
        var taskItem = await _context.Tasks.FindAsync(id);
        if (taskItem == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(taskItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TaskItemExists(string id)
    {
        return _context.Tasks.Any(e => e.Id == id);
    }
}
