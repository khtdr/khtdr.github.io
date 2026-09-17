---
title: "agents: features"
date: 2026-09-15T00:00:00-06:00
description: The full feature list, grouped, plus a tour of the screens.
url: /agents/features
---

{{< agents-nav "features" >}}

<p class="agents-hero">
The long list, broken into groups. Each row says what the feature is and why you
would want it. Screens are at the bottom.
</p>

## Authoring and versioning

<div class="agents-table-wrap">

| Feature | What it does | Why you want it |
|---|---|---|
| Agents as rows | Name, prompt, tier, tools, and an optional pipeline. Edit from the browser, the CLI, or the API | Change a prompt or add a step without a deploy |
| Built-in authoring | `agent new` interviews you and drafts an agent. Or install a skill so your coding agent can | Go from install to a working agent without writing JSON |
| Versions and replay | Every save keeps a version. Any run can be replayed against another version or different tools | A/B test a prompt or a tool description on the same input |
| Swap models globally | Agents ask for `fast`, `default`, or `reasoning`. You decide what those point at | Move every agent to a new or cheaper model in one place |
| Cost tracking | Tokens and tool spend down to the microdollar, added up across the whole run | See what a pipeline cost, not just the first call |

</div>

## Pipelines

<div class="agents-table-wrap">

| Feature | What it does | Why you want it |
|---|---|---|
| Agents as tools | An agent can list other agents alongside its tools | Build pipelines out of agents you already have |
| Pipelines (DAG) | Ordered steps, explicit connections, parallel branches, merges | Fixed sequences are cheaper and faster, and a failure points at one step |
| Visual composer | Drag to connect, click to edit, validation as you type | Build and fix a pipeline without hand-editing config |
| Conditional routing | A connection can carry a condition on the previous step's output | One classifier, four handlers, only one branch runs |
| Merges | Join branches by concatenating, listing, summarizing, or picking the best | Fan out to several agents and get one answer back |
| Gates | A step that checks the work and either passes it on or sends it back | Retry the step that produced bad output, with the complaint attached |
| Checked at save time | Loops, missing steps, and conditions that do not parse are rejected on save | The pipeline fails in the editor, not three steps into a run |

</div>

## Getting a better answer

<div class="agents-table-wrap">

| Feature | What it does | Why you want it |
|---|---|---|
| Reflection loops | Draft, critique, revise, until a critic signs off | Quality passes that do not need you in the loop |
| Quality gate | A critic reviews the finished output and flags the run if it is not good | Catch bad answers without anything silently rewriting them |
| Debate and consensus | Run it N times or ask a panel, then pick by vote, weight, or judge | Better answers on questions where one sample is a coin flip |
| Plan then execute | The model writes the pipeline before anything runs, and you can approve it first | Review the plan while it is still free to change |
| Guaranteed JSON | Put a schema on an agent and its output is validated against it | Route on a field, or hand the value to the next step as data |

</div>

## People in the loop

<div class="agents-table-wrap">

| Feature | What it does | Why you want it |
|---|---|---|
| Human in the loop | A step can stop and ask a person, with typed options | Approvals and sign-offs inside an otherwise automatic run |
| Multi-turn interviews | A conversation where each question depends on the last answer | Gather requirements from a person mid-run |
| Durable pauses | A paused run keeps its place with no process waiting on it | A webhook, a build, or a person can answer hours later |
| A pending inbox | One list of every run waiting on somebody, in the UI and the CLI | Nothing sits parked because you forgot about it |

</div>

## State and memory

<div class="agents-table-wrap">

| Feature | What it does | Why you want it |
|---|---|---|
| Shared scratchpad | Steps read and write a shared key/value store for the run | Parallel branches contribute to one result without threading it through every step |
| Long-term memory | Namespaced values that outlive the run, safe when two runs race | Jobs that pick up where the last run stopped |
| Agents that talk | Agents running in parallel can message each other | Negotiation and critique between siblings, with stalls detected |

</div>

## Tools and integration

<div class="agents-table-wrap">

