using Workshop.Web.Sections;

namespace Workshop.Web.Tests;

public sealed class CardSectionValidatorTests
{
    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public void RejectsBlankHeadings(string heading)
    {
        var section = new CardSection(heading, [new("Title", "Summary", "/")]);

        Assert.Contains(CardSectionValidator.Validate(section), error => error.StartsWith("Heading"));
    }

    [Fact]
    public void RejectsOversizedHeadings()
    {
        var section = new CardSection(new string('a', 81), [new("Title", "Summary", "/")]);

        Assert.Contains(CardSectionValidator.Validate(section), error => error.StartsWith("Heading"));
    }

    [Theory]
    [InlineData(0)]
    [InlineData(7)]
    public void RejectsCardCountsOutsideTheAllowedRange(int count)
    {
        var cards = Enumerable.Range(0, count).Select(_ => new LinkCard("Title", "Summary", "/")).ToArray();

        Assert.Contains(
            CardSectionValidator.Validate(new("Heading", cards)),
            error => error.Contains("1-6 cards"));
    }

    [Theory]
    [InlineData("https://example.invalid/")]
    [InlineData("//example.invalid/")]
    [InlineData("/\\example.invalid/")]
    [InlineData("/\nexample.invalid/")]
    public void RejectsNonLocalOrAmbiguousUrls(string url)
    {
        var section = new CardSection("Heading", [new("Title", "Summary", url)]);

        Assert.Contains(CardSectionValidator.Validate(section), error => error.StartsWith("Card URLs"));
    }

    [Fact]
    public void ReportsMultipleContentErrorsTogether()
    {
        var section = new CardSection(" ", [new(" ", "Summary", "//example.invalid/")]);

        Assert.Equal(3, CardSectionValidator.Validate(section).Count);
    }

    [Theory]
    [InlineData(1)]
    [InlineData(6)]
    public void AcceptsValidBoundaryCountsWithoutChangingContent(int count)
    {
        var cards = Enumerable.Range(0, count).Select(_ => new LinkCard("Title", "Summary", "/?topic=demo")).ToArray();
        var section = new CardSection("Heading", cards);

        Assert.Empty(CardSectionValidator.Validate(section));
        Assert.Equal(count, section.Cards.Count);
        Assert.All(section.Cards, card => Assert.Equal("/?topic=demo", card.Url));
    }
}
