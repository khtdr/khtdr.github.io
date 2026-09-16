---
title: "agents"
date: 2026-09-15T00:00:00-06:00
description: An agent platform where agents are database rows instead of code. Every save is versioned, everything is editable in the browser, and pipelines are graphs you draw.
tags: [typescript, llm, agents, orchestration, dag, postgres, sqlite, zod, openrouter]
categories: [Software]
url: /agents
aliases: [/agents.html]
---

<style>
.agents-hero {
  margin: 0 0 6px;
  font-size: 1.22rem;
  line-height: 1.55;
  text-wrap: balance;
}
.agents-shot {
  margin: 22px 0 28px;
}
.agents-shot img {
  border: 1px solid var(--card-border);
  border-radius: 6px;
  box-shadow: var(--card-shadow);
}
.agents-shot figcaption {
  margin-top: 8px;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--muted-color);
}
.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
  margin: 18px 0 28px;
}
.agents-card {
  background-color: var(--well-color);
  border: 1px solid var(--card-border);
  border-left: 3px solid var(--accent-color);
  border-radius: 6px;
  padding: 12px 16px;
}
.agents-card h4 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: var(--accent-color);
}
.agents-card p {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--foreground-color);
}
.agents-table-wrap { overflow-x: auto; }
.agents-table-wrap table { min-width: 620px; }
.agents-table-wrap td:first-child { white-space: nowrap; font-weight: 700; }
.agents-steps { margin: 18px 0 28px; padding-left: 0; list-style: none; counter-reset: step; }
.agents-steps > li {
  position: relative;
  counter-increment: step;
  padding: 0 0 18px 44px;
  border-left: 2px solid var(--card-border);
  margin-left: 14px;
}
.agents-steps > li:last-child { border-left-color: transparent; padding-bottom: 0; }
.agents-steps > li::before {
  content: counter(step);
  position: absolute;
  left: -15px;
  top: -2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--accent-color);
  color: var(--content-background-color);
  font-family: "Reddit Mono", monospace;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 28px;
  text-align: center;
}
.agents-steps h4 { margin: 0 0 4px; font-size: 1.02rem; }
.agents-steps p { margin: 0 0 8px; }
.agents-steps .highlight { margin-bottom: 0; }
</style>

<p class="agents-hero">
An agent platform where <strong>agents are data</strong>. An agent is a row with a
system prompt, a model tier, and a list of tools. You create one in the browser,
every save keeps a version, and you connect agents into a pipeline by dragging
edges. Each step runs with its own cost and transcript. No rebuild, no redeploy,
no YAML.
</p>

<figure class="agents-shot">
<img src="/img/agents/graph-composer.jpg" alt="The graph composer: a four-way conditional router drawn on a canvas, with a node inspector open on the right" />
<figcaption>Drawing a conditional router on the canvas. Drag from one handle to another to connect two steps. Click a node or an edge to edit it. The same picture shows the pipeline while it runs.</figcaption>
</figure>

## The idea

Most agent frameworks make an agent a class you subclass and a pipeline a function
you deploy. So every small change, like rewording a prompt or adding one more step,
has to go through a code review and a release.

Here an agent is a row in a database. The tools are code, but the pipeline that
connects them is data too. Changing an agent is a save, not a deploy. Every save
keeps the old version, and every run records which version produced it, what each
step cost, and what each sub-agent said.

## Getting started

<ol class="agents-steps">
<li>
<h4>Get a model key</h4>
<p>Sign up at <a href="https://openrouter.ai">openrouter.ai</a> and copy an API key. One
key works for every provider (Anthropic, OpenAI, Google, and the rest), so it is the
only credential you need.</p>
</li>
<li>
<h4>Install it</h4>

```bash
npm install -g @upship/agents
agent serve
```

<p>Paste your key in when it asks. That starts the API and the web UI on
<code>localhost:2137</code>. Storage is a local SQLite file under <code>~/.agents</code>,
so there is no database to set up. You can point it at Postgres later if you need to.</p>
</li>
<li>
<h4>Make your first agent</h4>
<p>There are two ways to do this, and neither one needs a copy of the source. The
first is to let the platform interview you, from a second terminal since the server
is still running in the first:</p>

```bash
agent new
```

<p>It asks what you want to build, follows up on the parts you left vague, then
writes a draft and shows it to you:</p>

```text
What do you want to build?
(take as many lines as you like — blank line when you're done)

> something that watches my RSS feeds and summarizes new posts

draft
  Name:  rss-summarizer
  What:  Summarizes new posts across a list of feeds.
  Model: default
  Tools: web_search, write_file

  System prompt
  You are handed a list of feed URLs. Fetch what is new since the
  last run, and write one short paragraph per post — what it says,
  not that it exists.

  Notes
  Give it a durable memory namespace if you want it to remember
  where it stopped between runs.

Create it? [y/N]
```