| Feature | What it does | Why you want it |
|---|---|---|
| Tool config and A/B | Tool descriptions and settings are editable data on top of the code | Test two wordings of a tool, or point two copies at different accounts |
| Encrypted secrets | Credentials are stored encrypted and referenced by name | Point a tool at your account without pasting a key into config |
| Call any HTTP API | A step can fetch a URL, or be pinned to one API with the key stored encrypted and hidden from the model | Connect to a service you already pay for without writing a tool |
| Run code it wrote | A step can write Node, Python, or shell and run it in a capped subprocess with none of your keys in it | Arithmetic, parsing, and charts get computed instead of guessed at |
| Filesystem limits | Tools get scoped paths instead of raw disk access | A run writes in its own directory and cannot wander |
| Bring your own tools | Drop a file in a `tools` folder, install a tool package, or connect an MCP server | Add a tool without forking or rebuilding anything |

</div>

## Operations

<div class="agents-table-wrap">

| Feature | What it does | Why you want it |
|---|---|---|
| Storage that fits | SQLite, Postgres, plain files, or memory | Start on a laptop, move to a real database when it matters |
| Nothing gets stuck | Runs check in, dead ones get cleaned up, and cancel actually stops the run | No run sits at "running" forever because something crashed |
| Web UI, CLI, API | One engine, three ways to use it | Click through it, script it, or call it from your own app |
| Embed the runtime | `agent bundle` puts the runtime in your tree and `runAgent` becomes a function call | Agents as a feature of your product, not a service it talks to |

</div>

## The control panel

<figure class="agents-shot">
<img src="/img/agents/agent-detail.jpg" alt="An agent detail page showing the system prompt, model tier, a rendered graph pipeline, and version history" />
<figcaption>An agent: its prompt, model tier, step limit, and the pipeline that says what it does. Every save keeps a version, and each run links back to the version that produced it.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/run-history.jpg" alt="Run history as a collapsible tree, with sub-agent runs nested under their parents and per-run tokens, cost, and duration" />
<figcaption>Run history, like a git log. Sub-agent calls nest under the run that made them, each with its own tokens, cost, and time. A pipeline's total is the sum of its parts.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/run-detail.jpg" alt="A single run's detail page with duration, steps, model, tokens, cost, and a pipeline diagram of its child runs" />
<figcaption>One run in full: what it cost, what it called, and what each part said.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/pending-gate.jpg" alt="A paused run showing a 'waiting on you' panel with a question and checkboxes for staging, prod-eu and prod-us" />
<figcaption>When a run needs a person it pauses and waits. No process is held open. The form is built from the question, so a step that offers three choices cannot get a fourth.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/models.jpg" alt="The models settings page, binding the default, fast and reasoning tiers to model ids with per-million-token prices" />
<figcaption>Agents ask for <code>fast</code>, <code>default</code>, or <code>reasoning</code>. You decide what those point at, prices included. Every agent picks up the change on its next run.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/tools.jpg" alt="The tools page listing versioned tool definitions above the code implementations they point at" />
<figcaption>Tools are code, but their descriptions and settings are editable data on top. Two entries can share one implementation with different wording or different accounts.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/memory.jpg" alt="The memory page showing namespaced durable keys with their values and when they were last written" />
<figcaption>What agents wrote down to remember between runs. A watermark, a last-seen id, a decision that should not get made twice.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/dashboard.jpg" alt="The dashboard showing 24-hour run counts, cost, tokens, average duration, recent errors and recent activity" />
<figcaption>The dashboard, for when you would rather look than type.</figcaption>
</figure>

## Under the hood

- **TypeScript throughout.** A small HTTP server, a React UI, and a runner you can embed in your own app.
- **One key, every provider.** Models come through OpenRouter. Switching from Claude to GPT to Gemini is a setting, not an integration.
- **Laptop or cluster.** SQLite by default with nothing to install. Postgres when you need more than one machine. Every storage option passes the same test suite, so behavior does not change with the backend.
- **Conditions are parsed, not evaluated.** The expression language in routing conditions is a fixed whitelist. Nothing arriving over the API can reach past it.
- **Your tools are not second class.** A tool you write in the `tools` folder gets the same schema handling, the same validation, the same catalog entry, and the same settings-on-top-of-code as one that shipped.

<p class="agents-next"><strong>Next:</strong> <a href="/agents/tools">Tools</a>.</p>
