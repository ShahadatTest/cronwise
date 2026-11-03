# Visual Studio companion

A small ASP.NET Core Razor Pages starter for the structured delegation workshop.
It uses .NET 10 and xUnit, with synthetic content and no CMS, database, external
API, authentication, or production connection. The original Node service is
unchanged.

## Run in Visual Studio

1. Install the ASP.NET and web development workload and .NET 10 SDK.
2. Open `Workshop.slnx` in Visual Studio 2026.
3. Build the solution and discover `Workshop.Web.Tests` in Test Explorer.
4. Run the `http` profile. Open `http://127.0.0.1:5199`.
5. Observe the existing card section. The notice section is deliberately not
   implemented; its [story](../scenarios.md#notice-section) is the hands-on task.

Rehearse the actual installed build. This document does not claim the local
Visual Studio UI has been verified by the command-line build.

## Reproducible commands

From the repository root, in PowerShell:

```powershell
dotnet restore docs\workshop\companion\Workshop.slnx --locked-mode
dotnet build docs\workshop\companion\Workshop.slnx --no-restore
dotnet test docs\workshop\companion\Workshop.slnx --no-build
dotnet format docs\workshop\companion\Workshop.slnx --verify-no-changes --no-restore
dotnet run --project docs\workshop\companion\src\Workshop.Web --no-launch-profile --urls http://127.0.0.1:5199
```

The test project includes a NuGet lockfile. A deliberate package change
requires regenerating that lockfile and reviewing both changes.

## Preparation evidence

The following command-line preflight passed on .NET SDK 10.0.403:

- locked restore: passed
- solution build: passed
- test suite: 12 passed, 0 failed
- formatting verification: passed
- loopback `/health` and rendered card smoke checks: passed

The card section rendered `Team resources`, `Start a task`, and `Check a change`.
The `/health` response identified `workshop-web`; the notice section was absent.
This command-line evidence does not replace the required Visual Studio 2026 UI
rehearsal of solution opening, build, Test Explorer discovery, and the `http`
profile.

When the server reports it is listening:

```powershell
Invoke-RestMethod http://127.0.0.1:5199/health
```

The expected service identifier is `workshop-web`. Stop the process you started
with Ctrl+C; do not stop every `dotnet` process.

## Starter contract

`CardSectionValidator` reports all content errors together. Headings must be
non-empty after trimming and at most 80 characters; sections contain 1-6 titled
cards; links must be local paths, not protocol-relative, external, backslash, or
control-character forms. The page validates its synthetic section before
rendering it using Razor's normal encoding.

The existing tests cover invalid content, URL boundary cases, and valid count
boundaries. They are not a replacement for rendering/accessibility checks or the
new notice-section tests participants will write.

Keep changes for the section exercise inside this companion. Do not connect a
content-management tenant or change the Node service to make the page work.