<p>Nothing is saved until you say yes.</p>

<p>The second way is to have the coding agent you already use write it for you:</p>

```bash
agent skill install     # writes the /new-agent skill
claude                  # then: /new-agent
```

<p>Both read the same brief, which is generated from your install. So it lists the
tools you have, including any that came from a package or an MCP
server. <code>agent brief</code> prints that document if you want to use it somewhere else.</p>
</li>
<li>
<h4>Run it</h4>

```bash
agent rss-summarizer "catch me up on this week"
```

<p>Or open the web UI and click Run. Either way the run shows up in history with its
cost, its steps, and every sub-agent it called.</p>
</li>
</ol>

## Features

<div class="agents-table-wrap">

| Feature | What it does | What this enables |
|---|---|---|
| Agents as rows | Name, prompt, tier, tools, and an optional pipeline. Edit from the browser, the CLI, or the API | Change a prompt or add a step without a deploy |
| Built-in authoring | `agent new` interviews you and drafts an agent. Or install a skill so your coding agent can | Go from install to a working agent without writing any JSON |
| Agents as tools | An agent can list other agents alongside its tools | Build pipelines out of agents you already have |
| Pipelines (DAG) | Ordered steps, explicit connections, parallel branches, merges | Fixed sequences are cheaper and faster, and a failure points at one step |
| Visual composer | Drag to connect, click to edit, validation as you type | Build and fix a pipeline without editing config by hand |
| Conditional routing | A connection can carry a condition on the previous step's output | One classifier, four handlers, only one branch runs |
| Merges | Join branches by concatenating, listing, summarizing, or picking the best one | Fan out to several agents and get one answer back |
| Gates | A step that checks the work and either passes it along or sends it back | Retry the step that produced bad output, with the complaint attached |
| Reflection loops | Draft, critique, revise, until a critic signs off | Quality passes that do not need you in the loop |
| Quality gate | A critic reviews the finished output and flags the run if it is not good | Catch bad answers without anything silently rewriting them |
| Debate / consensus | Run it N times or ask a panel, then pick by vote, weight, or judge | Better answers on questions where one sample is a coin flip |
| Plan then execute | The model writes the pipeline before anything runs, and you can approve it first | Review the plan while it is still free to change |
| Human in the loop | A step can stop and ask a person, with typed options | Approvals and sign-offs inside an otherwise automatic run |
| Multi-turn interviews | A conversation where each question depends on the last answer | Gather requirements from a person mid-run |
| Durable pauses | A paused run keeps its place with no process waiting on it | A webhook, a build, or a person can answer hours later |
| Shared scratchpad | Steps read and write a shared key/value store for the run | Parallel branches contribute to one result without passing it through every step |
| Long-term memory | Namespaced values that outlive the run, safe when two runs race | Jobs that pick up where the last run stopped |
| Agents that talk | Agents running in parallel can message each other | Negotiation and critique between siblings, with stalls detected |
| Guaranteed JSON | Put a schema on an agent and its output is validated against it | Route on a field, or hand the value to the next step as data |
| Versions and replay | Every save keeps a version. Any run can be replayed against another version or different tools | A/B test a prompt or a tool description on the same input |
| Cost tracking | Tokens and tool spend down to the microdollar, added up across the whole run | See the full cost of a pipeline, not just the first call |
| Swap models globally | Agents ask for `fast`, `default`, or `reasoning`. You decide what those mean | Move every agent to a new or cheaper model in one place |
| Tool config and A/B | Tool descriptions and settings are editable data on top of the code | Test two wordings of a tool, or point two copies at different accounts |
| Encrypted secrets | Credentials are stored encrypted and referenced by name | Point a tool at your account without pasting a key into config |
| Filesystem limits | Tools get scoped paths instead of raw disk access | A run writes in its own directory and cannot wander |
| Bring your own tools | Load tool packages or connect MCP servers at startup | Add tools without forking or rebuilding anything |
| Storage that fits | SQLite, Postgres, plain files, or memory | Start on a laptop, move to a real database when it matters |
| Nothing gets stuck | Runs check in, dead ones are cleaned up, and cancel stops the run | No run sits at "running" forever because something crashed |
| Web UI, CLI, API | One engine, three ways to use it | Click through it, script it, or call it from your own app |

</div>

## What you can build with it

