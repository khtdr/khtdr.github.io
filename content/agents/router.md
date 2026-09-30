---
title: "agents: a router"
date: 2026-09-29T00:00:00-06:00
description: Sort support messages with a classifier whose answer is checked JSON, send each one down the branch it belongs on, and ask a person when the classifier can't tell. Then stop the server while it waits, and watch the run pick up where it left off. The third of three tutorials.
categories: [Tutorials]
weight: 3
url: /agents/router
---

{{< agents-nav "router" >}}

<style>
.tut-series {
  font-family: "Reddit Mono", monospace;
  font-size: 0.82rem;
  color: var(--muted-color);
  margin: 0 0 14px;
}
.tut-series a { color: var(--muted-color); }
.tut-note {
  background-color: var(--well-color);
  border: 1px solid var(--card-border);
  border-left: 3px solid var(--accent-color);
  border-radius: 6px;
  padding: 10px 14px;
  margin: 16px 0 22px;
  font-size: 0.92rem;
}
.tut-note p { margin: 0; }
.tut-note p + p { margin-top: 8px; }
.tut-next {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 18px 0 8px;
}
.tut-next > * {
  flex: 1 1 220px;
  background-color: var(--well-color);
  border: 1px solid var(--card-border);
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 0.92rem;
}
.tut-next h4 { margin: 0 0 4px; font-size: 1rem; }
.tut-next p { margin: 0; }
</style>

<p class="tut-series">Tutorial 3 of 3 · previous: <a href="/agents/pipeline">a pipeline</a></p>

The pipeline in tutorial 2 ran the same steps in the same order every time.
This one decides. A support message comes in, a classifier says whether it is a
bug report or a question, and the message goes down one branch: bugs become a
ticket for engineers, questions get a reply drafted from the help docs. When
the classifier can't tell, the run stops and asks a person, and it can wait
for them as long as it takes, through a server restart.

The page is built in stops. After each one you have something that runs, so you
can stop after any of them:

1. **A classifier** whose answer is JSON the platform has checked.
2. **Two handlers**, one per kind of message.
3. **Routing**: a graph that sends each message to one handler.
4. **A person** for the messages the classifier can't place.
5. **A restart** in the middle of a run that is waiting on that person.

Every agent on this page is also a JSON file you can download. Each step says
which one.

## Before you start

This page assumes you did [tutorial 2](/agents/pipeline): you have made an
agent in **All Agents**, built a graph in the composer, and read a run in
**Run History**. It does not use `changelog-writer`.

It needs version 0.2.10 or later, for the docs folder in step 2 and
`{{run.input}}` in step 3:

```bash
npm install -g @upship/agents
agent start
```

The example is the support inbox of Tally, a made-up shared to-do list app.
Its help docs are four short markdown files. Put them in a folder under
`~/code`, which the install allows tools to read:

```bash
mkdir -p ~/code/helpdesk/docs && cd ~/code/helpdesk/docs
for f in accounts billing exporting sharing; do
  curl -sO https://khtdr.com/agents/router/docs/$f.md
done
```

If your projects live somewhere else, put the folder there instead, or run
`agent add-data-dir ~/code/helpdesk` to allow it.

## 1. A classifier

Open **All Agents**, click **New Agent**, and fill in:

- **Name:** `triage-classifier`
- **Description:** `Classifies a support message as a bug report, a question, or neither, and says how sure it is`
- **Model Tier:** `fast`
- **Max Steps:** `1`
- **System Prompt:**

```text
You sort messages sent to the support inbox of Tally, a shared to-do list app.

Decide what the message is:

- bug: something in Tally is broken or behaves differently from how it should.
- question: the person wants to know how to do something, or how something works.
- other: neither, such as a sales pitch, a thank-you, or a message too vague to place.

Give a confidence from 0 to 1 for your choice. Use the whole range. A message
that could honestly be read either way is below 0.6, even if you lean one way.
```

The new part is **Output Schema**, above Tools. Click **+ Classifier starter**,
then change the `enum` to this page's three kinds and put limits on the
confidence:

```json
{
  "type": "object",
  "properties": {
    "intent": { "type": "string", "enum": ["bug", "question", "other"] },
    "confidence": { "type": "number", "minimum": 0, "maximum": 1 }
  },
  "required": ["intent", "confidence"],
  "additionalProperties": false
}
```

Pick no tools, and click **Create Agent**. (Or skip the form:
[`triage-classifier.json`](/agents/router/triage-classifier.json), and
`curl -s localhost:2137/api/agents -H 'content-type: application/json' -d @triage-classifier.json`.)

Run it:

```bash
agent triage-classifier "How do I turn on two-step sign-in?"
```

```text
╭─ triage-classifier ─── streaming
│
│ {
│   "intent": "question",
│   "confidence": 0.95
│ }
│
╰─ ✓ 1 steps · 3.8s · 722 tokens · 561b550d
```

That looks like a model that was asked for JSON and returned some. The
difference is what happened before you saw it. The platform parsed the answer
and checked it against the schema. `intent` is one of the three words, and
`confidence` is a number between 0 and 1. Only then did the run finish. Open
the run in **Run History**: its output is a block marked **Structured Output**
and **validated**, not text. The next step reads fields out of that value,
and it can because the value is guaranteed to have them.

<div class="tut-note">
<p><strong>When the model gets it wrong.</strong> If the answer is not JSON, or
it breaks the schema, the platform sends it back once with the complaint:
<code>/intent: must be equal to one of the allowed values</code>. One retry
usually fixes a drifted field. If the second answer breaks the schema too, the
run ends as an error rather than handing on text that only looks right. The
retry costs a second model call, and the run's token count includes it.</p>
</div>

The mistake this saves you from is routing on prose. With no schema, the
classifier would answer "This looks like a bug report", and the next step
would have to search that sentence for the word "bug". That works until the
model writes "This is not a bug".

## 2. Two handlers

Each kind of message gets an agent of its own. Neither one knows anything about
routing. Each is handed a customer's message and does one job with it.

**The bug writer.** **New Agent**:

- **Name:** `bug-writer`
- **Description:** `Turns a support message that reports a bug into a bug ticket for the engineering queue`
- **Model Tier:** `default`, **Max Steps:** `1`, no tools
- **System Prompt:**

```text
You turn a customer's support message about Tally, a shared to-do list app,
into a bug ticket for engineers.

Write markdown with these parts:

# <one-line title naming what is broken>

**Reported:** the customer's own words, quoted.
**What happens:** what they see.
**Expected:** what should happen instead.
**Unknowns:** what an engineer would need to ask them, as a short list.

Use only what the message says. Do not guess at causes, and do not invent
steps the customer did not describe.
```

([`bug-writer.json`](/agents/router/bug-writer.json))

**The docs answerer.** It needs to read the help docs, and nothing else. The
file tools can read anywhere the install allows, which includes all of
`~/code`, so this step makes two narrower ones: a search and a read that only
see the docs folder. They are **tool definitions**, the same layer you met in
tutorial 1's memory exercise: a row that points at a built-in tool and fixes
part of its config.

The folder has to be a full path. Find yours:

```bash
echo ~/code/helpdesk/docs
```

Open **Tools**, click **New Definition**, and fill in:

- **Name:** `search-helpdesk-docs`
- **Implementation:** `search_files`
- **Description:** `Searches the Tally help docs for a word or phrase and returns the matching lines with their file names. Search '.' to cover every doc.`
- **Config**, with your path:

```json
{ "root": "/Users/you/code/helpdesk/docs" }
```

Then a second one:

- **Name:** `read-helpdesk-doc`
- **Implementation:** `read_file`
- **Description:** `Reads one Tally help doc in full, by its file name, such as billing.md.`
- **Config:** the same `root`.

([`search-helpdesk-docs.json`](/agents/router/search-helpdesk-docs.json) and
[`read-helpdesk-doc.json`](/agents/router/read-helpdesk-doc.json), posted to
`/api/tools`. Change the path first.)

`root` is the folder the model's paths start from, and a wall. The model asks
for `billing.md`, not a full path, and a path that climbs out, like
`../../.ssh/id_rsa`, is refused even though the install would allow it. The
refusal goes back to the model as the tool's result, so it can try something
else, and the run carries on. A `root` outside what the install allows fails
the run as it starts, naming the folder, before any model is called.

