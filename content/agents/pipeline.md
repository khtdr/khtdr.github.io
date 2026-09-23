---
title: "agents: a pipeline"
date: 2026-09-23T00:00:00-06:00
description: Put the changelog writer in a graph as one step, with a git read before it and a file written after it, read the cost of the whole run, then add a gate that sends bad work back. The second of three tutorials.
url: /agents/pipeline
---

{{< agents-nav "pipeline" >}}

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

<p class="tut-series">Tutorial 2 of 3 · previous: <a href="/agents/first-agent">your first agent</a> · next: a router (coming soon)</p>

The first tutorial left you with one agent, `changelog-writer`, that reads a
repository and writes release notes. By the end of this page it will be one
step of four in a pipeline: read the commits, write the notes, check them, save
them to a file. The check sends the notes back to the writer when they are
wrong, and you will watch it happen.

Nothing on this page is code. The pipeline is another agent, and its steps are
a list on that agent's row.

## Before you start

This page assumes you did [tutorial 1](/agents/first-agent): `changelog-writer`
exists, and the repository you used is in a directory the install allows. The
memory exercise at the end of that page is optional. If you did it, leave that
part of the prompt as it is.

Start the server, and stand in the repository:

```bash
agent start
cd ~/code/myproject
```

## 1. Teach the writer to take commits

Right now the writer reads the commits itself: its prompt says to call
`git_log`. In the pipeline, a step before it will read them, and the writer
will be handed the result. It needs to know it may be given its commits instead
of a path.

Open `changelog-writer` in **All Agents**, click **Edit**, and add a sentence
after the one that tells it to call `git_log`:

```text
If the input already holds the commits, as a JSON object with a commits list,
use those and do not call git_log.
```

Save. That is a new version, and the agent still works on its own, the way it
did in tutorial 1. One row, two uses. Without this sentence the writer usually
works anyway, because the model notices it has the commits. "Usually" is not
good enough for a step in a pipeline. When it does call `git_log` again, it
pays to send all 40 commits back through the model a second time.

## 2. The pipeline

A pipeline here is an agent with a **graph**, an ordered list of steps called
nodes. A node names a tool or an agent, and each node's output becomes the next
node's input. There is no model deciding what to do next. The order is the
list.

Open **All Agents** and click **New Agent**. Fill in:

- **Name:** `release-notes`
- **Description:** `Reads a repository's recent commits, writes release notes, and saves them as a file`
- **System Prompt:** `Reads commits, writes release notes, saves them.` The form
  requires a prompt, but a graph agent never sends it to a model. The nodes do
  the work.

Leave the tier alone and pick no tools. Then, under **Graph Pipeline**, click
**+ Add Graph**. A canvas opens with one node, `node-1`. Click it, and the
panel beside the canvas edits it.

1. **The first node reads the commits.** Set **Id** to `log` and **Ref** to
   `git_log`. Under **Input**, click **+ param**, type `repo` as the name, and
   leave the value as `{{input}}`.
2. **The second node writes the notes.** Click **+ Add Node**, which adds a
   node after the last one. Set **Id** to `write` and **Ref** to
   `changelog-writer`, your agent from tutorial 1, which the list shows beside
   the tools. Give it no input.
3. **The third node saves them.** **+ Add Node** again. **Id** `save`, **Ref**
   `write_file`, and two params: `path` set to `RELEASE_NOTES.md`, and `content`
   left as `{{input}}`. Name the first param before you add the second.

Click **Create Agent**. The composer and the JSON are the same thing. This is
what you just made, and it is what `GET /api/agents/release-notes` returns
under `graph`:

```json
{
  "nodes": [
    { "id": "log",   "ref": "git_log",          "input": { "repo": "{{input}}" } },
    { "id": "write", "ref": "changelog-writer" },
    { "id": "save",  "ref": "write_file",       "input": { "path": "RELEASE_NOTES.md", "content": "{{input}}" } }
  ]
}
```

`{{input}}` means whatever came into this node. For the first node that is what
you ran the agent with. For every other node it is the output of the node before
it. A tool takes named parameters, so a tool node maps `{{input}}` onto them. An
agent takes one input, so a node with no mapping, like `write`, is handed the
upstream output whole. Here that is the list of commits `git_log` returned. You
can also reach into structured output, as in `{{input.commits}}`. Tutorial 3
needs that, and this page does not.