<div class="agents-grid">
<div class="agents-card">
<h4>Research briefs</h4>
<p>Search once, send the results to an analyst and a fact-checker at the same time, then merge the two into a brief.</p>
</div>
<div class="agents-card">
<h4>Support triage</h4>
<p>A classifier reads the request and the pipeline sends it to one handler. The branches nobody took cost nothing.</p>
</div>
<div class="agents-card">
<h4>Deploy approvals</h4>
<p>A pipeline that stops to ask a person which environments to ship to, then picks up where it left off. Hours later, if that is how long it takes.</p>
</div>
<div class="agents-card">
<h4>Draft and critique</h4>
<p>A writer and a critic trade drafts until the critic signs off. Every draft and every critique is kept.</p>
</div>
<div class="agents-card">
<h4>Incremental jobs</h4>
<p>A daily digest that remembers where it stopped, and will not process the same thing twice if two runs overlap.</p>
</div>
<div class="agents-card">
<h4>Prompt A/B tests</h4>
<p>Replay a past run against a different version or a different tool, then compare the two outputs side by side.</p>
</div>
</div>

## The control panel

<figure class="agents-shot">
<img src="/img/agents/agent-detail.jpg" alt="An agent detail page showing the system prompt, model tier, a rendered graph pipeline, and version history" />
<figcaption>An agent: its prompt, model tier, step limit, and the pipeline that defines what it does. Every save keeps a version, and each run links back to the version that produced it.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/run-history.jpg" alt="Run history as a collapsible tree, with sub-agent runs nested under their parents and per-run tokens, cost, and duration" />
<figcaption>Run history, like a git log. Sub-agent calls nest under the run that made them, each with its own tokens, cost, and time, so a pipeline's total is the sum of its parts.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/run-detail.jpg" alt="A single run's detail page with duration, steps, model, tokens, cost, and a pipeline diagram of its child runs" />
<figcaption>One run in full: what it cost, what it called, and what each part said.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/pending-gate.jpg" alt="A paused run showing a 'waiting on you' panel with a question and checkboxes for staging, prod-eu and prod-us" />
<figcaption>When a run needs a person, it pauses and waits. No process is held open. The answer form is built from the question, so a step that offers three choices cannot get a fourth.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/models.jpg" alt="The models settings page, binding the default, fast and reasoning tiers to model ids with per-million-token prices" />
<figcaption>Agents ask for <code>fast</code>, <code>default</code>, or <code>reasoning</code>. You decide what those point at, prices included, and every agent picks up the change on its next run.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/tools.jpg" alt="The tools page listing versioned tool definitions above the code implementations they point at" />
<figcaption>Tools are code, but their descriptions and settings are editable data on top. Two entries can share one implementation with different wording or different accounts.</figcaption>
</figure>

<figure class="agents-shot">
<img src="/img/agents/memory.jpg" alt="The memory page showing namespaced durable keys with their values and when they were last written" />
<figcaption>What agents wrote down to remember between runs. A watermark, a last-seen id, a decision that should not be made twice.</figcaption>
</figure>

## More than one way in

The web UI is one client, not the only one. The CLI streams output, takes piped
input and file attachments, and prompts you right there when a run stops to ask
something:

```bash
agent researcher "what changed in HTTP/3 this year"
echo "summarize this" | agent summarizer -f notes.md

agent new                # build an agent by answering questions
agent skill install      # teach Claude Code to write agents here
agent brief              # what this install can do, as one document

agent pending
# Waiting (1)
#
#   support-router aa3793db · 19h
#     ⏸ Which environments should this go to?
```

The HTTP API is the same one the UI uses. Anything you can click, you can script:
start a run, read history, or answer a run that is waiting.

```bash
curl -X POST localhost:2137/api/agents/researcher/run \
  -H 'content-type: application/json' \
  -d '{"input": "what changed in HTTP/3 this year"}'

curl localhost:2137/api/brief                 # what this install can author
curl localhost:2137/api/runs/pending          # every run waiting on a person
curl -X POST localhost:2137/api/runs/$ID/pending/$TOKEN \
  -d '{"response": {"answer": ["staging"]}}'  # ...and answering one
```

<figure class="agents-shot">
<img src="/img/agents/dashboard.jpg" alt="The dashboard showing 24-hour run counts, cost, tokens, average duration, recent errors and recent activity" />
<figcaption>And the web UI, for when you would rather look than type.</figcaption>
</figure>

## Under the hood

- **TypeScript** all the way through. A small HTTP server, a React UI, and a runner you can embed in your own app.
- **One key, every provider.** Models come through OpenRouter, so switching from Claude to GPT to Gemini is a setting, not an integration.
- **Runs on a laptop or a cluster.** SQLite by default with nothing to install, Postgres when you need more than one machine. Each storage option passes the same test suite, so it behaves the same either way.
- **Conditions are parsed, not evaluated.** The small expression language in routing conditions is a fixed whitelist, so nothing coming in over the API can reach anything it should not.
- **Checked before it is saved.** A pipeline with a loop, a missing step, or a condition that does not parse is rejected when you save it, not three steps into a run.

