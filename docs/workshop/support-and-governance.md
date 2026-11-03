# Surface support, setup, and governance

**Reference snapshot:** November 2, 2026, US Central (November 3 UTC).
Documentation verification is not a successful sign-in, configured MCP tenant,
or Visual Studio UI rehearsal. Record the actual build and test each path before
the event. The release page listed Visual Studio **18.11.3, October 29, 2026** as
the latest stable servicing release at this check; recheck before asking the team
to update.

## Surface check

| Capability | Documented Visual Studio path | Workshop decision |
| --- | --- | --- |
| Agent mode and tool approvals | Agent picker and Tools panel | Primary implementation path; inspect permissions and diffs |
| Plan agent | Read-only exploration, saved plan, explicit implementation handoff | Primary specification path; Ask/read-only fallback if unavailable |
| Repository instructions | `.github/copilot-instructions.md` | Put required shared rules here |
| Path-specific instructions | `.github/instructions/**/*.instructions.md` for Chat | Match both Node and companion paths |
| `AGENTS.md` | GitHub's support matrix does not list it for Visual Studio Chat | Demonstrate in CLI/cloud or reference it explicitly; no automatic-discovery claim |
| Code-review instructions | Visual Studio review lists repository-wide instructions; GitHub review has broader support | Keep essential review rules in the shared file; verify actual review entry point |
| Custom agents | Visual Studio 18.4+; profile creation UI 18.5+ | Verify picker discovery and actual tool names |
| Custom skills | Visual Studio 18.5+; some creation/panel UI is Insiders-only | Manual `SKILL.md` authoring is the stable fallback |
| MCP | Agent mode; source configuration, enabled tools, and per-action approval | Start with one read-only server, not all providers at once |
| Cloud sessions | Visual Studio 18.1+ for an accessible GitHub repository | Check code hosting, access, data visibility, and prepared branch |
| Parallel/background/worktree workflows | Rehearse the chosen client; do not import VS Code/CLI controls into Visual Studio | CLI/VS Code extension or sequential local fallback |
| OS sandbox | Documented CLI/app and VS Code facilities, with runtime prerequisites | Separate from Visual Studio tool approvals; demonstrate actual status only |

Tool names are not portable just because profile filenames are. GitHub's generic
aliases and Visual Studio-specific names can differ. Verify the tool list after
selecting an agent; unknown names or disabled tools can otherwise leave a
read-only reviewer without useful context.

Before each exercise record: Visual Studio build/channel, Copilot access,
workload/SDK, enabled instructions, selected agent/model, tools, MCP environment,
and approval scope. Never say "works everywhere" based on one client.

## MCP setup and governance

1. Choose the owning team, source, approved demo resource, identity, and operations
   before connecting. A reachable URL is not approval to use that source.
2. Inspect the official server and its configuration. Pin local package versions
   for rehearsal where possible. Hosted services can change tools; rediscover
   them before the workshop.
3. Keep authentication in local/managed credential mechanisms. Commit only
   token-free examples, never API keys or headers containing real credentials.
4. Restrict identity permissions and server-side tool scope, then select the
   needed tools in the client. A prompt saying "read only" is insufficient.
5. Fetch one small source and record its provenance. Treat returned instructions
   and content as untrusted data. Do not expand scope based on that content.
6. Require a separate decision for writes, publication, work-item updates,
   deployments, permission changes, and access to another environment.
7. When authorization fails, inspect the configured identity and resource scope;
   do not replace it with an administrator credential to make the demo work.

| Provider | Setup and bounded use | Required boundary |
| --- | --- | --- |
| GitHub | Remote server; use its `/readonly` endpoint and inspect the selected tools | Approved repository only; fetching a private resource does not authorize sharing it |
| Azure Boards | Remote server with Entra-backed organization; `wit,wiki` and `X-MCP-Readonly: true` in the passive sample | Demo story and wiki; no writes or project-wide exports |
| Figma | Remote endpoint and approved catalog client; OAuth/file access | One demo node; if Visual Studio is not approved/rehearsed, use an approved client or synthetic design |
| Azure | Official Azure MCP setup for the chosen client; restricted demo identity and named resources | Metadata inspection only; no deployment, secrets, or production query |
| Kontent.ai | Hosted streamable HTTP; restricted Management API key and explicit environment | Read the demo content type only; publishing/model changes remain disabled |

The [Visual Studio example](assets/visual-studio.mcp.example.json) is intentionally
not named `.mcp.json` and does not connect when the repository is cloned. After
approval, adapt it in the documented solution/user location, replace the demo
organization placeholder, authenticate, and inspect the live tool list.

Kontent.ai's hosted server accepts Management API keys, not personal API keys,
and can mutate and publish content if the key permits it. Do not copy its VS Code
secret-input syntax into Visual Studio without testing support for that client.
If the restricted key/client combination is unavailable, use the offline fixture.

Figma's remote server limits clients to its catalog. Do not spoof a client or
work around that access policy.

## Work tracking and code hosting

Azure Boards is the work-item source. Azure Repos or GitHub is the code host.
The Azure Boards-to-Copilot cloud integration targets connected **GitHub**
repositories; it is not an Azure Repos coding-agent service.

The cloud handoff can include text fields and the last 50 comments, which become
available in the GitHub PR. Review the content and target repository visibility
first. This public repository must receive only synthetic or explicitly approved
public inputs, not actual work stories or screenshots from a private project.

For Azure Repos, use the local agent with approved work-item grounding, normal
Azure Pipelines validation, and an Azure Repos PR. Preserve the story reference
and approved specification. Do not change system-of-record status automatically.

## Verification and permissions