## 3. Run it

From the repository:

```bash
agent release-notes .
```

The terminal prints a line as each node starts and how long it took:

```text
╭─ release-notes ─── streaming
│
│ ⚡ log (git_log)
│   ↳ 0.0s
│ ⚡ write (changelog-writer)
│   ↳ 18.5s
│ ⚡ save (write_file)
│   ↳ 0.0s
│ {"path":"/home/you/.agents/output/72e3a46b-…/RELEASE_NOTES.md","mimeType":"text/markdown","bytesWritten":2821}
│
╰─ ✓ 3 steps · 18.6s · 72e3a46b
```

Two of the three nodes took no time, because two of them are not model calls.
`git_log` runs git, and `write_file` writes a file. The only model in the run is
the one inside `changelog-writer`. The output is what the last node returned,
which for `write_file` is where it wrote:

```bash
cat ~/.agents/output/72e3a46b-*/RELEASE_NOTES.md
```

(With your own run id, from the last line.) The file is not in your repository.
Tools can read from the directories the install allows, but they can write only
inside a directory of the run's own under `~/.agents/output`, named after the
run. So two runs that both write `RELEASE_NOTES.md` get two files, a run cannot
overwrite another run's output, and a pipeline you are still trying out cannot
touch your working tree.

Now run it in the browser. Open `release-notes` and click **Run**, give it the
full path to the repository, and watch the **Graph** under the input box. Each
node turns yellow while it runs and green when it finishes, with its time and
cost printed under it.

## 4. The run in history

Open **Run History**. The `release-notes` run has a ▶ beside it, and a count.
Expand it and `changelog-writer` is underneath, as a run of its own. An agent
used as a node runs the same way it runs when you call it by name. It gets a run
record with its own steps, tokens and version, and that record points at the
run that called it.

Click the `release-notes` run. Two things are different from the runs in
tutorial 1.

- **Model** is a dash. The graph itself called no model, so there is none to
  name. The child's run names the model its tier resolved to.
- **There is a Pipeline card**, reading something like
  `18.5s · 14,098 tok · $0.0499`, and a **Pipeline** section below the numbers
  that lists the child runs, each linked to its own page.

The **Trace** shows the three nodes as call and result pairs: the `git_log`
arguments and the commits that came back, the input `changelog-writer` was
handed, and the path `write_file` returned. Click through to the
`changelog-writer` run and its trace has one step, the notes. It did not call
`git_log`, which is the sentence you added in step 1 at work.

## 5. What it cost

The Pipeline card is the sum of the run and everything under it. Here that is
one child, so the parent's tokens and cost are exactly the writer's. Two of the
three nodes cost nothing, and the graph charged nothing for deciding what to run
next, because nothing decided.

That is the case for a graph over a freeform agent with three tools. When
`changelog-writer` runs on its own, the model makes one call to decide to use
`git_log` and a second to write the notes. In the pipeline it makes only the
second. On a run like this the saving is small, about a thousand tokens. The better
reasons are that the steps happen in the same order every time, and that when a
run fails, the node that failed is named.

Keep the number in mind. The next step makes it bigger.

## 6. A gate

The notes go straight to a file, whatever they say. A **gate** is a node that
checks the output of the step before it. If the check passes, the output goes on
unchanged. If it fails, the gate can let it through anyway, stop the run, or send
the work back to be done again with the complaint attached. This page uses the
last.

The checker is an agent. Make a second one: **New Agent**, and fill in

- **Name:** `notes-reviewer`
- **Description:** `Checks that release notes end by thanking the commit authors`
- **Model Tier:** `reasoning`
- **System Prompt:**

```text
You check release notes before they are published. You do not rewrite them.

Check one thing: the last line starts with "Thanks to" and is followed by at
least one name. You see the notes but not the commits, so you cannot know who
the authors are. Any names will do.

If it does, reply with the single word APPROVED and nothing else.

If it does not, do not write APPROVED anywhere. Say in one line what the writer
should add.
```

No tools. Create it. The rule is one the writer's prompt says nothing about, so
the first draft will usually break it. That is deliberate, so that you see the
gate work.