<div class="agents-grid">
<div class="agents-card">
<h4>Up in a minute</h4>
<p>One API key, one install. No database, no queue, no broker.</p>
</div>
<div class="agents-card">
<h4>Survives a crash</h4>
<p>A crashed run gets recorded instead of left hanging, and a paused run waits in the database, not in memory.</p>
</div>
<div class="agents-card">
<h4>Usage cost transparency</h4>
<p>Tokens and tool spend added up across the whole run. A model with no price on file shows as unpriced, not as free.</p>
</div>
</div>

## FAQs / Troubleshooting

### Which port does it use?

`agent serve` listens on port 2137, on `127.0.0.1` only. That default is chosen for
you but not fixed. For one start:

```bash
agent serve --port 3000
```

To change it for good, set `PORT` where the server will see it. Either line works:

```bash
# in ~/.agents/.env, which the server reads on every start
PORT=3000

# or in your shell profile (~/.bashrc, ~/.zshrc)
export PORT=3000
```

The CLI finds the server through a separate variable, so if you move the port,
move that too:

```bash
export AGENT_API_URL=http://localhost:3000
```

### It says the port is already in use

Most likely another `agent serve` is still running, possibly in a terminal you
forgot about. If so, use that one. Otherwise pick a different port as above. The
error message names the port and the same options.

### Can I reach it from another machine?

By default, no. The server binds to `127.0.0.1`, and nothing on it asks for a
password, so opening it up is something to choose on purpose. Set `HOST` to
listen wider, and put it behind something that authenticates before you do:

```bash
# ~/.agents/.env
HOST=0.0.0.0
```

### Where does everything live?

Under `~/.agents`: the `.env` with your key and settings, the SQLite database,
and the directories tools read from and write to. Back that directory up and you
have backed up the install. Set `AGENTS_HOME` to put it somewhere else.

### Running it against Postgres

SQLite is fine for one machine. Postgres is for when more than one process, or
more than one machine, needs the same agents and history. The database has to
exist; the tables do not. They are created the first time the server starts,
and a database from an older version gets any columns it is missing the same
way.

Set the driver and the connection in `~/.agents/.env`, then restart:

```bash
# ~/.agents/.env
STORE_DRIVER=postgres
PGHOST=db.example.internal
PGPORT=5432
PGUSER=agents
PGPASSWORD=...
PGDATABASE=agents
```

```bash
agent serve
# Agent platform running on http://127.0.0.1:2137 (storage: postgres)
```

Everything lands in a schema named `agents` inside that database, so it can
share a database with other things. Set `DB_SCHEMA` to use a different name.
The user needs to be able to create the schema and its tables on the first
start; after that, ordinary read and write is enough.

Two servers pointed at the same database see the same agents, runs, secrets
and memories. The SQLite file under `~/.agents` is left where it was, and
switching back is a matter of changing `STORE_DRIVER` again.

### Can I use it inside my own app, without the server?

Yes. The runtime that `agent serve` wraps is also a library. Your code calls
`runAgent` as a function, the runs land in a database you choose, and there is
no HTTP in between. Your app keeps its own login and its own users; the agents
become a feature of it.

From your project's directory, copy the runtime in and install it:

```bash
agent bundle                       # writes lib/agents
npm install ./lib/agents ai zod
```

Then a script like this runs an agent and reads the result back:

```ts
import { createRuntime, createAgent, runAgent, getStore, toolRegistry } from "@upship/agent-core";
import { tool } from "ai";
import { z } from "zod";

toolRegistry.register("clock", "Report the current time. Use it when asked what time it is.", () =>
  tool({ description: "The current time as ISO 8601.", parameters: z.object({}), execute: async () => ({ now: new Date().toISOString() }) }),
);

const rt = await createRuntime({ timers: false });
const agent =
  (await getStore().getAgent("timekeeper")) ??
  (await createAgent({ name: "timekeeper", description: "Tells the time", systemPrompt: "Answer using the clock tool.", tools: ["clock"] }));
const run = await runAgent(agent, "What time is it?", rt.ctx, rt.models);
const row = await getStore().getRun(run.runId);
console.log(row?.status, row?.output);
await rt.stop();
```

Set `OPENROUTER_API_KEY` and `STORE_DRIVER=sqlite` and run it with
`node example.ts` on Node 24 or later. `createRuntime` does what the server does
at startup: opens the store, sets up tools and models, and starts the cleanup
timers. A script that runs once turns the timers off; a server that stays up
leaves them on and calls `rt.stop()` on shutdown.

Every feature above works the same way here. Graphs, gates, memory, secrets and
cost tracking all live in the runtime, not in the server. The web UI is the one
part that does not come along; it is a static page over the HTTP API, so read
runs out of the store and show them your own way.

To upgrade, run `agent bundle` again after updating the CLI. The **Embedding**
page in the web UI walks through the example a line at a time and says what
each one commits you to.

---
