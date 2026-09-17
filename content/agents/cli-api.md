---
title: "agents: CLI, API, embedding"
date: 2026-09-15T00:00:00-06:00
description: The browser is one client. There is also a CLI, an HTTP API, and a runtime you can import into your own app.
url: /agents/cli-api
---

{{< agents-nav "cli-api" >}}

<p class="agents-hero">
The web UI is a client, not the product. Everything it does is an HTTP call, the
CLI makes the same calls, and the engine underneath both is a library you can
import. Pick whichever one fits what you are doing.
</p>

## The CLI

It streams output, takes piped input and file attachments, and prompts you right
there when a run stops to ask something.

```bash
agent researcher "what changed in HTTP/3 this year"
echo "summarize this" | agent summarizer -f notes.md

agent new                # build an agent by answering questions
agent skill install      # teach Claude Code to write agents here
agent brief              # what this install can do, as one document
agent tools              # every tool an agent can use, and where each came from
```

`agent pending` is the inbox of everything waiting on a person:

```text
agent pending
# Waiting (1)
#
#   support-router aa3793db · 19h
#     ⏸ Which environments should this go to?
```

## The HTTP API

It is the same API the UI uses. About forty routes covering agents, runs, tools,
secrets, memory, models, files, and the brief. Anything you can click, you can
script.

```bash
curl -X POST localhost:2137/api/agents/researcher/run \
  -H 'content-type: application/json' \
  -d '{"input": "what changed in HTTP/3 this year"}'

curl localhost:2137/api/brief                 # what this install can author
curl localhost:2137/api/runs/pending          # every run waiting on a person
curl -X POST localhost:2137/api/runs/$ID/pending/$TOKEN \
  -d '{"response": {"answer": ["staging"]}}'  # and answering one
```

There is no authentication on it. That is why it binds to `127.0.0.1` by default.
See [operating it](/agents/running) before you expose it.

## Embedding it in your own app

The runtime that `agent serve` wraps is also a library. Your code calls `runAgent`
as a function, the runs land in a database you choose, and there is no HTTP in
between. Your app keeps its own login and its own users. The agents become a
feature of it.

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

Set `OPENROUTER_API_KEY` and `STORE_DRIVER=sqlite`, then run it with
`node example.ts` on Node 24 or later.

`createRuntime` does what the server does at startup. It opens the store, sets up
tools and models, and starts the cleanup timers. A script that runs once turns the
timers off. A server that stays up leaves them on and calls `rt.stop()` on
shutdown.

Every feature works the same way here. Graphs, gates, memory, secrets and cost
tracking all live in the runtime, not in the server. The one part that does not
come along is the web UI, which is a static page over the HTTP API. Read runs out
of the store and show them your own way.

To upgrade, run `agent bundle` again after updating the CLI. The Embedding page in
the web UI walks through this example a line at a time and says what each one
commits you to.

{{< agents-pager "cli-api" >}}