Now the agent. **New Agent**:

- **Name:** `docs-answerer`
- **Description:** `Drafts a reply to a customer's question about Tally from the help docs`
- **Model Tier:** `default`, **Max Steps:** `8`
- **Tools:** `search-helpdesk-docs` and `read-helpdesk-doc`
- **System Prompt:**

```text
You draft replies to customers' questions about Tally, a shared to-do list app.

Answer only from the help docs. search-helpdesk-docs finds which doc mentions
something, and read-helpdesk-doc reads a doc by its file name. Search at most
three times, then read the whole doc the best match came from. The docs are
short, so if three searches find nothing that answers the question, the docs
do not cover it.

Reply with only this markdown, and nothing before it:

# Re: <the question, in a few words>

The reply to the customer, in two to five sentences, in plain words.

**Source:** the doc file or files the answer came from.

If the docs do not answer the question, say so in the reply, and write
**Source:** none.
```

([`docs-answerer.json`](/agents/router/docs-answerer.json))

The prompt doesn't say where the docs are. The tools already know.

Try it alone:

```bash
agent docs-answerer "Can I export attachments too?"
```

```text
╭─ docs-answerer ─── streaming
│
│ ⚡ search-helpdesk-docs {"pattern":"export.*attachment","path":".","maxResults":50}
│   ↳ done
│ ⚡ search-helpdesk-docs {"pattern":"attachment.*export","path":".","maxResults":50}
│   ↳ done
│ ⚡ search-helpdesk-docs {"pattern":"export","path":".","maxResults":50}
│   ↳ done
│ ⚡ read-helpdesk-doc {"path":"exporting.md"}
│   ↳ done
│ # Re: Exporting attachments
│ 
│ No, exports do not include attachments. You'll need to download those directly from each task before exporting if you want to save them.
│ 
│ **Source:** exporting.md
│
╰─ ✓ 3 steps · 7.5s · 5,272 tokens · 0aa5af2f
```

Four tool calls in three steps: the model sent some of them together, and the
third step was the answer. Each step is one model call, and **Max Steps** is
how many it gets. An agent that spends them all and is still calling tools has not answered, so the run
ends as an error rather than handing on half a thought. Here is the same
question with **Max Steps** set to `2`:

```text
│ ⚡ read-helpdesk-doc {"path":"exporting.md"}
│   ↳ done
│ Error: Agent "docs-answerer" used all 2 steps without a final answer. Raise maxSteps or narrow what it has to do.
│
╰─ ✗ 2 steps · 5.2s · 3,169 tokens · 26220abe
```

In a graph, that error stops the run at this node, so nothing half-finished
reaches `save`. The "at most three times" in the prompt gives a question the
docs don't cover a place to stop. Asked about dark mode,
which no doc mentions, it searched three times and wrote **Source:** none.

## 3. Routing

The router is a graph agent, like `release-notes` in tutorial 2, with one
difference. There, every edge fired. Here, an edge can have a **condition**,
and it fires only when the condition holds.

**New Agent**:

- **Name:** `triage`
- **Description:** `Sorts a support message into a bug ticket or a drafted answer, and asks a person when it can't tell`
- **System Prompt:** `Sorts support messages. The graph does the work.` (Required
  by the form, never sent to a model.)

Under **Graph Pipeline**, click **+ Add Graph**, and add four nodes, in this
order:

1. **Id** `classify`, **Ref** `triage-classifier`. No input.
2. **Id** `bug`, **Ref** `bug-writer`. One input param: `input`, set to
   `{{run.input}}`.
3. **Id** `answer`, **Ref** `docs-answerer`. The same param: `input`, set to
   `{{run.input}}`.
4. **Id** `save`, **Ref** `write_file`. Two params: `path` set to `ticket.md`,
   and `content` left as `{{input}}`.

**`{{run.input}}` is the message the run was started with.** Tutorial 2 used
`{{input}}`, which is whatever the node before handed on. Here that would be
the classifier's JSON, `{"intent":"bug","confidence":0.95}`, and the bug writer
would write a ticket about a classification. A handler needs the customer's
words, so it reaches past the node before it to the run's own input.

