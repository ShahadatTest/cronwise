namespace Workshop.Web.Sections;

public static class CardSectionValidator
{
    public static IReadOnlyList<string> Validate(CardSection section)
    {
        ArgumentNullException.ThrowIfNull(section);
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(section.Heading) || section.Heading.Trim().Length > 80)
        {
            errors.Add("Heading must contain 1-80 characters after trimming.");
        }

        if (section.Cards is null || section.Cards.Count is < 1 or > 6)
        {
            errors.Add("A section must contain 1-6 cards.");
        }

        if (section.Cards is not null)
        {
            foreach (var card in section.Cards)
            {
                if (card is null || string.IsNullOrWhiteSpace(card.Title))
                {
                    errors.Add("Each card must have a title.");
                }

                if (card is not null && !IsLocalUrl(card.Url))
                {
                    errors.Add("Card URLs must be local paths, not external or protocol-relative URLs.");
                }
            }
        }

        return errors;
    }

    private static bool IsLocalUrl(string url) =>
        !string.IsNullOrEmpty(url)
        && url.StartsWith('/')
        && !url.StartsWith("//", StringComparison.Ordinal)
        && !url.Contains('\\')
        && !url.Any(char.IsControl);
}
