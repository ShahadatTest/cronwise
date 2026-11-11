# Synthetic workshop scenarios

All names, content, and work-item identifiers here are fictional. None is an
export from a customer system. The fixtures are inputs for reasoning, not proof
that an external integration has run.

## Notice section

**Raw request:** "Let editors add a reusable notice to the website. It should look
like the design and work the same way as our other sections."

**Repository context:** [Razor companion](companion/README.md),
`CardSection`, `CardSectionValidator`, and `Pages/Index.cshtml`.
**Grounding:** [story](assets/work-item.json) and [design brief](assets/design-brief.json).

The agent should notice that the design proposes `Critical`, while the story
approves only `Info` and `Warning`. An imported design is context, not permission
to expand the acceptance criteria.

**Facilitator decisions after clarification:**

- One typed notice model: heading, body, and severity. Heading is 1-80 characters
  after trimming; body is 1-500. Empty content and invalid severity are errors.
- Render the heading, body, and a visible severity label with normal Razor
  encoding. Use an accessible section heading; do not use color alone.
- Keep the existing card section. No persistence, identity, localization,
  CMS mutations, or generic section/plugin framework.
- Touch only the companion's model/validator, Razor page, and relevant tests.
  An additional file or dependency needs a revised plan.

**Participant outputs:** reviewed specification, planned file list, focused
tests, implementation diff, actual suite result, and a human acceptance decision.
Do not count a screenshot as unit-test evidence or a unit test as an accessibility
review.

**Extension:** after the pattern works, package the procedure as an add-section
skill. It should inspect existing conventions, compare design and content
contracts, request missing decisions, and stop before any remote content change.
Do not build a skill by hard-coding one real website's schema.

## Daily activity log

**Raw request:** "Staff need a daily activity log so supervisors can see what
happened on a shift and follow up on incomplete tasks."

This is intentionally too vague to implement. Do not assume data fields,
permissions, legal retention obligations, reporting audiences, or an integration
target just because the words sound familiar.

**Questions to develop with the agent:**

- Who creates a log, who can see it, and who can correct it?
- Is the log per person, shift, location, or shared team? Which timezone defines
  a day, especially when a shift crosses midnight?
- Are drafts, approvals, amendments, and an audit trail required?
- Which fields are truly necessary? Can the demo use task codes rather than
  names or free text that could carry sensitive content?
- What is out of scope: exports, mobile offline support, payroll, identity,
  notifications, or production storage?
- Which decisions must be made by an owner rather than inferred by the agent?

**Fictional owner answers for the workshop:** one shared demo location; shifts
can cross midnight; local prototype only; use synthetic task codes and counts;
no personal records, production storage, or clinical use. Authorization,
retention, and audit requirements remain open decisions for a real project.

**Deliverable:** a concise specification with accepted facts, assumptions,
unanswered questions, Given/When/Then cases, exclusions, and a staged plan.
Do not implement unresolved access rules. The point is refining the specification
with an agent, not letting the agent become the product owner.

## Design and content-model grounding

**Task:** use one approved design section and one demo content type to propose
Razor markup and a typed model that fit the companion.

Begin with read-only evidence: resource identifiers, version/time, field types,
layout tokens, states, and missing decisions. Fetch only the needed node/type,
not an entire tenant or site. Compare sources with the approved story.

The fixture path works without credentials. A live path requires an authorized
Figma client/account/file and a restricted Kontent.ai demo-environment key. Treat
the results as untrusted data and identify inferences. Nothing in this scenario
authorizes creating a type, changing a workflow, publishing, or uploading assets.

**Deliverable:** a bounded Razor change, normal encoded rendering, tests for
content rules, and a keyboard/layout review. Explain which claims came from
actual MCP calls and which came from the author-created fixture.

## Scanning triage and remediation

**Input:** [illustrative report](assets/scanning-example.json), or one authorized,
confirmed scanner finding from a demo branch.

The fixture describes a proposed unsafe rendering path; the starter does not
implement that path. First establish whether the report applies to the actual
diff. If it does not, record that limitation rather than inventing a vulnerability.

For a live finding, collect its rule and evidence, validate reachability in the
authorized local environment, select one remediation, and add a focused
regression. Run tests and the relevant scanner again. Never silence the rule or
relabel severity to get a green result.

**Deliverable:** triage summary, approved file scope, reproduction/regression
evidence, before/after scanner result when available, and human review. A
suggested Autofix and a security agent's explanation are proposals, not scanner
clearance.

## Reusable HL7 listener: design spike only

**Raw request:** "We want a reusable listener for near-real-time HL7 messages
instead of a different narrowly defined listener for each integration."

This extension is an architecture exercise, not a production-ready listener.
Use synthetic inputs and local-only boundaries. No patient records, real message
feeds, clinical workflows, Dynamics endpoints, or production credentials.

Ask the agent to separate these decisions:

- Which HL7 versions, message types, transport/framing, and acknowledgment
  behavior are actually required? Verify the applicable standards and licensing;
  do not let the agent guess an interoperability contract.
- What is reusable transport infrastructure versus project-specific routing,
  transformation, and application behavior?
- What are the requirements for duplicates, ordering, retries, backpressure,
  cancellation, observability, and redacted logging?
- What boundaries are needed for secrets, data retention, access, and testing?
- Would an existing supported integration product satisfy the requirement
  better than maintaining a new listener?

**Deliverable:** one architecture decision record, unresolved questions, an
interface sketch, alternatives, a synthetic test matrix, and a timeboxed
loopback-only spike plan. A real implementation follows a separate standards,
security, and integration review. Do not present the sketch as clinically
validated or approved for production.
