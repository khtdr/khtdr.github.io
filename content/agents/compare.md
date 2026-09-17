---
title: "agents: how it compares"
date: 2026-09-16T00:00:00-06:00
description: How this compares to Flue and to Sapiom, including the parts where they win.
url: /agents/compare
---

{{< agents-nav "compare" >}}

<p class="agents-hero">
Two projects may come up when you are looking for similar solutions. Flue, an
open TypeScript framework from the Astro team. Sapiom, a hosted platform. They
are different enough from each other that the comparisons barely overlap. Both
were checked in September 2026, and both move fast, so treat the specifics as a
snapshot.
</p>

## The short version

<div class="agents-table-wrap">

| | This | Flue | Sapiom |
|---|---|---|---|
| What an agent is | A row in a database | A TypeScript function | TypeScript step code |
| Changing a prompt | Save it | Commit, build, deploy | Commit, build, deploy |
| Where it runs | Your laptop, your host, or inside your app | Your host or Cloudflare | Their cloud only |
| Model keys | Yours, via OpenRouter | Yours, per provider | Theirs, five models |
| Per-run cost | None | None | $0.50 to $1 |
| Version history and replay | Yes | Git, and no replay | No |
| Survives a redeploy mid-run | Partly | Yes, by design | Yes |
| Sandbox | Capped subprocess | Managed cloud boxes | Managed cloud boxes |
| Slack, GitHub, Stripe ingress | Write it yourself | 17 verified channels | Webhook triggers |
| Auth and tenancy | None | None | Yes, with SSO |

</div>

---

# Against Flue

Flue is Apache-2.0, self-hosted, bring your own model key, no account, no per-run
fee. Everything I would normally compare is a tie. What is left is a disagreement
about what an agent is.

## The disagreement

In Flue an agent is a function with a React-style hooks API:

```ts
'use agent';
export function Triage() {
  useModel('anthropic/claude-sonnet-4-6');
  useSandbox(local());
  useTool(searchIssues);
  useSkill(reviewChecklist);
  return 'Investigate the reported issue and recommend the next action.';
}
```

The function re-renders before every model call. Hooks get re-evaluated each turn,
so capabilities appear and disappear mid-conversation. You build it with Vite and
deploy to Node or Cloudflare, where each conversation becomes a Durable Object.

**The unit of work is different.** Flue's unit is a conversation. It is a
stateful, addressable, long-lived service at a URL, with durable history and a
contract that survives crashes and redeploys. This project's unit is a run. It has
an input, an output, a cost, and a tree of children. Flue asks what an agent knows
and can reach right now. This asks what happened on that run, and whether you can
do it again differently.

**Data versus code.** Here an agent is a row. It gets versioned on every save,
replayed against an older version, and edited by someone who does not write
TypeScript. In Flue an agent is source in a repo. Changing a prompt is a commit, a
build, and a deploy, and there is no dashboard, no version history, and no replay.
That is not an oversight. It is the same call Astro makes about pages. It does
mean the whole A/B-and-replay half of this project has no counterpart there.

## Side by side

<div class="agents-table-wrap">

| Area | This project | Flue |
|---|---|---|
| License and backing | Private repo, one author, npm `@upship/agents` | Apache-2.0, Astro team, ~8.3k stars, 1.0 beta |
| Defining an agent | A JSON row: prompt, tier, tools, optional graph config | A TypeScript function with `use*` hooks |
| Who writes it | A person in the UI, an interview, or a coding agent from the generated brief | You, in an editor |
| Changing a prompt | Save, new version snapshot | Edit source, commit, build, deploy |
| Versioning and replay | Every save snapshots. Replay any run against another version or swapped tools | None. Git is the history |
| Unit of work | A run, with a status, a cost, and a child tree | A conversation at a URL, with an append-only stream |
| Execution modes | Freeform loop, DAG with conditions and merges, plan-then-execute, debate, reflection, quality gate, peer messaging | One model-driven turn loop. Branching is conditional hooks. Delegation is a `task` tool |
| Orchestration authored as | Config fields | Control flow you write |
| Sub-agents | An agent is a tool. Child runs roll up cost. Peers can message each other | `useSubagent()`, fresh context, isolated from the parent, depth capped at 4 |
| Durability | Graph nodes park and resume by token. Freeform runs wait in-process and die with it | The headline feature. Leases, heartbeats, startup reconciliation, classified recovery, durable tools with checkpoints |
| Storage | Four drivers behind one port, with a conformance suite | Adapters for SQLite, Postgres, libSQL, MySQL, MongoDB, Redis. Free on Cloudflare |
| Sandboxing | Capped subprocess. No filesystem namespace. Reports what it could not enforce | Virtual, local, or remote providers: E2B, Daytona, Modal, Vercel, Cloudflare |
| Tools | ~22 first-party plus MCP. Definitions are rows you can A/B and bind config to | `defineTool()` with Valibot, composed per render, conditionally visible |
| Skills | None | First-class, using the open agentskills.io format, progressively disclosed |
| Human in the loop | Parking tools, a derived answer form, a pending inbox in UI and CLI | Nothing named. A person sends the next message. No inbox |
| Models | OpenRouter, one key. Tiers mapped as data, repointable without a rebuild | `useModel()` per agent, keys per provider, automatic compaction |
| Triggers | None. Cron the CLI | No scheduler, but documented patterns per target |
| Inbound integrations | None | 17 verified channels: Slack, Discord, GitHub, Linear, Stripe, Twilio and more |
| Frontend | Its own admin UI | `@flue/react` for your product's chat UI, plus streaming data parts |
| Client SDK | None yet | Small, typed, one dependency |
| Observability | Run tree, live node events, cost columns, side-by-side comparison, in a UI | An event stream you ship to Sentry, Braintrust, or OpenTelemetry. No dashboard, by choice |
| Evals | None. Replay is the nearest thing | Vitest suites, judges, CI reporting |
| Auth | None. Binds to localhost for that reason | None built in, but you own the route map |