Now the edges. Until now the graph ran in list order. Drag from the handle on
the right of `classify` to the one on the left of `answer`. The first edge you draw writes the
list order down as edges too, so the canvas now has four:
`classify → bug`, `bug → answer`, `answer → save`, and the one you drew. One of
them is wrong. Click `bug → answer` and change **To** to `save`. Every node is
now wired: `classify` to each handler, and each handler to `save`.

Click `classify → bug` and give it a **Condition**:

```text
output.intent == 'bug' && output.confidence >= 0.8
```

and `classify → answer`:

```text
output.intent == 'question' && output.confidence >= 0.8
```

`output` is the classifier's checked value from step 1. Save. This is the
graph, and what `GET /api/agents/triage` returns under `graph`:

```json
{
  "nodes": [
    { "id": "classify", "ref": "triage-classifier" },
    { "id": "bug",      "ref": "bug-writer",    "input": { "input": "{{run.input}}" } },
    { "id": "answer",   "ref": "docs-answerer", "input": { "input": "{{run.input}}" } },
    { "id": "save",     "ref": "write_file",    "input": { "path": "ticket.md", "content": "{{input}}" } }
  ],
  "edges": [
    { "from": "classify", "to": "bug",    "condition": "output.intent == 'bug' && output.confidence >= 0.8" },
    { "from": "classify", "to": "answer", "condition": "output.intent == 'question' && output.confidence >= 0.8" },
    { "from": "bug",      "to": "save" },
    { "from": "answer",   "to": "save" }
  ]
}
```

Send it a question:

```bash
agent triage "Can I pay yearly?"
```

```text
│ ⚡ classify (triage-classifier)
│   ↳ 0.9s
│ ⊘ bug skipped
│ ⚡ answer (docs-answerer)
│   ↳ 7.4s
│ ⚡ save (write_file)
│   ↳ 0.0s
│ {"path":"/Users/you/.agents/output/7d017a71-…/ticket.md","mimeType":"text/markdown","bytesWritten":258}
│
╰─ ✓ 3 steps · 8.3s · 4,672 tokens · 7d017a71
```

`bug` was **skipped**. Its only way in was an edge whose condition was false,
so it could never run, and the runner said so and moved on. It cost nothing:
no model was called for it.

Look at `save`. It has two edges coming in, and only one of them fired. A
runner that waits for every parent before starting a node would wait here
forever for `bug`. This one waits until each incoming edge has either fired or
been ruled out, then runs on the ones that fired. Ruling out spreads: a skipped
node's own edges are ruled out in turn. So `save` got the answer, and nothing
else. When more than one parent fires, their outputs are joined, which is the
`concat` in the composer's **Merge (fan-in)** box. Here only one branch ever
fires, so there is nothing to choose between.

**A typo in a condition does not wait for a run to find it.** Click
`classify → bug` and change `==` to `=`. The box turns red as you type, because
the composer runs the same parser the server does. Save anyway, and the server
refuses the whole graph, naming the edge:

```text
{"error":"Validation failed","fields":{"graph.edges.0.condition":["Unexpected character \"=\""]}}
```

A condition is not JavaScript. It is a small fixed language: comparisons, `&&`,
`||`, `!`, field access, and a few read-only string methods like `includes`.
It can't call anything or change anything, which is why it is safe to accept
over HTTP. **Docs → Graphs** in the install's own UI lists all of it. Put the `==`
back, and save.

Now send a message that is hard to place:

```bash
agent triage "My lists look weird since yesterday."
```

```text
│ ⚡ classify (triage-classifier)
│   ↳ 3.0s
│ ⊘ bug skipped
│ ⊘ answer skipped
│ ⊘ save skipped
│ Error: Graph "triage" produced no output: every terminal branch was skipped by an edge condition.
│
╰─ ✗ 0 steps · 3.0s · 63fb5faf
```

Open the run and look at the classifier's answer: `bug`, at `0.75`. Below the
line, so neither edge fired, both handlers were skipped, and the skipping
spread to `save`. A graph that ends with nothing is a bug in its conditions,
not a result, so the run fails and says why. That hole is what the next step
fills.

