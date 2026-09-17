---
title: "agents: tools"
date: 2026-09-15T00:00:00-06:00
description: What ships, how to call an HTTP API without writing code, and how to add a tool of your own.
url: /agents/tools
---

{{< agents-nav "tools" >}}

<p class="agents-hero">
Agents are data. Tools are code. That is the one line you have to cross to add a
capability, and most of the time you do not have to cross it. Pointing an agent at
an HTTP API is a config change.
</p>

## What ships

About twenty tools come with it. Files, search, HTTP fetch, OCR, image
generation, shared state, durable memory, peer messaging, human gates,
self-critique, and a sandboxed script runner. An agent gets the ones you list in
its `tools` array and nothing else.

```bash
agent tools
```

That prints every tool an agent can name, which ones need to be configured first,
and where each one came from. It also lists the files that failed to load and
what went wrong in them. The Tools page in the browser shows the same thing.

## Tool definitions are data too

The implementation is code. The description, the settings, and the bound
credentials are a row on top of it. That means two definitions can share one
implementation:

- The same fetch tool pointed at two different accounts.
- Two wordings of a description, A/B tested against the same input.
- A script runner capped at thirty seconds and another one allowed ten minutes.

Anything a model should not be choosing belongs there rather than in the
parameters the model fills in. A question's wording, a sandbox's limits, a
namespace, an API key. If the model can set the timeout, the timeout is not a limit.

Definitions are versioned like everything else, so an old run still records the
description that was live when it ran.

## Calling an HTTP API

Before you write a tool, check whether you need one. If the thing you want is an
HTTP API with a key, the built-in fetch tool plus an encrypted secret gets you
there with no code.

Pin a definition to one host, put the credential in the headers, and the model
never sees it. A tool that can call one service cannot be talked into calling
another with your key attached.

### It will not touch your network by default

The fetch tool refuses anything that is not a public address. Your own machine,
your home or office network, and the ranges cloud providers reserve for
themselves are all turned down. It checks the hostname and the addresses that
name resolves to, and it re-checks every redirect hop, so a public URL cannot
bounce an agent somewhere private.

That default exists because the platform itself sits on one of those addresses.
Without it, an agent could ask its own server for your stored secrets and read
them back to you in an answer.

If you do want an agent to reach something on your network, you say so on a tool
definition. You can pin it to a single host while you are there.

## Secrets

Credentials go in an encrypted store and get referenced by name. The write API is
write-only, so a secret goes in and never comes back out over HTTP. Tool config
refers to it by name, the runtime resolves it at call time, and the model sees
neither the name nor the value.

Rotating a key is a save. Nothing redeploys.

## Writing your own tool

Write one file and restart. Everything in the `tools` folder next to where you
start the server loads at startup. Putting a file there is the whole installation.
There is no list to add it to.

```ts
// tools/whatsapp.ts
import { z } from "zod";
import { defineTool } from "@upship/agents/tools";

export default [
  defineTool({
    name: "parse_whatsapp",
    description:
      "Parse a WhatsApp export into messages. Pass `after` to get only what is newer " +
      "than a previous call. Use this instead of reading the file, since an export is " +
      "far too big to pass through a tool call.",
    parameters: z.object({
      path: z.string().describe("Path to the export."),
      after: z.string().optional().describe("Cursor from last time. Omit for the whole file."),
    }),
    async execute({ path, after }, ctx) {
      return parseExport(await ctx.files.read(path), after);
    },
  }),
];
```

The description is what the model reads to decide whether to call it, so write it
for the model. What it does, when to use it instead of something else, and what it
will not do. Every parameter gets a `.describe()`.

The schema gets used twice. Once to tell the model what the arguments are, and
once to check them when a pipeline step supplies them. A tool you write behaves
like one that shipped.

A file cannot take a name that already exists: the platform keeps the original
and tells you it did. Changes need a restart, because there is no reliable way to
unload code that is already running. `npm run dev`
restarts on its own.

## Packages and MCP servers

A tool package installs like any dependency and registers the same way. An MCP
server connects over stdio or HTTP at boot and its tools show up with a prefix.
Both land in the same registry as the built-ins, which means they get catalog
entries, tool definitions, config binding, and a line in the authoring brief
without any extra work.

## When not to write a tool

- **An HTTP API with a key.** Use the fetch tool and a secret.
- **A one-off calculation or a parse.** Let the model [write a script](/agents/sandbox) and run it.

Both of those are settings. Neither is a file.

{{< agents-pager "tools" >}}