| Control | What it establishes | What it does not establish |
| --- | --- | --- |
| Goal and file budget | Intended scope and stop condition | Enforced filesystem permissions |
| Custom-agent tool list | Available operations in that client | Safe behavior of every permitted tool or restricted identity |
| Per-action approval | A reviewed action and its consequence | Blanket future access or trustworthy source content |
| Restricted identity / read-only endpoint | Actual resource and operation limits | Correctness of the fetched data |
| OS sandbox | Runtime-specific filesystem/network restrictions | Code correctness, authorized publication, or medical/business suitability |
| Unit tests and build | Executed checks for a known patch | Complete correctness or security |
| Scanner rerun | Evidence about its specific finding/rules | Human acceptance or all possible vulnerabilities |
| Human review | Decision against scope, behavior, and evidence | A reason to skip reproducible checks |

Use local synthetic data and a disposable demo branch. No live content, real
message feed, real personal records, secret inspection, or production deployment.
The HL7 scenario remains a standards-grounded design spike, not a clinically
validated component.

For a CLI/app sandbox example, inspect `/sandbox status` and `/sandbox policy`
using a supported installed runtime. Windows support has specific OS/update
requirements. If it cannot be enabled, say so and use the prepared restricted
environment; do not describe ordinary Visual Studio approvals as a sandbox.
Do not use `--allow-all`/`--yolo` as the workshop default.

## Git, background work, and troubleshooting

Create worktrees only from a reviewed, committed preparation branch. Uncommitted
files do not appear in another worktree or cloud session. For example:

```powershell
git status --short
git worktree list
git worktree add -b demo/validation ..\cronwise-validation HEAD
git worktree add -b demo/documentation ..\cronwise-documentation HEAD
```

These are facilitator commands, not steps to run automatically in this shared
checkout. Give each worker a disjoint file budget and one integration owner.
Integrate sequentially and rerun the combined suite. Worktrees share Git
repository metadata; they are not OS sandboxes or separate authorization domains.

The current VS Code approval guide says Copilot-harness **Worktree sessions use
Allow all**. That UI workflow is not the same as creating a Git worktree and
opening it as a folder with a separately configured session. Record the actual
approval level; do not claim worktree isolation preserves Manual permissions.
If that automatic-approval behavior exceeds the workshop's agreed scope, use
a manually prepared workspace with supported controls or the sequential fallback,
not an unannounced permission expansion.

| Symptom | First investigation / bounded response |
| --- | --- |
| Agent makes unrelated edits | Stop it; compare with the approved file list; preserve unrelated user work; revise the contract before continuing |
| Instructions seem ignored | Inspect References, file discovery scope, and applicable patterns; verify the review/Chat support difference |
| Custom-agent tools disappear | Check Tools after selection and follow-up; record build and Copilot logs; re-enable only approved groups |
| MCP auth fails or no tools appear | Check account, resource scope, endpoint, CodeLens, and enabled tools; use the fixture if unresolved |
| Tests pass but reviewer rejects behavior | Check independent expectations and missing edge cases; do not rewrite tests simply to match generated code |
| Cloud handoff has no story context | Check the integration and approved fields; keep a sanitized task contract and traceable story link |
| Cloud session cannot use Azure Repos | Use local delegation plus an Azure Repos PR; do not invent a GitHub issue mirror containing private content |
| Push or PR creation fails | Inspect remote/branch, repository access, protected-branch rules, and authentication; no force-push or broad permission bypass |
| Smoke check hangs or port is busy | Inspect the exact process started by this check; use a loopback ephemeral/test port or stop only your own process |
| `demo:verify` fails after a fix | It checks planted defects, not feature correctness; use normal tests/build instead of automatically resetting |

Microsoft documents custom-agent tool-selection resets in some 18.6 releases,
with no confirmed fix on the referenced troubleshooting page. Recheck after
patching, do not promise the update resolves it. Capture the exact build, tool
selection, and sanitized Copilot Output logs for escalation.

## Official references

Recheck these before rehearsal. They are a source inventory, not configuration
already applied to the repository.

- [Visual Studio release notes](https://learn.microsoft.com/en-us/visualstudio/releases/2026/release-notes)
- [Visual Studio agent mode](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-mode?view=visualstudio)
- [Visual Studio Plan agent](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-plan-agent?view=visualstudio)
- [Visual Studio custom agents](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-specialized-agents?view=visualstudio)
- [Visual Studio skills](https://learn.microsoft.com/en-us/visualstudio/ide/copilot-agent-skills?view=visualstudio)
- [Visual Studio MCP setup](https://learn.microsoft.com/en-us/visualstudio/ide/mcp-servers?view=visualstudio)
- [Visual Studio troubleshooting](https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-troubleshoot?view=visualstudio)
- [Instruction support by surface](https://docs.github.com/en/copilot/reference/custom-instructions-support)
- [Custom-agent configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- [Azure Boards cloud-agent integration](https://docs.github.com/en/copilot/how-tos/copilot-integrations/integrate-cloud-agent-with-azure-boards)
- [Azure DevOps remote MCP](https://learn.microsoft.com/en-us/azure/devops/mcp-server/remote-mcp-server?view=azure-devops)
- [GitHub remote MCP and read-only endpoints](https://github.com/github/github-mcp-server/blob/main/docs/remote-server.md)
- [Figma remote MCP](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/)
- [Figma client catalog](https://www.figma.com/mcp-catalog)
- [Azure MCP client setup](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/get-started)
- [Kontent.ai MCP setup and permissions](https://kontent.ai/learn/docs/ai/mcp-server)
- [CLI/app sandboxing](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing)
- [VS Code agent permissions](https://code.visualstudio.com/docs/agents/run/approvals)
- [VS Code subagents](https://code.visualstudio.com/docs/agents/run/subagents)
- [GitHub responsible use of security AI](https://docs.github.com/en/code-security/responsible-use/security-and-quality-ai-features)