<div class="tut-note">
<p><strong>Why 0.8 and not 0.6?</strong> The classifier's prompt says 0.6, and
it doesn't mean it. In testing, the <code>fast</code> tier never went below
0.65, even for "export??". Clear messages came back at 0.85 to 0.95, and vague
ones at 0.75. A threshold of 0.6 would never have fired. A model's confidence
is its opinion, not a probability, so set the line by reading what yours
actually says in <strong>Run History</strong>, not by what the prompt asks
for.</p>
</div>

## 4. A person

When the classifier can't tell, ask someone who can. `ask_human` is a tool that
stops the run and puts a question to a person. The question is not something
the model writes. It is fixed config on a tool definition, like the docs
folder in step 2, so each question is a row with its own name and version.

Open **Tools**, click **New Definition**, and fill in:

- **Name:** `which-bucket`
- **Implementation:** `ask_human`
- **Description:** `Asks a person whether a support message is a bug report or a question`
- **Config:**

```json
{
  "question": "Is this message a bug report or a question?",
  "cardinality": "single",
  "options": ["bug", "question"]
}
```

([`which-bucket.json`](/agents/router/which-bucket.json), posted to
`/api/tools`.)

`cardinality: single` means one of the options, and nothing else. The platform
works out what a valid answer looks like from the options, so an answer of
`feature` is refused before it reaches the run.

Now edit `triage`. **+ Add Node**: **Id** `ask`, **Ref** `which-bucket`, and
one input param, `context`, set to `{{run.input}}`. That is the one thing the
person needs beside the question: the message itself.

Draw three edges and give each a condition:

| From | To | Condition |
|---|---|---|
| `classify` | `ask` | `output.intent == 'other' \|\| output.confidence < 0.8` |
| `ask` | `bug` | `output.answer == 'bug'` |
| `ask` | `answer` | `output.answer == 'question'` |

The first is the exact opposite of the other two edges out of `classify`, so
every message goes exactly one way. The other two route on the person's answer.
A person answering `ask` produces `{ "answer": "bug" }`, a checked value, like
the classifier's. An edge can't tell which of the two it is reading, and doesn't
need to. The person is a classifier that takes longer to answer.

This is also why the handlers read `{{run.input}}`. When a person routed the
message, the node before `bug` is `ask`, and all it hands on is
`{ "answer": "bug" }`. `{{run.input}}` gets the handler the message whichever
way it came.

Save. The whole graph is
[`triage.json`](/agents/router/triage.json). Send the vague message again:

```bash
agent triage "My lists look weird since yesterday."
```

```text
│ ⚡ classify (triage-classifier)
│   ↳ 3.0s
│ ⚡ ask (which-bucket)
│ ⏸ ask waiting token 3f536eff-276e-4231-aa2e-6968c68301f6
│ Waiting on which-bucket (token 3f536eff-276e-4231-aa2e-6968c68301f6).
│
╰─ ⏸ 1 steps · 3.0s · e623d300

⏸ which-bucket (node ask)

Is this message a bug report or a question?
My lists look weird since yesterday.
  1) bug
  2) question
Choose 1-2:
```

The terminal asks because you started the run from it, and you are the nearest
person. Don't answer. Press Ctrl-C.

## 5. A restart

The run is not in your terminal, and it is not in the server's memory either.
When `ask` stopped, the run saved what it had so far to its own row, the
classifier's answer, and marked itself `paused`. Nothing is holding it open.
To prove it, stop the server:

```bash
agent stop
agent start
agent pending triage
```

```text
Waiting (1)

  triage e623d300 · 0m
    ⏸ Is this message a bug report or a question?

Answer triage e623d300? [y/N]
```

It is still there. It would be there tomorrow. A paused run has no deadline
unless its tool definition sets one (`timeoutMs`), and the process that watches
for crashed runs leaves paused ones alone. In the browser, **Run History**
shows it as `paused`. Open it, and the question is on the run's page with an
**Answer** button.

Answer it here, in the terminal: `y`, then `1`.

