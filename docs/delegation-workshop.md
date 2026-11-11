# Structured delegation workshop

**Audience:** developers already using Copilot, primarily in Visual Studio 2026.
**Default format:** 120 minutes, with a separate 60-minute extension lab.
**Outcome:** delegate a bounded piece of work, explain its context and constraints,
and produce evidence sufficient for a human to accept or reject the result.

This is not an autocomplete tour. Visual Studio is the main workspace. The CLI,
Copilot app, VS Code, and GitHub are used when they add a capability, not to cycle
through every product UI.

## What is ready, and what still needs preparation

| Resource | State | Use |
| --- | --- | --- |
| [Razor/.NET companion](workshop/companion/README.md) | Runnable local starter | Primary Visual Studio coding and test exercise |
| [Synthetic scenarios](workshop/scenarios.md) and [fixtures](workshop/assets/) | Prepared input | Story refinement, design grounding, security discussion |
| [Prompt cards](workshop/prompts.md) | Prepared input | Checkpoint-based delegation and review |
| [Support and governance](workshop/support-and-governance.md) | Documentation-checked, not a UI rehearsal | Product boundaries, MCP setup, troubleshooting |
| Existing JavaScript service and issues | Runnable practice backlog | Fast bounded bug fixes; no .NET migration required |
| Custom instructions, agents, and skills | Open preparation work in #22-#29 | Build and rehearse the actual profiles before the event |
| Connected MCP services, Azure Boards, cloud sessions, scanner results | External prerequisites | Never imply they are configured by cloning this repo |

The new starter lives under `docs/workshop/companion` to keep it separate from the
existing Node service and the A-F exercises. It contains a card section, not the
notice section participants will add. There are no production endpoints, content
systems, identity integrations, or business records.

Local, uncommitted materials are not visible to a cloud agent. Review and publish
the intended preparation assets to the workshop branch before rehearsing cloud
work. Do not publish unrelated edits or move the legacy reset tag as a side effect.

## Preparation order

