using Microsoft.AspNetCore.Mvc.RazorPages;
using Workshop.Web.Sections;

namespace Workshop.Web.Pages;

public sealed class IndexModel : PageModel
{
    public CardSection Section { get; } = new(
        "Team resources",
        [
            new("Start a task", "Turn a request into a bounded specification.", "/?topic=specification"),
            new("Check a change", "Use tests and evidence before accepting a patch.", "/?topic=verification"),
            new("Share a pattern", "Package a repeatable workflow as a skill.", "/?topic=skills"),
        ]);

    public void OnGet()
    {
        var errors = CardSectionValidator.Validate(Section);
        if (errors.Count > 0)
        {
            throw new InvalidOperationException(string.Join(" ", errors));
        }
    }
}