Now put it in the pipeline, between `write` and `save`. **+ Add Node** always
adds at the end, so edit `release-notes`, select `save`, click **Delete**, and
then add two nodes:

1. **Id** `check`, **Ref** `notes-reviewer`. Tick **validation gate**. **Pass
   phrase** is already `APPROVED`. Set **On fail** to `retry` and **Max retries**
   to `2`.
2. `save` again, as before: `write_file`, `path` set to `RELEASE_NOTES.md`,
   `content` set to `{{input}}`.

Save, and run it again:

```text
│ ⚡ log (git_log)
│   ↳ 0.0s
│ ⚡ write (changelog-writer)
│   ↳ 21.6s
│ ⚡ check (notes-reviewer)
│   ↳ 3.6s
│ ⚡ write (changelog-writer)
│   ↳ 20.8s
│ ⚡ check (notes-reviewer)
│   ↳ 6.6s
│ ⚡ save (write_file)
│   ↳ 0.0s
```

`write` ran twice. The first draft had no thanks line, the reviewer said so, and
the gate ran `write` again with the complaint added to the end of its input:

```text
---
Feedback from gate "check":
The release notes are missing the closing line that thanks the contributors.
Please add a final line starting with "Thanks to" followed by the names of the
people who contributed to this release.
```

The second draft ended with a line thanking the commit authors by name, the
reviewer said `APPROVED`, and the run went on. In the Playground the same thing happens on the
graph: `write` goes yellow a second time after it was green. In **Run History**
the run now has four children, two writes and two checks, and each is a run you
can open.

One thing trips everyone up at first. `save` wrote the notes, not the word
APPROVED. A gate that passes hands on its own input, the draft it was checking,
so a gate can sit between two steps without the step after it knowing it was
there.

<div class="tut-note">
<p><strong>A gate is only as good as its checker.</strong> The reviewer is a
model, and it can be wrong in both directions. It can pass notes that break the
rule, and it can invent a rule you never wrote. Three habits help. Check one
thing per gate. Make it a thing the checker can see: this one gets the notes and
not the commits, which is why its prompt says any names will do. Before that
sentence was added, it rejected good notes for thanking the wrong people. And
spend a better model on the checker, since its answer is one word and it costs
little.</p>
<p>If the reviewer never approves, the run ends as an error after the last retry,
and the message is the reviewer's last complaint: <code>Gate "check" rejected
the output after 2 retries: …</code>. A gate asserts something, and an
assertion that never held has no best-effort answer. Nothing is written.</p>
</div>

Look at the Pipeline card on this run. The reviewer costs about a cent a check.
The retry is what costs: it is another whole writer run, with every commit sent to the model again.
A run that went back once costs about twice what one that passed first time
does. Your numbers will differ, but that ratio holds. A gate earns its keep when
failing is worse than paying twice, and its rule should be one the writer
usually gets right. The fix for a rule the writer always breaks is to put it in
the writer's prompt.

## Now your turn

Add a second check. Release notes that mention version bumps are noise, and the
writer's prompt already says to leave them out, but nothing checks it.

- **Make a second checker**, the same shape as `notes-reviewer`, whose one rule
  is that no bullet mentions a version bump or a release number. It sees only
  the notes, so say what a version bump looks like in them.
- **Put it after `check`** as its own gate node, with its own id. A gate after a
  gate is fine. The second one's retry goes back to `write`, the last node that
  produced something, not to `check`.
- **Run it a few times** and open the traces. Is the new rule ever broken? If it
  never is, the gate is costing a cent a run to say yes. That can still be worth
  it, and history is where you find out.

Two gates or one gate with two rules? Try both. The combined reviewer is
cheaper, and its complaints will tell you whether it keeps two rules straight.

When you are done:

```bash
agent stop
```

<div class="tut-next">
<div>
<h4>Next: a router</h4>
<p>Coming soon. A request is classified, sent down one of several branches, and a person approves it before anything ships.</p>
</div>
<div>
<h4>Back to the overview</h4>
<p><a href="/agents">What the platform does</a> and the <a href="/agents/features">full feature list</a>.</p>
</div>
</div>

{{< agents-pager "pipeline" >}}