1. Record the installed Visual Studio version, release channel, Copilot access,
   workloads, and intended repository hosting. Check
   [current support](workshop/support-and-governance.md#surface-check) rather than
   assuming a patch update enables every feature.
2. Open `docs/workshop/companion/Workshop.slnx`. Build, run, and discover its tests
   in Test Explorer. Prepare the notice-section story and its approved scope.
3. Complete and rehearse #22, #26, and #27. Keep required Visual Studio rules in
   `copilot-instructions.md`; do not rely on `AGENTS.md` alone.
4. Complete #23-#25 and one skills issue. Verify the actual tool names in Visual
   Studio. The reviewer consumes test evidence; the test writer/runner produces it.
5. Connect only approved demo MCP services, starting read-only. Have the synthetic
   fixtures ready when a tenant, client, license, or network prerequisite fails.
6. Prepare one reviewed patch and its test output as a fallback. PR #30 is a
   candidate for the HTTP review segment, but it had no reported checks when this
   flow was prepared; do not present it as validated without rehearsing it.
7. Prepare two distinct workspaces and an approved cloud repository only for the
   extension segment. Settle write permissions and data scope before the event.

## Outcome and backlog map

| Outcome | Current repository issues | Track |
| --- | --- | --- |
| Readiness and supported Visual Studio path | #31, #32, #20 | Preparation |
| Goal, context, constraints, specification, checkpoints | #23, #33; #39 for the ambiguous request | Core / extension |
| Shared standards and discovery | #22, #26, #27 | Preparation, demonstrated in core |
| Native Razor change and meaningful unit tests | #33, supported by #25 and #29 | Core |
| Repeatable website expertise | #34; #28 is the cron alternative | Preparation / extension |
| Evidence-backed review and bounded security remediation | #24, #38 | Core |
| Grounding with Figma, GitHub, Azure, and Kontent.ai | #36 | Gated core example / extension |
| Azure Boards stories and actual code-host boundaries | #35 | Core explanation / prepared cloud extension |
| Subagents, background work, worktrees, integration owner | #37 | Extension |
| Reusable HL7 integration design | #40 | Timeboxed extension |
| Fast Node fallback | #11, #15; #12 and #14 for deeper investigation | Core fallback / extension |

The advanced definitions and current numbers live in
[backlog.json](workshop/backlog.json). Labels `workshop:prep`, `workshop:core`, and
`workshop:extension` make the issue list navigable. These are preparation and
exercise tasks, not an instruction to auto-assign them to Copilot. In another fork,
resolve definitions by title/key rather than copying these issue numbers. The
legacy `demo:issues` command still manages only A-F.

## Run of show: 120 minutes

| Time | Segment | Surface | Observable result |
| --- | --- | --- | --- |
| 00-10 | Delegation contract and trust problem | Visual Studio | One goal, file budget, exclusions, checkpoints, and definition of done |
| 10-30 | Raw story to reviewed specification | Visual Studio Plan agent, or Ask/read-only fallback | Assumptions separated from unanswered questions; a saved, reviewed plan |
| 30-45 | Instructions and standards | Visual Studio; brief CLI comparison | Applicable instructions identified, not merely files created |
| 45-65 | Bounded Razor change with unit tests | Visual Studio Agent + Test Explorer | Notice section patch; focused tests; existing tests remain green |
| 65-80 | Grounding and MCP | Visual Studio; conditional Figma client | Source evidence distinguished from inference; one read-only fetch |
| 80-105 | Verification, review, security, and permissions | Visual Studio review + test runner; optional GitHub | Findings tied to evidence; one scoped correction; human go/no-go |
| 105-115 | Delegation beyond one session | Azure Boards + local workflow; cloud example if prepared | Traceable story handoff; parallelism and hosting boundaries explained |
| 115-120 | Team adoption | Discussion | A small workflow to adopt, its owner, and its acceptance gate |

If only 60 minutes are available, use 10 minutes for specification, 10 for
instructions, 15 for a bounded change and tests, 15 for review/security, and 10 for
MCP and delegation boundaries. Use prepared evidence for integrations; do not claim
that all hands-on scenarios fit in one hour.

## Drive one unit of work end to end

### 1. Establish the contract before selecting tools

Use the fictional **notice section** story in
[scenarios](workshop/scenarios.md#notice-section). It resembles a repeatable website
section pattern without using a real project's content model or design.

Use [Specification](workshop/prompts.md#specification) in Plan mode. If the Plan
picker is unavailable, use Ask or a verified read-only planner. Do not treat a
prompt saying "read-only" as permission enforcement.

Ask the agent to improve the request: which acceptance criteria are testable,
which statements are assumptions, and which questions block implementation?
The facilitator answers as the fictional product owner. Review the resulting
specification rather than approving the agent's first interpretation.

**Checkpoint 1:** agree on semantics, touched files, exclusions, tests, and done
criteria. Stop if the design brief and content model disagree.

### 2. Load team standards, then constrain the change

Show the distinction between always-loaded guidance, path-specific rules, a
selected agent role, and a skill activated for a task. Use prepared profiles from
the customization issues, or author one small skill as a participant exercise.

The shared rules should include Razor's normal encoding, typed section models,
the existing test framework, preserving unrelated changes, and no CMS writes.
Match the companion's paths, not only the original `src/**/*.js`.

**Checkpoint 2:** inspect References and Tools in the actual Visual Studio session.
A valid Markdown file does not prove that a client loaded it.

### 3. Implement with evidence, not an open-ended conversation

Use [Bounded implementation](workshop/prompts.md#bounded-implementation). Add the
new notice model, validation, rendering, and small tests; do not generalize the
whole site into a plugin framework. The existing card section remains intact.

Have the agent propose the regression cases before modifying implementation.
Review the cases against the approved acceptance criteria. Run the focused tests,
then the companion suite and build. Visual Studio's test tooling is the primary
experience; command-line equivalents make the evidence reproducible.

**Checkpoint 3:** if the agent needs another dependency, another layer, or an
unlisted file, stop and revise the contract before granting broader scope.

### 4. Review with distinct roles

Use [Evidence review](workshop/prompts.md#evidence-review) with the custom reviewer
or Visual Studio's local review workflow. The author runs tests; a verifier checks
the run and commit/diff association; the reviewer evaluates correctness and scope;
the human decides whether to accept the result.

Ask whether empty content is handled, the heading is accessible, invalid severity
is rejected, and the card section still behaves the same. Investigate supported
findings; do not request a made-up finding or an arbitrary cosmetic rejection.

**Checkpoint 4:** inspect the full diff, test report, changed-file list, and any
remaining uncertainty. Missing tests, a successful build alone, and an agent's
"all good" summary are not equivalent evidence.

### 5. Demonstrate security and bounded remediation

Use [Scanning triage](workshop/prompts.md#scanning-triage) and the clearly
illustrative [scan fixture](workshop/assets/scanning-example.json). For a live
scanner demonstration, substitute one authorized, reproducible alert and capture
its rule, location, data flow, severity, and baseline.

Explain the difference between code review, a security agent's analysis, a
scanner finding, and an Autofix suggestion. Do not inject a live vulnerability
into the service just to make the demonstration work.

**Checkpoint 5:** approve one remediation scope. Add a regression, rerun the
relevant scanner and tests, then inspect whether the original finding is resolved
without disabling the rule. With a fixture only, stop at triage and a proposed
patch; do not claim a real scan has been remediated.

## Grounding without granting unnecessary authority

Start with the [read-only MCP example](workshop/assets/visual-studio.mcp.example.json).
It is a passive sample, not an automatically discovered configuration. Replace
the placeholder organization and authenticate locally only after permission is
approved.

For each fetch, show which server, environment, resource/version, and tool produced
the evidence. Ask the agent to mark inferences explicitly. Tool output, a design
annotation, or a story comment can contain untrusted instructions; none changes
the approved scope or authorizes writes.

| Source | Demonstration | Fallback |
| --- | --- | --- |
| GitHub | Read a bounded issue or PR and its checks | Existing issue plus prepared diff/test report |
| Azure Boards | Read a synthetic story and map acceptance criteria to tests | [Work-item fixture](workshop/assets/work-item.json) |
| Figma | Fetch design context for one approved section, then implement Razor | [Design brief](workshop/assets/design-brief.json), explicitly not a Figma response |
| Azure | Inspect named demo-resource metadata with restricted identity | Sanitized, synthetic metadata described in the scenario |
| Kontent.ai | Read a demo content type and compare it with the typed model | The fixture's content contract; no publish operation |

Follow [setup and governance](workshop/support-and-governance.md#mcp-setup-and-governance).
Figma's remote service restricts clients to its catalog. Use an approved client
such as VS Code if the actual Visual Studio integration cannot be rehearsed;
never work around that restriction.

## Azure Boards is the source of work, not necessarily the source of code

Keep three cases distinct:

| Work tracking / code hosting | Path |
| --- | --- |
| Azure Boards + GitHub code, integration enabled | Review story content for repository visibility, then send the selected story to the connected GitHub cloud agent |
| Azure Boards + GitHub code, no integration | Read the story through MCP or use a sanitized handoff; local implementation, then a reviewed GitHub PR |
| Azure Boards + Azure Repos | Read the story through MCP, implement locally/in isolated workspaces, use Azure Pipelines and an Azure Repos PR |

The connected cloud path can copy story text and recent comments into the GitHub
PR. Inspect that content and repository visibility before initiating the handoff.
Do not copy private work items into this public demo repo.

Keep the work-item reference, approved specification version, branch/commit,
test evidence, and PR together. Proposed updates to acceptance criteria or story
status require the product owner's decision; the agent does not own the story.

## Extension lab: 60 minutes

Choose one route rather than starting every integration:

- **Design and repeatable sections:** read one approved Figma node and demo CMS
  type; use an add-section skill; implement and review the notice section in Razor.
- **Parallel work:** give one worker a pure validation task and another a
  documentation task with disjoint files. Use separate worktrees, no concurrent
  writes to one checkout, and an integration owner who runs the combined suite.
- **Cloud handoff:** send a sanitized Azure Boards story to a connected GitHub
  repository; show the session log, PR, checks, and human review. Use prepared
  results instead of waiting on a session spinner.
- **Ambiguous business request:** refine the fictional daily activity log into
  decisions, acceptance criteria, exclusions, and a small implementation plan.
- **HL7 listener:** produce a timeboxed architecture decision and local spike
  plan, not a production integration or a claim of clinical suitability.

Prompts and source boundaries are in [scenarios](workshop/scenarios.md) and
[prompt cards](workshop/prompts.md).

## Acceptance gate for the workshop itself

| Requested topic | Required proof |
| --- | --- |
| Delegation and planning | A participant can explain goal, context, constraints, checkpoints, and done criteria |
| Standards | The intended rules are shown loaded in the actual client |
| MCP grounding | One read-only call is traced to its source, or the fallback is labeled honestly |
| Agents and skills | A role and a reusable procedure are demonstrated as different mechanisms |
| Tests and review | A scoped patch has meaningful passing tests and a reviewed diff |
| Security and governance | The team can distinguish approvals, identity permissions, sandboxing, scanner results, and human acceptance |
| Multi-agent / Azure Boards | The handoff preserves story traceability and reflects the actual code host |

Capture the tested Visual Studio build and permissions, not just a slide claiming
"latest". Leave the audience with one delegation contract and one review evidence
template they can apply to their next story.