</div>

## What Flue does better

1. **Durability.** This is the gap that matters most. Every admitted submission
   reaches exactly one outcome, enforced by attempts, leases, startup
   reconciliation, and a classifier that tells a partial stream from an unresolved
   tool batch from a context overflow. Here, a freeform run waits in-process and
   dies with it. The heartbeat notices a dead run. It does not recover one.
2. **Sandbox isolation from a provider.** Managed Linux per conversation, with a
   real filesystem boundary and a package manager. `run_script` here covers
   computation and says plainly what it could not take away. It will not hand a
   coding agent a disposable box.
3. **Channels.** Verified webhook ingress from 17 providers, with signature
   checking, replay windows, and idempotency keys. Getting a GitHub issue into an
   agent here is a service you write.
4. **Skills.** A portable format for packaged expertise, disclosed progressively
   so an agent can carry dozens cheaply. No equivalent here.
5. **Conversational agents.** Long-lived services at a URL, joined by many people
   over days. Runs here are jobs.
6. **A frontend story and a client SDK.**
7. **Evals, compaction, and OpenTelemetry.**
8. **A team, a license, and a community.**

## What this project does better

1. **Agents as data.** Version history, a UI, replay against an older version,
   side-by-side comparison. The whole precondition for A/B work.
2. **Tool definitions as data.** Many definitions over one implementation, each
   with its own wording, config, and secrets. Both projects have a `defineTool()`
   now. The unit is still different: theirs binds a schema once, mine is a row you
   can point at two accounts.
3. **Declarative multi-step orchestration.** Conditional edges, fan-in merges,
   gates with retry, plan-then-execute with human review, debate, reflection.
   In Flue each of those is control flow you hand-write.
4. **Peer messaging** between concurrent nodes, with deadlock detection. Flue's
   delegation is strictly hierarchical and siblings never talk.
5. **Human gates with an inbox.** Flue makes asking natural and gives you nothing
   for finding what is waiting.
6. **Durable memory with compare-and-set.**
7. **Model tiers as data.** Repoint `reasoning` without a rebuild, and old runs
   keep the id they resolved to.
8. **Cost you can look at.** Microdollar columns, tool costs folded in, rollups
   across the tree. Flue emits numbers and hands them to someone else's dashboard.
9. **Authoring without the repo.** An interview, a generated brief, a skill your
   coding agent can use.
10. **No build step.** `agent serve` and you have an API, a UI, and SQLite. Flue
    needs Vite, a config, a plugin ordering rule, and hand-maintained Durable
    Object migrations on Cloudflare.
11. **An encrypted secret store** instead of env vars, so a key rotates without a
    redeploy.
12. **An outbound HTTP tool with an address policy.**

## Pick Flue if

- The work must not be lost. A redeploy mid-task is routine and a dropped job is
  an incident.
- The agent runs code against a real boundary. You want a disposable Linux box
  with a package manager, not a capped subprocess.
- Users talk to it, in Slack or GitHub or a chat UI in your product.
- You are a TypeScript team shipping a product, and you want agents in the repo
  and reviewed in pull requests.
- You are already on Cloudflare. Durable Objects solve the one-owner problem that
  Node leaves to you.
- You want an OSS project with a future behind it.

## Pick this if