```text
Answer triage e623d300? [y/N] y

⏸ which-bucket (node ask)

Is this message a bug report or a question?
My lists look weird since yesterday.
  1) bug
  2) question
Choose 1-2: 1

✓ resumed

{"path":"/Users/you/.agents/output/e623d300-…/ticket.md","mimeType":"text/markdown","bytesWritten":712}
```

```bash
cat ~/.agents/output/e623d300-*/ticket.md
```

```text
# Lists displaying incorrectly since yesterday

**Reported:** "My lists look weird since yesterday."

**What happens:** Lists are displaying in an abnormal way as of yesterday.

**Expected:** Lists should display normally as they did before yesterday.

**Unknowns:**
- What specifically looks "weird" about the lists? (layout, formatting, colors, fonts, spacing, missing elements, etc.)
- Which lists are affected? (all lists, specific lists, shared lists, personal lists)
- What platform/device are they using? (web, iOS, Android, desktop app)
...
```

Now open the run in **Run History** and expand it. It has two children:
`triage-classifier`, which ran before the restart, and `bug-writer`, which ran
after it. There is only one classifier run. On resume, the graph started again
from the top, and every node that already had an output was served from what
was saved instead of being run. `classify` cost one model call, not two. Then
`ask` took your answer as its output, the `ask → bug` edge fired, `answer` was
skipped, and the rest ran as if nobody had waited.

The run's steps show the answer too. Between the question and `bug-writer` is
a step named `which-bucket:resolved`, holding `{ "answer": "bug" }` and when
it was given, so the record of the run says what the person decided, not only that
someone did.

The run's **Duration** includes the wait, because the run really did take that
long. Its cost doesn't: waiting is free.

<div class="tut-note">
<p><strong>Why <code>ask</code> is a node in this graph.</strong> A run can
pause only at its own top level. If the person's question were asked from
inside one of the handlers, the handler's run would pause under a parent that
has no way to wait for it, and the parent node would fail. That is
<a href="https://github.com/upship-ai/agents/issues/46">nested parking</a>,
which isn't built yet. Put the question where the graph can see it.</p>
</div>

## What it cost

Three runs from testing, as the **Pipeline** card on each `triage` run reported
them:

- **A clear bug:** about 0.4¢, 8 to 9 seconds. The classifier on `fast` and
  the bug writer on `default`, one model call each.
- **A clear question:** about 1.6¢, 8 to 9 seconds. The docs answerer searches
  and reads, and each of those is another call with the conversation so far.
- **A person decided it was a bug:** about 0.4¢, the same as a clear bug. The
  wait added nothing, and the classifier was not paid for twice.

A skipped branch costs nothing, which is the case for routing over one agent
that handles every kind of message. The bug path never pays for the docs
search, and nothing pays for a model to decide which path to take after the
classifier has.

## Now your turn

The classifier has a third answer, `other`, and so far only the person has
anything to do with it. Give `other` somewhere to go without asking:

- **Add a third option to `which-bucket`**, `neither`, and a branch for it: a
  `write_file` node that saves `{{run.input}}` as `needs-reply.md`, with an edge
  from `ask` on `output.answer == 'neither'`. No new agent. Note that the new
  node is a second place the graph can end. What happens to `save` when it is
  the branch that runs?
- **Set the threshold from history.** Send the classifier twenty messages of
  your own, clear and vague, and read the confidences in **Run History**. Where
  would you put the line so that a person sees the vague ones and never the
  clear ones?
- **Answer one from the browser.** Start a vague run, open it in **Run
  History**, and answer it there instead of from the terminal.

Where to go from here: `interview` is `ask_human`'s multi-turn version, for
when the next question depends on the last answer. Debate and reflection have
several agents check or compete on one answer. All three are on the
[features page](/agents/features).

When you are done:

```bash
agent stop
```

<div class="tut-next">
<div>
<h4>Back to the overview</h4>
<p><a href="/agents">What the platform does</a> and the <a href="/agents/features">full feature list</a>.</p>
</div>
<div>
<h4>How it compares</h4>
<p><a href="/agents/compare">Against other agent frameworks</a>, including what they do that this doesn't.</p>
</div>
</div>

{{< agents-pager "router" >}}
