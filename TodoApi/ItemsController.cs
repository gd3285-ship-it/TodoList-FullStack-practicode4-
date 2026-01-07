using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi;

[ApiController]
[Route("items")]
public class ItemsController : ControllerBase
{
    private readonly ToDoDbContext _context;

    public ItemsController(ToDoDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Item>>> GetItems()
    {
        return await _context.Items.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Item>> AddItem(Item item)
    {
        _context.Items.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateItem(int id, Item item)
    {
        if (id != item.Id) return BadRequest();
        var existingItem = await _context.Items.FindAsync(id);
        if (existingItem == null) return NotFound();
        
        existingItem.IsComplete = item.IsComplete;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var item = await _context.Items.FindAsync(id);
        if (item == null) return NotFound();
        _context.Items.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}