- The agents should be editable by a person in a UI, versioned, replayed, and
  compared, by someone who is not going to open a repo.
- The orchestration patterns matter. Debate, reflection, gates, fan-in merges,
  conditional routing. A config field here, a week of control flow there.
- You want to A/B the wording.
- The work is job-shaped, not conversation-shaped. Pipelines, batch
  classification, a nightly report. Run history is the product.
- You want it running in one command, with no build and no deploy story.
- You want to repoint models, rotate credentials, or rewire a graph without a
  redeploy.
- You want to own and vendor the runtime.

## Bottom line

Flue is built to keep work running. This is built to let you change the work and
see what changed.

Someone picks Flue because their agent has to survive a redeploy while a customer
is talking to it. Someone picks this because they want to change a prompt, re-run
yesterday's job against both versions, and see which one cost less.

---

# Against Sapiom

Sapiom is venture-funded and hosted. Around $50M raised, Accel-led. It has three
pieces:

1. **Router.** An OpenAI-compatible endpoint that picks a model per request from a
   small curated list and meters every call.
2. **Runtime.** A managed engine that runs your agent in their cloud as a typed
   step graph with durable pauses, retries, schedules, and per-attempt traces.
3. **Capabilities.** A catalog of paid services an agent calls through one
   pre-authenticated client. Web search, scraping, browser sessions, sandboxes,
   Postgres provisioning, image and video generation, file storage, email lookup,
   domain registration. No vendor accounts.

That third piece is the business. The pitch is that agents buy their own tools and
every API call is a payment. Sapiom is a procurement layer with a runtime around
it. This project is a runtime whose only payments layer is your OpenRouter bill.

## Side by side

<div class="agents-table-wrap">

| Area | This project | Sapiom |
|---|---|---|
| Where it runs | Your machine, any host, or inside your own app as a library | Their cloud only. Local runs stub every capability |
| Defining an agent | A JSON row, editable in the UI, versioned on every save | TypeScript in a repo they provision, with compile-checked step transitions |
| Who writes it | A person in the UI, an interview, or a coding agent | A desktop studio, or their MCP server inside your coding agent |
| Execution modes | Freeform loop, DAG with conditions and merges, plan, debate, reflection, gates, peer messaging | One step graph. Branching and escalation are hand-written |
| Model access | Any OpenRouter model, your key, tiers as data | Five curated models, their key, latency lanes |
| Tools | ~22 first-party, plus yours, plus MCP. You bring the credentials | A capability catalog. No credentials to bring, and no way to add your own |
| Sandbox | Capped subprocess, no filesystem namespace | Managed cloud environments and a hosted coding agent, metered per call |
| Durable pause | Graph nodes park and resume by token | Signals with correlation ids and deadlines |
| Retries | Gates with retry, plan re-planning. No automatic per-step retry | Three attempts per step by default, plus an explicit retry directive |
| Scheduling | None. Cron the CLI | Cron, events, and webhook triggers |
| Memory | Durable memory with compare-and-set | Not a named feature. Use file storage or a provisioned database |
| Cost | Your OpenRouter usage, and nothing else | $0.50 to $1 per run on top of usage, plus per-call capability rates |
| Auth and tenancy | None at all | Accounts, orgs, per-agent spend rules, SSO, audit trail |
| Compliance | Whatever your host gives you | SOC 2, SLAs, telemetry export |
| Lock-in | Low. Agents are JSON, and the runtime vendors into your tree | High. Step code imports their package and capabilities are their client |
| Local dev | The real thing runs locally. Same database, same tools, real calls | Real step code, stubbed capabilities. Production behavior first happens in their cloud |

</div>

## What Sapiom does better

1. **Someone else holds every credential and every invoice.** A Sapiom agent can
   spin up a browser, register a domain, provision a Postgres, and generate a
   video with nobody creating an account anywhere. Here each of those is a key you
   go get. That gap got smaller when the fetch tool landed, since an HTTP API
   with a key is now a tool definition rather than a module. The signups and the
   invoices are untouched, and they were always the point.
2. **Cloud sandboxes and a hosted coding agent.** Managed compute with a real
   filesystem boundary and a package manager.
3. **Schedules and webhook triggers.** Here you wire cron to the CLI yourself.
4. **Auth, tenants, policies, spend caps.** None of that exists here. This
   platform has no notion of a caller anywhere.
5. **Compile-time graph checking.** Undeclared transitions are type errors. The
   equivalent here is schema validation at save time, which is good but
   runtime-typed.
6. **Model routing by task shape.** Here a tier is a fixed pointer you set.
7. **Support, SLAs, SOC 2.** You pay for someone to be on the hook.

