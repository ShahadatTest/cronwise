namespace Workshop.Web.Sections;

public sealed record LinkCard(string Title, string Summary, string Url);

public sealed record CardSection(string Heading, IReadOnlyList<LinkCard> Cards);
