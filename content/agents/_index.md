---
title: "agents"
layout: single
date: 2026-09-15T00:00:00-06:00
description: An agent platform where agents are database rows instead of code. Every save is versioned, everything is editable in the browser, and pipelines are graphs you draw.
tags: [typescript, llm, agents, orchestration, dag, postgres, sqlite, zod, openrouter]
categories: [Software]
url: /agents
aliases: [/agents.html]
---

{{< agents-nav "index" >}}

## The idea

In most agent frameworks an agent is a class you subclass and a pipeline is a
function you deploy. Rewording a prompt means a commit, a review, and a release.

Here an agent is a row. Tools are still code. Everything else is data. Changing
an agent is a save. The old version stays behind, and every run records which
version produced it, what each step cost, and what each sub-agent said.

That is the trade. You give up compile-time types on the agent definition. You
get something you can edit, version, replay, and A/B test without opening a repo.

```bash
npm install -g @upship/agents
agent serve
```

That serves the UI at `localhost:2137`. The package is
[`@upship/agents`](https://www.npmjs.com/package/@upship/agents) on npm. You need
an OpenRouter key first, and the quickest way to get an agent is to let the CLI
build one by asking you questions. Both are in
[Getting started](/agents/start).

<figure class="agents-shot">
<img src="/img/agents/graph-composer.jpg" alt="The graph composer: a four-way conditional router drawn on a canvas, with a node inspector open on the right" />
<figcaption>A conditional router on the canvas. Drag from one handle to another to connect two steps. Click a node or an edge to edit it. The same picture shows the pipeline while it runs.</figcaption>
</figure>

## Start here

<div class="agents-grid">
<div class="agents-card">
<h4><a href="/agents/start">Getting started</a></h4>
<p>One key, one install, and an agent you built by answering questions. About five minutes.</p>
</div>
<div class="agents-card">
<h4><a href="/agents/features">Features</a></h4>
<p>The full list, plus a tour of the screens. Pipelines, gates, debate, memory, cost tracking, versions.</p>
</div>
<div class="agents-card">
<h4><a href="/agents/tools">Tools</a></h4>
<p>What ships, how to call an HTTP API without writing code, and how to add a tool of your own.</p>
</div>
<div class="agents-card">
<h4><a href="/agents/sandbox">Running code</a></h4>
<p>An agent can write a script and run it. Here is exactly how far the sandbox goes, and where it stops.</p>
</div>
<div class="agents-card">
<h4><a href="/agents/cli-api">CLI, API, embedding</a></h4>
<p>The browser is one client. There is also a CLI, an HTTP API, and a runtime you can import.</p>
</div>
<div class="agents-card">
<h4><a href="/agents/running">Operating it</a></h4>
<p>Ports, hosts, where the files live, moving to Postgres, and the things that go wrong.</p>
</div>
<div class="agents-card">
<h4><a href="/agents/compare">How it compares</a></h4>
<p>Against Flue and against Sapiom, including the parts where they win.</p>
</div>
</div>

## What you can build with it

<div class="agents-grid">
<div class="agents-card">
<h4>Research briefs</h4>
<p>Search once. Send the results to an analyst and a fact-checker at the same time. Merge the two into one brief.</p>
</div>
<div class="agents-card">
<h4>Support triage</h4>
<p>A classifier reads the request and the pipeline picks one handler. The branches nobody took cost nothing.</p>
</div>
<div class="agents-card">
<h4>Deploy approvals</h4>
<p>A pipeline stops to ask a person which environments to ship to, then picks up where it left off. Hours later is fine.</p>
</div>
<div class="agents-card">
<h4>Draft and critique</h4>
<p>A writer and a critic trade drafts until the critic signs off. Every draft and every critique is kept.</p>
</div>
<div class="agents-card">
<h4>Incremental jobs</h4>
<p>A daily digest that remembers where it stopped. Two overlapping runs will not process the same thing twice.</p>
</div>
<div class="agents-card">
<h4>Number crunching</h4>
<p>Hand it a spreadsheet and let it write the Python. Files the script leaves behind come back attached to the run.</p>
</div>
<div class="agents-card">
<h4>Talking to your own API</h4>
<p>Point a step at an internal service. The key stays in the encrypted store and the model never sees it.</p>
</div>
<div class="agents-card">
<h4>Prompt A/B tests</h4>
<p>Replay a past run against a different version or a different tool, then compare the two outputs side by side.</p>
</div>
</div>

{{< agents-pager "index" >}}