## What this project does better

1. **It runs anywhere.** One process, SQLite, no account. Sapiom cannot run your
   agent outside their cloud, and even local authoring needs a sign-in.
2. **Agents as data.** Version history, a UI, replay. Their agents are TypeScript,
   so changing a prompt is a deploy.
3. **Higher-level orchestration built in.** Debate, reflection, plan review, merge
   strategies, conditional edges, gates. You hand-write all of that as steps there.
4. **A freeform loop as a first-class mode.** Their unit is a deterministic step.
5. **Bring your own model provider.** Any OpenRouter model, any price, your key.
6. **Bring your own tools, at no disadvantage.** A file in `./tools` gets the same
   treatment a built-in gets. Sapiom has no user-defined capability mechanism at
   all. Anything outside the catalog is a `fetch` buried in step code.
7. **Peer messaging** between concurrent nodes.
8. **Durable memory with compare-and-set.**
9. **Tool definitions as data.**
10. **No per-run fee, and this is the big practical one.** A run on a cheap model
    here costs about five cents. A heavy day of $10 in model calls is roughly 200
    runs, which on Sapiom is $100 to $200 in run fees before any usage or
    capability rates. Ten to twenty times the cost is not a rounding error.
11. **Full local fidelity.** Your test run is the production run.
12. **Source you can read, vendor, or depend on outright.**

## Pick Sapiom if

- You do not want to collect API keys. Search, a headless browser, a scratch
  database, image generation, email lookup. That is five signups and five invoices
  on your own host, and one bill on theirs. This is the whole pitch and it is real.
- You need a sandbox strong enough to be somebody else's problem.
- You need schedules and inbound webhooks without building them.
- You are a team, not a person. Spend limits, an audit trail, SSO, someone to call.
- You want compliance paper.
- You prefer typed code over JSON config, with transitions checked by a compiler
  and agents reviewed in pull requests.

## Pick this if

- It is a personal or small-scale tool. No per-run fee, no account, no vendor.
- The agents need to be editable in a UI, versioned, replayed, and compared.
- The orchestration patterns matter.
- You want to own the runtime. Read it, vendor it, patch it, run it on a Raspberry
  Pi, or compile it into your own app.
- You already have tools or MCP servers and want them treated as first-class.
- You want any model, including ones Sapiom does not route to.
- You do not want your agent logic and all of its data flowing through someone
  else's cloud.

## Bottom line

They overlap on the runtime. Durable pause and resume, step graphs, shared state,
traces, secrets, cost tracking. This project is ahead on orchestration patterns and
on agents-as-data. Sapiom is ahead on everything around the runtime: hosting,
scheduling, auth, tenancy, compliance, and a catalog of prepaid services.

What Sapiom sells is not having to hold the key. Someone picks Sapiom because they
want to not operate anything and not sign up for anything. Someone picks this
because they want to own it and run it cheaply.

---

## What I would have to build to close the gaps

No hosting or billing in this list, because that is not a thing I am going to
compete on.

- **Freeform durability.** The biggest one and the hardest. A graph parks durably
  and a freeform run does not, because the freeform loop's state lives inside the
  AI SDK's multi-step generation. Closing it means owning the turn loop. Large,
  and arguably a rewrite of the runner.
- **Nested parking.** Sub-agent nodes, reflection producers, debate producers, and
  peer waves cannot park today. Medium-large, and it unblocks the rest.
- **Recovery, not just reaping.** Attempts, leases, and a classified resume, so a
  dead run continues instead of being closed out. Medium.
- **Durable tools.** A checkpoint so a tool that provisions something resumes
  mid-way. Small-medium on top of parking.
- **A stronger sandbox.** A filesystem namespace, seccomp, a cgroup, installable
  packages. On reflection this is better bought than built, as an adapter for E2B
  or Daytona. Medium-large, and no longer blocking ordinary compute.
- **Channels.** Verified webhook ingress with signature checking and idempotency,
  then a route that starts a run. The first provider is most of the work.
- **Schedules.** A cron table plus a route that starts a run from a POST.
- **Skills.** The agentskills.io format is open and already has adopters.
  Progressive disclosure is a catalog line plus a read tool. Cheap, and it
  interoperates.
- **A thin client SDK.** Small. The CLI already has every call.
- **Context compaction.** Nothing here manages a growing conversation.
- **OpenTelemetry export.** The run tree is good, but a team with a tracing backend
  wants spans.
- **Evals.** Replay and comparison are halfway there.
- **Auth and tenants.** A bearer token is small. A real caller identity on every
  aggregate is medium-large, and every query grows a filter.

{{< agents-pager "compare" >}}
